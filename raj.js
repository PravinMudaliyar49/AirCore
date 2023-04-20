'use strict';

import { auth, ref, push, set, database } from './auth.js';

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName('mySlides');
    let dots = document.getElementsByClassName('dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
    }
    // slides[slideIndex - 1].style.display = 'block';
    // dots[slideIndex - 1].className += 'active';
}

const flightForm = document.getElementById('flight_form');
const formBtn = document.querySelector('.form_btn');
const logStatusBtn = document.getElementById('log_status');

let currentlyLoggedUser;

auth.onAuthStateChanged(user => {
    if (user) {
        /* // currentUser = user;
        userLogStatus.userInfo = user;
        
        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = false; */
        console.log(user.uid, user.email);

        currentlyLoggedUser = user;

        formBtn.textContent = 'Submit';
        formBtn.disabled = false;
        logStatusBtn.textContent = 'Log out';
    } else {
        console.log('User not logged in');

        // formBtn.textContent = 'You need to log in first!';
        // formBtn.disabled = true;

        currentlyLoggedUser = null;

        formBtn.textContent = 'You need to log in first!';
        formBtn.disabled = true;
        logStatusBtn.textContent = 'Log in';
    }
});

const searchFlightsDropdown = document.getElementById('search_flights');
const fromInput = document.querySelector('.input_from');
const toInput = document.querySelector('.input_to');
const departInput = document.getElementById('depart');
const returnInput = document.getElementById('return');
const adultsDropdown = document.getElementById('adults');
const childrenDropdown = document.getElementById('childs');
const seatClassDropdown = document.getElementById('seatclass');
const infantsDropdown = document.getElementById('infants');

flightForm.addEventListener('submit', e => {
    e.preventDefault();

    var ticketData = {
        flight: searchFlightsDropdown.value,
        wayType: document.querySelector('input[name="way"]:checked').value,
        from: fromInput.value,
        to: toInput.value,
        depart: departInput.value,
        return: returnInput.value,
        adults: adultsDropdown.value,
        children: childrenDropdown.value,
        seatClass: seatClassDropdown.value,
        infants: infantsDropdown.value,
    };

    console.log(ticketData);

    const userDataRef = ref(database, `users/${currentlyLoggedUser.uid}`);
    const ticketDataRef = push(userDataRef);
    set(ticketDataRef, ticketData);

    alert('Ticket booked successfully');
});
