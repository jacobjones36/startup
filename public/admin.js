async function updateSchedule(event) {

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
            body: JSON.stringify(newScore),
        });

        const schedule = await response.json();
        localStorage.setItem('schedule', JSON.stringify(schedule));
    } catch {
        this.updateScheduleLocal(newEvent);
    }
}

function updateScheduleLocal(newEvent) {
    let schedule = [];
    const scheduleText = localStorage.getItem('schedule');
    if (scheduleText) {
      schedule = JSON.parse(scheduleText);
    }
    schedule.push(newEvent);

    localStorage.setItem('schedule', JSON.stringify(schedule));
}

/*function displaySchedule()
    
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
    
    eventList.push(newEvent);
    localStorage.setItem('eventList', JSON.stringify(eventList));
    window.location.href = "adminpage.html";

}*/

function updateWaag() {
    let waagList = [];
    const waagText = localStorage.getItem('waagList');
    if (waagText) {
        waagList = JSON.parse();
    }

    const dateObj = document.querySelector('#dateInputWAAG');
    const timeObj = document.querySelector('#timeInputWAAG');
    const infoObj = document.querySelector('#infoInput');

    const date = dateObj.value;
    const time = timeObj.value;
    const info = infoObj.value;
    
    
    const newWaag = { date: date, time: time, info: info };
    
    waagList.push(newWaag);
    localStorage.setItem('waagList', JSON.stringify(waagList));
    window.location.href = "adminpage.html";
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

