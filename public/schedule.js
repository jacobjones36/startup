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


async function updateEvent(data) {
    updateDeleteOrAdd(`/api/event/update`, data);
}

async function deleteEvent(data) {
    updateDeleteOrAdd(`/api/event/delete`, data);
}

async function addEvent(data) {
    updateDeleteOrAdd(`/api/event/add`, data);
}


function setDisplay(controlId, display) {
    const adminControlEl = document.querySelector(`#${controlId}`);
    if (adminControlEl) {
        adminControlEl.style.display = display;
    }
}


async function updateDeleteOrAdd(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
        const schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
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
            const opponentEl = document.createElement('td');
            const locationEl = document.createElement('td');
            const resultEl = document.createElement('td');

            dateEl.textContent = j.date + "\n" + j.time;
            opponentEl.textContent = j.opponent;
            locationEl.textContent = j.location;
            resultEl.textContent = j.result;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(dateEl);
            rowEl.appendChild(opponentEl);
            rowEl.appendChild(locationEl);
            rowEl.appendChild(resultEl);
            if (displaySetting == 1) {
                rowEl.insertCell(4).innerHTML = '<button onclick="editData(this)">Edit</button>'+ 
                '<button onclick="deleteData(this)">Delete</button>';
            }

            eventTableBodyEl.appendChild(rowEl);

        }
    }
    else {
        eventTableBodyEl.innerHTML = '<tr><td colSpan=4>No events scheduled yet</td></tr>';
    }
}

function clearEvent() {
    let eventList = [];
    const eventText = localStorage.getItem('eventList');
    if(eventText) {
        eventList = JSON.parse(eventText);
    }
    const eventTableBodyEl = document.querySelector('#eventList');
    if(eventList.length) {
        for (const [i, j] of eventList.entries()) {
            
        }
    }
}

async function editData(button) {
    let row = button.parentNode.parentNode;

    let dateTimeCell = row.cells[0];
    let opponentCell = row.cells[1];
    let locationCell = row.cells[2];
    let resultCell = row.cells[3];

    let dateTimeInput = prompt("Enter the updated Date and/or Time:", dateTimeCell.innerHTML);
    let opponentInput = prompt("Enter the update Opponent:", opponentCell.innerHTML);
    let locationInput = prompt("Enter the update Location:", locationCell.innerHTML);
    let resultInput = prompt("Enter the update Result:", resultCell.innerHTML);
    /*dateTimeCell.innerHTML = dateTimeInput;
    opponentCell.innerHTML = opponentInput;
    locationCell.innerHTML = locationInput;
    resultCell.innerHTML = resultInput;*/
    const updatedEvent = { date: dateTimeInput, time: dateTimeInput, opponent: opponentInput, location: locationInput, result: resultInput };
    //deleteEvent(row);
    updateEvent(updatedEvent);
}

async function deleteData(button) {
    let row = button.parentNode.parentNode;
    let dateTimeCell = row.cells[0];
    let opponentCell = row.cells[1];
    let locationCell = row.cells[2];
    let resultCell = row.cells[3];
    //row.parentNode.removeChild(row); 
    const deletedEvent = { date: dateTimeCell.innerHTML, time: dateTimeCell.innerHTML, opponent: opponentCell.innerHTML, location: locationCell.innerHTML, result: resultCell.innerHTML };
    try {
        const response = await fetch('/api/event/delete', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(deletedEvent),
        });

        const schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {
        console.log(`something please`);
    }
    displaySchedule(schedule, 1);
}
