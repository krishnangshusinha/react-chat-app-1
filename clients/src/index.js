// Dependencies
/*

    npm i react-router-dom          --> installing react router for routing
    npm i socket.io-client          --> socket.io client side
    npm i react-scroll-to-bottom    --> for adding scroll down animations
    npm i react-emoji               --> for using react emojis
    npm i query-string              --> Query strings, also known as search parameters, are another way to pass state through the URL. They are part of the URL that comes after a question mark ?, and they consist of key/value pairs separated by &.

*/

import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";   // since we used react router

import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);