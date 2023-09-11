function updateSchedule() {
    let eventList = [];
    const eventsText = localStorage.getItem('eventList');
    if (eventsText) {
        eventList = JSON.parse(eventsText);
    }

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

