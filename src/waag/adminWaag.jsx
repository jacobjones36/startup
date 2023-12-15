import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from '../Admin/messageDialog';

export function AdminWaag(props) {
    let waags = props.waags;
    const [displayError, setDisplayError] = React.useState(null);
    let newWaag = [];
    let delWaag = [];

    async function createWaag() {
        const respone = await fetch(`/api/waag/add`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ date: newWaag[0], time: newWaag[1], info: newWaag[2] }),
        });
        if (response?.status === 200) {
            waags = await respone.json();
            localStorage.setItem('waags', waags);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg} Creation Error`);
        }
    }

    async function deleteWaag() {
        const response = await fetch(`/api/waag/delete`, {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ date: delWaag[0], time: delWaag[1], info: delWaag[2] }),
        });
        if (response?.status === 200) {
            waags = await response.json();
            localStorage.setItem('waags', waags);
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg} DELETION Error`);
        }
    }

    async function editData(waag, waagIndex) {
        var input = prompt("Enter the updated Info: ");
        var date = waag.date;
        var time = waag.time;
        var info = waag.info;

        delWaag.push(date);
        delWaag.push(time);
        delWaag.push(info);

        if (waagIndex == 0) {
            date = input;
        } else if (waagIndex == 1) {
            time = input;
        } else if (waagIndex == 2) {
            info = input;
        }
        newWaag.push(date);
        newWaag.push(time);
        newWaag.push(info);
        deleteWaag();
        createWaag();
        newWaag = [];
        delWaag = [];
    }

    async function addToWaag() {
        var date = document.querySelector('#dateInputWAAG').value;
        var time = document.querySelector('#timeInputWAAG').value;
        var info = document.querySelector('#infoInput').value;
        newWaag.push(date);
        newWaag.push(time);
        newWaag.push(info);
        createWaag();
        newWaag = [];
        document.getElementById("dateInputWAAG").value = "";
        document.getElementById("timeInputWAAG").value = "";
        document.getElementById("infoInput").value = "";
    }

    async function deleteRow(waag) {
        delWaag.push(waag.date);
        delWaag.push(waag.time);
        delWaag.push(waag.info);
        deleteWaag();
        delWaag = [];
        setDisplayError(`Successfully Deleted Event`);
    }
    const waagRows = [];
    if (waags.length) {
        for (const [i, waag] of waags.entries()) {
            waagRows.push(
                <tr key={i}>
                    <td><Button variant='secondary' onClick={() => editData(waag, 0)}>{waag.date}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(waag, 1)}>{waag.time}</Button></td>
                    <td><Button variant='secondary' onClick={() => editData(waag, 2)}>{waag.info}</Button></td>
                    <td><Button variant='secondary' onClick={() => deleteRow(waag)}>Delete This Event</Button></td>
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
        <>
            <div id="adminControls">
                <h2>Admin Settings</h2>
                <table class="table waag-table">
                    <thead class="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Information</th>
                        </tr>
                    </thead>
                    <tbody id="waagLists">{waagRows}</tbody>
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
                    <Button variant='primary' id="create-week-button" onClick={() => addToWaag()}>Update Week at a Glance</Button>
                </div>
            </div>
            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
        </>
    );
}