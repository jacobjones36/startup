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
    
    const newEvent = { date: date, time: time,opponent: opponent, location: location, result: result };
    try {
        const response = await fetch('/api/event', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newEvent),
        });

        const schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
        document.getElementById("dateInput").value = "";
        document.getElementById("timeInput").value = "";
        document.getElementById("opponentInput").value = "";
        document.getElementById("locationInput").value = "";
        document.getElementById("resultInput").value = "";
    } catch {
        this.addToScheduleLocal(newEvent);
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

async function clearEvent() {


}

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

