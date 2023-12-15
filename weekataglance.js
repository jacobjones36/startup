(async () => {
    const userName = localStorage.getItem('userName');
    if (userName) {
        //document.querySelector('#daName').textContent = userName;
        setDisplay('userControls', 'none');
        setDisplay('adminControls', 'block');
        let x = 1;
        loadWaag(x);
    } else {
        setDisplay('userControls', 'block');
        setDisplay('adminControls', 'none');
        let x = 0;
        loadWaag(x);
    }
})();


function setDisplay(controlId, display) {
    const adminControlEl = document.querySelector(`#${controlId}`);
    if (adminControlEl) {
        adminControlEl.style.display = display;
    }
}


async function deleteEvent(data) {
    deleteOrAdd(`/api/waag/delete`, data);
}

async function addEvent(data) {
    deleteOrAdd(`/api/waag/add`, data);
}

async function deleteOrAdd(endpoint, data) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        });
        const waag = await response.json();
        localStorage.setItem('waag', JSON.stringify(waag));
        deletePrevData();
        displayWaag(waag, 1);
    } catch {
        this.addToWaagLocal(data);
    }
}

function addToWaagLocal(newEvent) {
    let waag = [];
    const waagText = localStorage.getItem('waag');
    if (waagText) {
      waag = JSON.parse(waagText);
    }
    waag.push(newEvent);

    localStorage.setItem('waag', JSON.stringify(waag));
}



async function loadWaag(bool) {
    let waag = [];
    try {
        const response = await fetch('api/waags');
        waag = await response.json();
        localStorage.setItem('waag', JSON.stringify(waag));
    } catch {
        const waag = localStorage.getItem('waag');
        if (waag) {
            waag = JSON.parse(waag);
        }
    }
    displayWaag(waag, bool);
}
    

function displayWaag(waag, bool) {    
    let str = 'waagList';
    if (bool == 1) {
        str = 'waagLists';
    }
    const waagTableBodyEl = document.querySelector(`#${str}`);
    
    if (waag.length) {
        for (const [i, j] of waag.entries()) {
            const dateEl = document.createElement('td');
            const timeEl = document.createElement('td');
            const infoEl = document.createElement('td');

            dateEl.textContent = j.date;
            timeEl.textContent = j.time;
            infoEl.textContent = j.info;

            const rowEl = document.createElement('tr');
            rowEl.appendChild(dateEl);
            rowEl.appendChild(timeEl);
            rowEl.appendChild(infoEl);
            if (bool == 1) {
                rowEl.insertCell(3).innerHTML = '<button onclick="editData(this)">Edit</button>'+ 
                '<button onclick="deleteData(this)">Delete</button>';
            }

            waagTableBodyEl.appendChild(rowEl);
        }
    }
    else {
        waagTableBodyEl.innerHTML = '<tr><td colSpan=4>Nothing out of the usual this week</td></tr>';
    }
}

function deletePrevData(id) {
    $('#waagLists').detach();
}


async function addToWaag() {
    const dateObj = document.querySelector('#dateInputWAAG');
    const timeObj = document.querySelector('#timeInputWAAG');
    const infoObj = document.querySelector('#infoInput');

    const date = dateObj.value;
    const time = timeObj.value;
    const info = infoObj.value;
    
    const newWaag = { date: date, time: time, info: info };
    addEvent(newWaag);
    document.getElementById("dateInputWAAG").value = "";
    document.getElementById("timeInputWAAG").value = "";
    document.getElementById("infoInput").value = "";
}


async function deleteData(button) {
    let row = button.parentNode.parentNode;
    let dateCell = row.cells[0];
    let timeCell = row.cells[1];
    let infoCell = row.cells[2];
    
    const deletedEvent = { date: dateCell.innerHTML, time: timeCell.innerHTML, info: infoCell.innerHTML };
    deleteEvent(deletedEvent);
}

async function editData(button) {
    let row = button.parentNode.parentNode;

    let dateCell = row.cells[0];
    let timeCell = row.cells[1];
    let infoCell = row.cells[2];

    let dateInput = prompt("Enter the updated Date:", dateCell.innerHTML);
    let timeInput = prompt("Enter the updated Time:", timeCell.innerHTML);
    let infoInput = prompt("Enter the updated Information:", infoCell.innerHTML);
    
    const updatedEvent = { date: dateInput, time: timeInput, info: infoInput };
    const deletedRow = { date: dateCell.innerHTML, time: timeCell.innerHTML, info: infoCell.innerHTML };
    deleteEvent(deletedRow);
    addEvent(updatedEvent);
}

