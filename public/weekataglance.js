async function loadWaag() {
    let waag = [];
    try {
        const response = await fetch('api/waags');
        waag = await response.json();
        localStorage.setItem('waag', JSON.stringify(waag));
    } catch {
        const waag = localStorage.getItem('waagList');
        if (waag) {
            waag = JSON.parse(waag);
        }
    }
    displayWaag(waag)
}
    
function displayWaag(waag) {    
    const waagTableBodyEl = document.querySelector('#waagList');
    
    if (waag.length) {
        for (const [i, j] of waag.entries()) {
            const dateEl = document.createElement('td');
            const infoEl = document.createElement('td');

            dateEl.textContent = j.date + "\n@" + j.time;
            infoEl.textContent = j.info;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(dateEl);
            rowEl.appendChild(infoEl);

            waagTableBodyEl.appendChild(rowEl);
        }
    }
    else {
        waagTableBodyEl.innerHTML = '<tr><td colSpan=4>Nothing out of the usual this week</td></tr>';
    }
}
function clearWaag() {
    let waagList = [];
    const eventText = localStorage.getItem('waagList');
    if(waagText) {
        waagList = JSON.parse(waagText);
    }
    const eventTableBodyEl = document.querySelector('#waagList');
    if(waagList.length) {
        for (const [i, j] of waagList.entries()) {
            
        }
    }
}

loadWaag();