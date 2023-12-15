import React from "react";

export function Main(props) {
    return (
        <main class="container">
            <img src="/dragon.jpeg"/>
            <div class="upcoming-events-div">
                <span class="upcoming-event-span">UPCOMING EVENTS</span>
            </div>
            <div class="event-items">
                <div class="event"><a href="event.html">
                    <div class="sport" id="1s">Soccer</div>
                    <div class="game" id="1g">Game vs. opponent</div>
                    <div class="date" id="1d">Tuesday August 22</div>
                </a></div>
                <div class="event"><a href="event.html">
                    <div class="sport" id="2s">Soccer</div>
                    <div class="game" id="2g">Game vs. opponent</div>
                    <div class="date" id="2d">Tuesday August 22</div>
                </a></div>
                <div class="event"><a href="event.html">
                    <div class="sport" id="3s">Soccer</div>
                    <div class="game" id="3g">Game vs. opponent</div>
                    <div class="date" id="3d">Tuesday August 22</div>
                </a></div>
                <div class="event"><a href="event.html">
                    <div class="sport" id="4s">Soccer</div>
                    <div class="game" id="4g">Game vs. opponent</div>
                    <div class="date" id="4d">Tuesday August 22</div>
                </a></div>
            </div>
            <div id="quote"></div>
            
        </main>
    );
}