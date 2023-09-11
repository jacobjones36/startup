function loadSchedule() {
    let eventList = [];
    const eventText = localStorage.getItem('eventList');
    if (eventText) {
        eventList = JSON.parse(eventText);
    }
    const eventTableBodyEl = document.querySelector('#eventList');
    
    if (eventList.length) {
        for (const [i, j] of eventList.entries()) {
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
        eventTableBodyEl.innerHTML = '<tr><td colSpan=4>Be the first to Score</td></tr>';
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