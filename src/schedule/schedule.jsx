import React from 'react';

export function Schedule(props) {
    if (props.userName === '') {
        return (
            <main className='bg-secondary'>
                <div id="userControls" style="display: none">
                    <h2>2023 MENS SOCCER SCHEDULE</h2>
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
                        <tbody id="eventList"></tbody>
                    </table>
                </div>
            </main>
        );
    } else {
        return (
            <main className='bg-secondary'>
                <div id="adminControls" style="display: none">
                    <h2>Admin Settings - click cell to edit</h2>
                    <div id="admin-messages"></div>
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
                        <tbody id="eventLists"></tbody>
                    </table>
                    <h2>Add to Schedule</h2>
                    <div class="update-schedule text-center">
                        <div class="event-item">
                            <input type="text" id="dateInput" class="required" placeholder="Sat., Feb. 18"/>
                        </div>
                        <div class="event-item">
                            <input type="text" id="timeInput" class="required"  placeholder="7:00 PM" />
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
                        <button class="btn btn-primary" id="create-schedule-button" onclick="sched.addToSchedule()">Create Event</button>
                    </div> 
                </div>  
            </main>
        );
    }

}