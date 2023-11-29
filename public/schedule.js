(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        setDisplay('userControls', 'none');
        setDisplay('adminControls', 'block');
        let x = 1;
        loadSchedule(x);
    } else {
        setDisplay('userControls', 'block');
        setDisplay('adminControls', 'none');
        let x = 0;
        loadSchedule(x);
    }
})();


function setDisplay(controlId, display) {
    const adminControlEl = document.querySelector(`#${controlId}`);
    if (adminControlEl) {
        adminControlEl.style.display = display;
    }
}


async function loadSchedule(displaySetting) {
    let schedule = [];
    try {
        const response = await fetch('/api/schedule');
        schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {
        schedule = localStorage.getItem('eventList');
        if (schedule) {
            schedule = JSON.parse(schedule);
        }
    }
    sched.displaySchedule(schedule, displaySetting);
}


class Schedule {
    socket;
    row;
    scheduleText;
    newEvent;
    eventClass;
    //schedule;


    constructor() {
        this.row = [];
        this.configureWebSocket();
    }


    async addEvent() {
        this.deleteOrAdd(`/api/event/add`);
    }

    async deleteEvent(data) {
        this.deleteOrAdd(`/api/event/delete`, data);
    }
    
    
    deletePrevData() {
        $('#eventLists').detach();
    }

    async addToSchedule() {

        this.date = document.querySelector('#dateInput').value;
        this.time = document.querySelector('#timeInput').value;
        this.opponent = document.querySelector('#opponentInput').value;
        this.location = document.querySelector('#locationInput').value;
        this.result = document.querySelector('#resultInput').value;
        
        this.newEvent = { date: this.date, time: this.time, opponent: this.opponent, location: this.location, result: this.result };
        this.addEvent();
        document.getElementById("dateInput").value = "";
        document.getElementById("timeInput").value = "";
        document.getElementById("opponentInput").value = "";
        document.getElementById("locationInput").value = "";
        document.getElementById("resultInput").value = "";
    }
    
    async editData(button) {
        let row = button.parentNode.parentNode;
    
        let dateCell = row.cells[0];
        let timeCell = row.cells[1];
        let opponentCell = row.cells[2];
        let locationCell = row.cells[3];
        let resultCell = row.cells[4];
    
        let dateInput = prompt("Enter the updated Date:", dateCell.innerHTML);
        let timeInput = prompt("Enter the updated Time:", timeCell.innerHTML);
        let opponentInput = prompt("Enter the update Opponent:", opponentCell.innerHTML);
        let locationInput = prompt("Enter the update Location:", locationCell.innerHTML);
        let resultInput = prompt("Enter the update Result:", resultCell.innerHTML);
        const updatedEvent = { date: dateInput, time: timeInput, opponent: opponentInput, location: locationInput, result: resultInput };
        const deletedRow = { date: dateCell.innerHTML, time: timeCell.innerHTML, opponent: opponentCell.innerHTML, location: locationCell.innerHTML, result: resultCell.innerHTML };
        this.deleteEvent(deletedRow);
        this.addEvent(updatedEvent);
    }
    
    async deleteData(button) {
        let row = button.parentNode.parentNode;
        let dateCell = row.cells[0];
        let timeCell = row.cells[1];
        let opponentCell = row.cells[2];
        let locationCell = row.cells[3];
        let resultCell = row.cells[4]; 
        const deletedEvent = { date: dateCell.innerHTML, time: timeCell.innerHTML, opponent: opponentCell.innerHTML, location: locationCell.innerHTML, result: resultCell.innerHTML };
        this.deleteEvent(deletedEvent);
    }


    

    addToScheduleLocal() {
        //let schedule = [];
        //const scheduleText = localStorage.getItem('schedule');
        if (this.scheduleText) {
          this.schedule = JSON.parse(this.scheduleText);
        }
        this.schedule.push(this.newEvent);
    
        localStorage.setItem('schedule', JSON.stringify(this.schedule));
    }


    async deleteOrAdd(endpoint) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(this.newEvent),
            });
            this.schedule = await response.json();
            localStorage.setItem('schedule', JSON.stringify(this.schedule));
            this.deletePrevData();
            this.displaySchedule(schedule, 1);
        } catch {
            this.addToScheduleLocal();
        }
    }


    
    

    displaySchedule(schedule, displaySetting) {
        let eventLists = 'eventList';
        if (displaySetting == 1) {
            eventLists = 'eventLists';
        }
        const eventTableBodyEl = document.querySelector(`#${eventLists}`);
        
        if (schedule.length) {
            for (const [i, j] of schedule.entries()) {
                const dateEl = document.createElement('td');
                const timeEl = document.createElement('td');
                const opponentEl = document.createElement('td');
                const locationEl = document.createElement('td');
                const resultEl = document.createElement('td');
    
                dateEl.textContent = j.date;
                timeEl.textContent = j.time;
                opponentEl.textContent = j.opponent;
                locationEl.textContent = j.location;
                resultEl.textContent = j.result;
    
                const rowEl = document.createElement('tr');
                rowEl.appendChild(dateEl);
                rowEl.appendChild(timeEl);
                rowEl.appendChild(opponentEl);
                rowEl.appendChild(locationEl);
                rowEl.appendChild(resultEl);
                if (displaySetting == 1) {
                    rowEl.insertCell(5).innerHTML = '<button onclick="editData(this)">Edit</button>'+ 
                    '<button onclick="deleteData(this)">Delete</button>';
                }
    
                eventTableBodyEl.appendChild(rowEl);
    
            }
        }
        else {
            eventTableBodyEl.innerHTML = '<tr><td colSpan=4>No events scheduled yet</td></tr>';
        }
    }


    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            this.displayMsg('system', 'game', 'disconnected');
        };
        this.socket.onclose = (event) => {
            this.displayMsg('system', 'game', 'disconnected');
        };
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === GameEndEvent) {
                this.displayMsg('player', msg.from, `scored ${msg.value.score}`);
            } else if (msg.type === GameStartEvent) {
                this.displayMsg('player', msg.from, `started a new game`);
            }
        };
    }

    displayMsg(cls, from, msg) {
        const chatText = document.querySelector('#player-messages');
        chatText.innerHTML = `<div class="event"><span class="${cls}-eventt">${from}</span> ${msg}</div>` + chatText.innerHTML;
    }

    broadcastEvent(from, type, value) {
        const event = {
            from: from,
            type: type,
            value: value,
        };
        this.socket.send(JSON.stringify(event));
    }

}

const sched = new Schedule();

