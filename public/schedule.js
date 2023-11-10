async function loadSchedule() {
    let schedule = [];
    try {
        const response = await fetch('api/schedule');
        schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {
        const schedule = localStorage.getItem('eventList');
        if (schedule) {
            schedule = JSON.parse(schedule);
        }
    }
    displaySchedule(schedule);
    displayQuote();
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
function displayQuote(data) {
    fetch('https://api.quotable.io/random')
        .then((respone) => response.json())
        .then((data) => {
            const containerEl = document.querySelector('#quote');
            const quoteEl = document.createElement('p');
            quoteEl.classList.add('quote');
            const authorEl = document.createElement('p');
            authorEl.classList.add('author');
            quoteEl.textContent = data.content;
            authorEl.textContent = data.author;
            containerEl.appendChild(quoteEl);
            containerEl.appendChild(authorEl);
        });
}

loadSchedule();