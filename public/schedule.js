(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        setDisplay('normalControls', 'none');
        setDisplay('adminControl', 'block');
    } else {
        setDisplay('normalControls', 'block');
        setDisplay('adminControl', 'none');
    }
})();


function setDisplay(controlId, display) {
    const adminControlEl = document.querySelector(`#${controlId}`);
    if (adminControlEl) {
        adminControlEl.style.display = display;
    }
}

async function loadSchedule() {
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
    displaySchedule(schedule);
}

function displaySchedule(schedule) {
    const eventTableBodyEl = document.querySelector('#eventList');
    
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

loadSchedule();
