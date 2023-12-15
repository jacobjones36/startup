import React from "react";

export function Contact(props) {
    return (
        <main className='bg-secondary'>
            <section class="container container-notmain">
                <table class="contact-table">
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <td>Momma Jones</td>
                        <td>Head Coach</td>
                        <td>(971)654-8712</td>
                        <td>momma@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Adam Jones</td>
                        <td>Trainer</td>
                        <td>(971)654-8712</td>
                        <td>conormcgregor@gmail.com</td>
                    </tr>
                    <tr>
                        <td>Jacob Jones</td>
                        <td>Athletic Director</td>
                        <td>(971)654-8712</td>
                        <td>bigjake@gmail.com</td>
                    </tr>

                </table>
            </section>
        </main>
    );
}