import React from 'react';

import './waag.css';

export function UserWaag(props) {
    const waags = props.waags;
    const waagRows = [];
    if (waags.length) {
        for (const [i, waag] of waags.entries()) {
            waagRows.push(
                <tr key={i}>
                    <td>{waag.date}</td>
                    <td>{waag.time}</td>
                    <td>{waag.info}</td>
                </tr>
            );
        }
    }
    else {
        waagRows.push(
            <tr key='0'>
                <td colSpan='4'>Nothing happening this week</td>
            </tr>
        );
    }

    return (
        <div id="userControls" >
            <h2>WEEK AT A GLANCE</h2>
            <table class="table waag-table">
                <thead class="table-dark">
                    <tr>
                        <th class="date-row">Date</th>
                        <th class="time-row">Time</th>
                        <th class="info-row">Information</th>
                    </tr>
                </thead>
                <tbody id="waagList">{waagRows}</tbody>
            </table>
        </div>
    );
}