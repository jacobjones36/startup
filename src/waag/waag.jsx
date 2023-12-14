import React from "react";

export function Waag(props) {
    if (props.userName === '') {
        return (
            <main class='bg-secondary'>
                <div id="userControls" style="display: none">
                    <h2>WEEK AT A GLANCE</h2>
                    <table class="table waag-table">
                        <thead class="table-dark">
                            <tr>
                                <th class="date-row">Date</th>
                                <th class="info-row">Information</th>
                            </tr>
                        </thead>
                        <tbody id="waagList"></tbody>
                    </table>
                </div>
            </main>
        );
    } else {
        return (
            <main className='bg-secondary'>
                <div id="adminControls" style="display: none">
                        <h2>Admin Settings</h2>
                        <table class="table waag-table">
                            <thead class="table-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Information</th>
                                </tr>
                            </thead>
                            <tbody id="waagLists"></tbody>
                        </table>
                        <h2>Add Week at a Glance</h2>
                        <div class="update-weekataglance text-center">
                            <div class="event-item">
                                <input type="text" id="dateInputWAAG" onkeypress="enableSubmit1()" placeholder="Sat., Feb. 18" />
                            </div>
                            <div class="event-item">
                                <input type="text" id="timeInputWAAG" onkeypress="enableSubmit1()" placeholder="7:00 PM" />
                            </div>
                            <div class="event-item">
                                <input type="text" id="infoInput" placeholder="Whatever you have to say" />
                            </div>
                        </div>
                        <div class="event-items">
                            <button class="btn btn-primary" id="create-week-button" onclick="addToWaag()">Update Week at a Glance</button>
                        </div>    
                    </div>
            </main>
        );
    }
}