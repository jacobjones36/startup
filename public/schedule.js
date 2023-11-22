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



async function deleteEvent(data) {
    deleteOrAdd(`/api/event/delete`, data);
}

async function addEvent(data) {
    deleteOrAdd(`/api/event/add`, data);
}


async function deleteOrAdd(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
        const schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
        deletePrevData();
        displaySchedule(schedule, 1);
    } catch {
        this.addToScheduleLocal(data);
    }
}

function addToScheduleLocal(newEvent) {
    let schedule = [];
    const scheduleText = localStorage.getItem('schedule');
    if (scheduleText) {
      schedule = JSON.parse(scheduleText);
    }
    schedule.push(newEvent);

    localStorage.setItem('schedule', JSON.stringify(schedule));
}

async function loadSchedule(displaySetting) {
    let schedule = [];
    try {
        const response = await fetch('/api/schedule');
        schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {
        const schedule = localStorage.getItem('eventList');
        if (schedule) {
            schedule = JSON.parse(schedule);
        }
    }
    displaySchedule(schedule, displaySetting);
}


function displaySchedule(schedule, displaySetting) {
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

function deletePrevData() {
    $('#eventLists').detach();
}

async function editData(button) {
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
    deleteEvent(deletedRow);
    addEvent(updatedEvent);
}

async function deleteData(button) {
    let row = button.parentNode.parentNode;
    let dateCell = row.cells[0];
    let timeCell = row.cells[1];
    let opponentCell = row.cells[2];
    let locationCell = row.cells[3];
    let resultCell = row.cells[4]; 
    const deletedEvent = { date: dateCell.innerHTML, time: timeCell.innerHTML, opponent: opponentCell.innerHTML, location: locationCell.innerHTML, result: resultCell.innerHTML };
    deleteEvent(deletedEvent);
}

async function addToSchedule() {
    const dateObj = document.querySelector('#dateInput');
    const timeObj = document.querySelector('#timeInput');
    const opponentObj = document.querySelector('#opponentInput');
    const locationObj = document.querySelector('#locationInput');
    const resultObj = document.querySelector('#resultInput');

    const date = dateObj.value;
    const time = timeObj.value;
    const opponent = opponentObj.value;
    const location = locationObj.value;
    const result = resultObj.value;
    
    const newEvent = { date: date, time: time, opponent: opponent, location: location, result: result };
    addEvent(newEvent);
    document.getElementById("dateInput").value = "";
    document.getElementById("timeInput").value = "";
    document.getElementById("opponentInput").value = "";
    document.getElementById("locationInput").value = "";
    document.getElementById("resultInput").value = "";
}

