import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Schedule } from './schedule/schedule';
import { Waag } from './waag/waag';
import { Login } from './admin/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
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
                            <li><a href="schedule.html">Schedule</a></li>
                            <li><a href="weekataglance.html">Week At a Glance</a></li>
                            <li><a href="photos.html">Photos</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a id="adminLogin" href="adminlogin.html">Admin Login</a></li>
                        </ul>
                        <div class="dropdown">
                            <button class="button dropdownbtn">MENU</button>
                            <div class="dropdown-content">
                                <a href="schedule.html">Schedule</a>
                                <a href="weekataglance.html">Week at a Glance</a>
                                <a href="photos.html">Photos</a>
                                <a href="contact.html">Contact</a>
                                <a id="adminLogins" href="adminlogin.html">Admin Login</a>
                            </div>
                        </div>
                    </nav>
                </div>
              
            </header>
            <Routes>
                <Route path='/login' element={<Login userName={userName} /> } />
                <Route path='/schedule' element={<Schedule userName={userName} />} />
                <Route path='/waag' element={<Waag />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
      
            <footer className='bg-dark text-white-50'>
                <ul>
                    <li class="footer-navbar-item">
                        <a class="link" href="index.html">Home</a>
                    </li>
                    <li class="footer-navbar-item">
                        <a class="link" href="schedule.html">Schedule</a>
                    </li>
                    <li class="footer-navbar-item">
                        <a class="link" href="weekataglance.html">Week At a glance</a>
                    </li>
                    <li class="footer-navbar-item">
                        <a class="link" href="photos.html">Photos</a>
                    </li>
                    <li class="footer-navbar-item">
                        <a class="link" href="contact.html">Contact</a>
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
