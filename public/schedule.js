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

const ScheduleEvent = 'scheduleEvent';


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

    constructor() {
        this.row = [];
        this.configureWebSocket();
    }


    async addEvent() {
        this.deleteOrAdd(`/api/event/add`);
    }

    async deleteEvent() {
        this.deleteOrAdd(`/api/event/delete`);
    }
    
    async getAdminName() {
        return localStorage.getItem('userName');
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
        let date = row.cells[0].textContent;
        let time = row.cells[1].textContent;
        let opponent = row.cells[2].textContent;
        let location = row.cells[3].textContent;
        let result = row.cells[4].textContent;
        if (result == 'Add Final Result') {
            result = '';
        }

        this.newEvent = { date: date, time: time, opponent: opponent, location: location, result: result };
        this.deleteEvent();

        let input = prompt("Enter the updated Info: ", button.textContent);
        button.textContent = input;
        date = row.cells[0].textContent;
        time = row.cells[1].textContent;
        opponent = row.cells[2].textContent;
        location = row.cells[3].textContent;
        result = row.cells[4].textContent;

        this.newEvent = { date: date, time: time, opponent: opponent, location: location, result: result };
        this.addEvent();
        
    }
    
    async deleteData(button) {
        let row = button.parentNode.parentNode;
        let date = row.cells[0].textContent;
        let time = row.cells[1].textContent;
        let opponent = row.cells[2].textContent;
        let location = row.cells[3].textContent;
        let result = row.cells[4].textContent; 
        this.newEvent = { date: date, time: time, opponent: opponent, location: location, result: result };
        this.deleteEvent();
    }


    

    addToScheduleLocal() {
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

            userName = this.getAdminName();
            this.broadcastEvent(userName, ScheduleEvent, this.newEvent);
    
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

                const rowEl = document.createElement('tr');
                
                
                if (displaySetting == 1) {
                    if (j.result == '') {
                        j.result = 'Add Final Result';
                    }
                    
                    rowEl.insertCell(0).innerHTML = `<button onclick="sched.editData(this)">${j.date}</button>`;
                    rowEl.insertCell(1).innerHTML = `<button onclick="sched.editData(this)">${j.time}</button>`;
                    rowEl.insertCell(2).innerHTML = `<button onclick="sched.editData(this)">${j.opponent}</button>`;
                    rowEl.insertCell(3).innerHTML = `<button onclick="sched.editData(this)">${j.location}</button>`;
                    rowEl.insertCell(4).innerHTML = `<button onclick="sched.editData(this)">${j.result}</button>`;
                    rowEl.insertCell(5).innerHTML = `<button onclick="sched.deleteData(this)">Delete Event</button>`;
                }
                else {
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

                    rowEl.appendChild(dateEl);
                    rowEl.appendChild(timeEl);
                    rowEl.appendChild(opponentEl);
                    rowEl.appendChild(locationEl);
                    rowEl.appendChild(resultEl);
                }
    
                eventTableBodyEl.appendChild(rowEl);
    
            }
        }
        else {
            eventTableBodyEl.innerHTML = '<tr><td colSpan=4>No events scheduled yet</td></tr>';
        }
    }

    async pressEvent() {
        console.log('made it here at least');
        let newInput = prompt("Enter the updated Date:", clickedEvent.innerHTML);
        
    }


    configureWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        this.socket.onopen = (event) => {
            this.displayMsg('system', 'schedule', 'connected');
        };
        this.socket.onclose = (event) => {
            this.displayMsg('system', 'schedule', 'disconnected');
        };
        this.socket.onmessage = async (event) => {
            const msg = JSON.parse(await event.data.text());
            if (msg.type === ScheduleEvent) {
                this.displayMsg('player', msg.from, `event ${msg.value.date}`);
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

