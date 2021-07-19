import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
global.jQuery = global.$ = require('jquery');
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import "./css/main.css";
import { config } from "./scripts/config.js";
import "./scripts/route.js";

// CHECK DEBUG MODE
if(!config.debug){
    var methods = ["log", "debug", "warn", "info"];
    for(var i=0;i<methods.length;i++){
        console[methods[i]] = function(){};
    }
}

$(function() {
    console.log( "document ready!" );
    buttonTooltip();
});

function buttonTooltip() {
    var INITIAL_CONTENT = `<div class="body-m text-s0" style="margin:5px 0;">Loading...</div>`;

    tippy('[data-tooltip]', {
        content: INITIAL_CONTENT,
        allowHTML: true,
        hideOnClick: false,
        trigger: 'mouseenter focusin',
        theme: 'tomato',//light-border, light, material, translucent
        onShow(instance) {
            var content = instance.reference.getAttribute('data-tippy-content');
            if(!content) content = 'Loading...';
            instance.setContent(`<div class="body-m text-s0" style="margin:5px 0;">${content}</div>`);
        },
        onTrigger(instance, event) {
            if(event.type=='focusin') {
                instance.setContent('<div class="body-m text-s0" style="margin:5px 0;">Clicked...</div>');
            }
        },
        onUntrigger() {
            document.querySelector('button').blur();
        }
    })
}

window.changeRoute = (val) => {
    // console.log('change routing--', val)
    switch(val) {
        case 'create': window.location.href = '#/create';
            break;
        case 'update': window.location = '#/update';
            break;
        case 'userlist': window.location = '#/';
            break;
        case 'delete': console.log('copy four')
            showToast("Show information here!!!");
            break;
    }
}

function showToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        backgroundColor: "#00a653",
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
}