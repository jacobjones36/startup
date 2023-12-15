import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from '../Admin/messageDialog';

export function AdminSchedule(props) {
    let schedule = props.events;
    const [displayError, setDisplayError] = React.useState(null);
    let newEvent = [];
    let delEvent = [];


    async function createEvent() {
        const response = await fetch(`/api/event/add`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({date: newEvent[0], time: newEvent[1], opponent: newEvent[2], location: newEvent[3], result: newEvent[4]}),
        });
        if (response?.status === 200) {
            schedule = await response.json();
            localStorage.setItem('schedule', schedule);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg} Creation Error`);
        }
    }
    
    async function deleteEvent() {
        if (delEvent[4] == 'Add Final Result') {
            delEvent[4] = '';
        }
        const response = await fetch(`/api/event/delete`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({date: delEvent[0], time: delEvent[1], opponent: delEvent[2], location: delEvent[3], result: delEvent[4]}),
        });
        if (response?.status === 200) {
            schedule = await response.json();
            localStorage.setItem('schedule', schedule);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg} DELETION Error`);
        }
    }


    async function editData(event, eventItem) {
        var input = prompt("Enter the updated Info: ");
        var date = event.date;
        var time = event.time;
        var opponent = event.opponent;
        var location = event.location;
        var result = event.result;

        delEvent.push(date);
        delEvent.push(time);
        delEvent.push(opponent);
        delEvent.push(location);
        delEvent.push(result);


        if (eventItem == 0) {
            date = input;
        }else if (eventItem == 1) {
            time = input;
        } else if (eventItem == 2) {
            opponent = input;
        } else if (eventItem == 3) {
            location = input;
        } else {
            result = input;
        }
        newEvent.push(date);
        newEvent.push(time);
        newEvent.push(opponent);
        newEvent.push(location);
        newEvent.push(result);
        deleteEvent();
        createEvent();
        newEvent = [];
        delEvent = [];

    }

    async function addToSchedule() {
        var date = document.querySelector('#dateInput').value;
        var time = document.querySelector('#timeInput').value;
        var opponent = document.querySelector('#opponentInput').value;
        var location = document.querySelector('#locationInput').value;
        var result = document.querySelector('#resultInput').value;
        newEvent.push(date);
        newEvent.push(time);
        newEvent.push(opponent);
        newEvent.push(location);
        newEvent.push(result);
        createEvent();
        newEvent = [];
        document.getElementById("dateInput").value = "";
        document.getElementById("timeInput").value = "";
        document.getElementById("opponentInput").value = "";
        document.getElementById("locationInput").value = "";
        document.getElementById("resultInput").value = "";
        
    }

    async function deleteRow(event) {
        delEvent.push(event.date);
        delEvent.push(event.time);
        delEvent.push(event.opponent);
        delEvent.push(event.location);
        delEvent.push(event.result);
        deleteEvent();
        delEvent = [];
        setDisplayError(`Successfully Deleted Event`);
    }


    const scheduleRows = [];
    if (schedule.length) {
        for (const [i, event] of schedule.entries()) {
            if (event.result == '') {
                event.result = 'Add Final Result'
            }
            scheduleRows.push(
                <tr key={i}>
                    <td><Button variant='secondary' onClick={() => editData(event, 0)}>{event.date}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(event, 1)}>{event.time}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(event, 2)}>{event.opponent}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(event, 3)}>{event.location}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(event, 4)}>{event.result}</Button></td>
                    <td><Button variant='secondary' onClick={() => deleteRow(event)}>Delete this Event</Button></td>
                </tr>
            );
        }
    } else {
        scheduleRows.push(
            <tr key='0'>
                <td colSpan='4'>No events scheduled yet</td>
            </tr>
        );
    }

    return (
        <>
            <div id="adminControls">
                <h2>Admin Settings - click cell to edit</h2>
                <table class="table schedule-table">
                    <thead class="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Opponent</th>
                            <th>Location</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody id="eventLists">{scheduleRows}</tbody>
                </table>
                <h2>Create New Event</h2>
                <div class="update-schedule text-center">
                    <div class="event-item">
                        <input type="text" id="dateInput" class="required" placeholder="Sat., Feb. 18" />
                    </div>
                    <div class="event-item">
                        <input type="text" id="timeInput" class="required" placeholder="7:00 PM" />
                    </div>
                    <div class="event-item">
                        <input type="text" id="opponentInput" class="required" placeholder="vs Central" />
                    </div>
                    <div class="event-item">
                        <input type="text" id="locationInput" class="required" placeholder="Dallas High School" />
                    </div>
                    <div class="event-item">
                        <input type="text" id="resultInput" placeholder="W 6-0" />
                    </div>
                </div>
                <div class="invalid-schedule" id="invalids"></div>
                <div class="event-items">
                    <Button variant='primary' id="create-schedule-button" onClick={() => addToSchedule()}>Create Event</Button>
                </div>
            </div>
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    )
}