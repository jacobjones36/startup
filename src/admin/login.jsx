import React from "react";

export function Login(props) {
    return (
        <main class="login-main bg-secondary text-center">
            <section class="container container-notmain">
                <div id="loginControls" style="display: none">
                    <h2>Login</h2>
                    <div class="login-text-field">
                        <input type="text" id="userName" placeholder="Username" />
                    </div>
                    <input type="password" id="userPassword" placeholder="Password" />
                    <div class="invalid-message" id="invalid"></div>
                    <div class="login-button">
                        <button type="button" class="button btn btn-primary" onclick="loginUser()">Login</button>
                        <button type="button" class="button btn btn-primary" onclick="createUser()">Create</button>
                    </div>
                </div>
                <div id="adminControls" style="display: none">
                    <div id="daName"></div>
                    <button type="button" class="button btn btn-primary" onclick="editSchedule()">Edit Schedule</button>
                    <button type="button" class="button btn btn-primary" onclick="editWaag()">Edit this Weeks Info</button>
                    <button type="button" class="button btn btn-seconday" onclick="logout()">Logout</button>
                </div>
                <div class="modal fade" id="msgModal" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content text-dark">
                            <div class="modal-body">error message</div>
                            <div class="modal-footer">
                                <button type="button" class="button btn btn-primary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </main>
    );
}