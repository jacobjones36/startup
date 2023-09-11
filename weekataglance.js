function loadWeek() {
    let weekList = [];
    const weekText = localStorage.getItem('weekList');
    if (weekText) {
        weekList = JSON.parse(weekText);
    }
    console.log('log');
    const eventTableBodyEl = document.querySelector('#weekList');
    
    if (weekList.length) {
        for (const [i, j] of weekList.entries()) {
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

loadWeek();