'use strict';

import { ref, database, auth, onValue } from './auth.js';

let currentlyLoggedUser;

auth.onAuthStateChanged(user => {
    if (user) {
        currentlyLoggedUser = user;

        const ticketsRef = ref(database, `users/${currentlyLoggedUser.uid}`);

        onValue(ticketsRef, snapshot => {
            const data = snapshot.val();
            console.log(data);
        });
    } else {
        console.log('User not logged in');
        currentlyLoggedUser = null;
    }
});
