
async function updateWaag() {
    const dateObj = document.querySelector('#dateInputWAAG');
    const timeObj = document.querySelector('#timeInputWAAG');
    const infoObj = document.querySelector('#infoInput');

    const date = dateObj.value;
    const time = timeObj.value;
    const info = infoObj.value;
    
    const newWaag = { date: date, time: time, info: info };
    try {
        const response = await fetch('/api/waag', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newWaag),
        });

        const waag = await response.json();
        localStorage.setItem('waag', JSON.stringify(waag));
        window.location.href = "adminpage.html";
    } catch {
        this.updateWaagLocal(newWaag);
    }
}

function updateWaagLocal(newWaag) {
    let waag = [];
    const waagText = localStorage.getItem('waag');
    if (waagText) {
        waag = JSON.parse(waagText);
    }
    waag.push(newWaag);
    localStorage.setItem('waag', JSON.stringify(waag));
}

function createButton() {
    const button = document.getElementById("create-schedule-button");
    button.setAttribute("disabled", "");
    const button1 = document.getElementById("create-week-button");
    button1.setAttribute("disabled", "");
}
createButton();

function enableSubmit() {
    const button = document.getElementById("create-schedule-button");
    if(document.getElementById("dateInput") != "" && document.getElementById("timeInput").trim != ""
    && document.getElementById("opponentInput") != "" && document.getElementById("loactionInput") != "") {
        button.removeAttribute("disabled");
    }
}
function enableSubmit1() {
    const button = document.getElementById("create-week-button");
    if(document.getElementById("dateInput") != "" && document.getElementById("timeInput").trim != ""
    && document.getElementById("opponentInput") != "" && document.getElementById("loactionInput") != "") {
        button.removeAttribute("disabled");
    }
}


function updateWeek() {
    let weekList = [];
    const weekText = localStorage.getItem('weekList');
    if(weekText) {
        weekList = JSON.parse(weekText);
    }
    
    const dateObj = document.querySelector('#dateInputTwo');
    const bodyObj = document.querySelector('#bodyInput');

    const date = dateObj.value;
    const body = bodyObj.value;

    const newItem = { date: date, body: body };
    weekList.push(newItem);
    localStorage.setItem('weekList', JSON.stringify(weekList));
    window.location.href = "adminpage.html";
}

