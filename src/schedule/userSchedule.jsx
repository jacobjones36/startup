import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

export function UserSchedule(props) {
    const events = props.events;
    const scheduleRows = [];
    if(events.length) {
        for (const [i, event] of events.entries()) {
            if(event.result == 'Add Final Result') {
                event.result = ''
            }
            scheduleRows.push(
                <tr key={i}>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td>{event.opponent}</td>
                    <td>{event.location}</td>
                    <td>{event.result}</td>
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
        <div id="userControls">
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
                <tbody id="eventList">{scheduleRows}</tbody>
            </table>
        </div>
    )
}