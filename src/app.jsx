import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Main } from './main/main';
import { Schedule } from './schedule/schedule';
import { Waag } from './waag/waag';
import { Login } from './Admin/login';
import { AuthState } from './Admin/authState';
import { Contact } from './contact/contact';
import { Photo } from './photos/photos';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
    return (
        <BrowserRouter>
            <div className='body bg-dark text-light'>
                <header className='container-fluid'>
                    <div class="main-header">
                        <div class="dragon-header">
                            <img src="dragon.jpeg"/>
                            <span class="mainheader">DALLAS DRAGONS</span>
                        </div>
                        <nav>
                            <ul class="header-menu">
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='schedule'>Schedule</NavLink>
                                </li>
                                <li><NavLink className='nav-link' to='waag'>Week at a Glance</NavLink></li>
                                <li><NavLink className='nav-link' to='photos'>Photos</NavLink></li>
                                <li><NavLink className='nav-link' to='contact'>Contact Us</NavLink></li>
                                <li><NavLink className='nav-link' to='login'>Admin Login</NavLink></li>
                            </ul>
                            <div class="dropdown">
                                <button class="button dropdownbtn">MENU</button>
                                <div class="dropdown-content">
                                    <NavLink className='nav-link' to='schedule'>Schedule</NavLink>
                                    <NavLink className='nav-link' to='waag'>Week at a Glance</NavLink>
                                    <NavLink className='nav-link' to='photos'>Photos</NavLink>
                                    <NavLink className='nav-link' to='contact'>Contact Us</NavLink>
                                    <NavLink className='nav-link' to='login'>Admin Login</NavLink>
                                </div>
                            </div>
                        </nav>
                    </div>
                
                </header>
                <Routes>
                    <Route path='/' element={<Main />}/>
                    <Route path='/login' element={<Login 
                        userName={userName} 
                        authState={authState}
                        onAuthChange={(userName, authState) => {
                            setAuthState(authState);
                            setUserName(userName);
                        }}
                        /> 
                        } 
                        exact
                    />
                    <Route path='/schedule' element={<Schedule userName={userName} authState={authState} />} />
                    <Route path='/waag' element={<Waag userName={userName} authState={authState} />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/photos' element={<Photo />} />
                    <Route path='*' element={<NotFound />} />
                    
                </Routes>
        
                <footer className='bg-dark text-white-50'>
                    <ul>
                        <li class="footer-navbar-item">
                            <NavLink className='link' to=''>Home</NavLink>
                        </li>
                        <li class="footer-navbar-item">
                            <NavLink className='link' to='schedule'>Schedule</NavLink>
                        </li>
                        <li class="footer-navbar-item">
                            <NavLink className='link' to='waag'>Week at a Glance</NavLink>
                        </li>
                        <li class="footer-navbar-item">
                            <NavLink className='link' to='contact'>Contact Us</NavLink>
                        </li>
                        <li class="footer-navbar-item">
                            <NavLink className='link' to='photos'>Photos</NavLink>
                        </li>
                    </ul>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  export default App;
