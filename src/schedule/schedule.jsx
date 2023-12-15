import React from 'react';

import { AuthState } from '../Admin/authState';
import { AdminSchedule } from './adminSchedule';
import { UserSchedule } from './userSchedule';


export function Schedule(props) {
    
    const [events, setEvents] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/schedule')
            .then((response) => response.json())
            .then((events) => {
                setEvents(events);
                localStorage.setItem('events', JSON.stringify(events));
            })
            .catch(() => {
                const eventsText = localStorage.getItem('events');
                if (eventsText) {
                    setEvents(JSON.parse(eventsText));
                }
            });
    }, []);


    var display = <UserSchedule events={events} />
    if(props.authState ===  AuthState.Authenticated) {
        display = <AdminSchedule events={events} />
    }

    return (
        <main className='bg-secondary text-center'>
            {display}
        </main>
    );
}
