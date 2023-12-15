import React from "react";

import { AuthState } from "../Admin/authState";
import { AdminWaag } from "./adminWaag";
import { UserWaag } from "./userWaag";


export function Waag(props) {
    const [waags, setWaags] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/waags')
            .then((response) => response.json())
            .then((waags) => {
                setWaags(waags);
                localStorage.setItem('waags', JSON.stringify(waags));
            })
            .catch(() => {
                const waagsText = localStorage.getItem('waags');
                if (waagsText) {
                    setWaags(JSON.parse(waagsText));
                }
            });
    }, []);

    var display = <UserWaag waags={waags} />
    if (props.authState === AuthState.Authenticated) {
        display = <AdminWaag waags={waags} />
    }

    return (
        <main className='bg-secondary text-center'>
            {display}
        </main>
    )
    
}