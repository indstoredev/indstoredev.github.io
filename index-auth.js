// ==========================================
// FIREBASE
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",

    authDomain:
        "project-firebase-90f15.firebaseapp.com",

    projectId:
        "project-firebase-90f15",

    storageBucket:
        "project-firebase-90f15.firebasestorage.app",

    messagingSenderId:
        "820595415508",

    appId:
        "1:820595415508:web:794e259ca5b2a80b7a1e41",

    measurementId:
        "G-8BRY5N5L47"

};


// ==========================================
// INITIALIZE
// ==========================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);


// ==========================================
// ELEMENTS
// ==========================================

const navLogin =
    document.getElementById("navLogin");

const userMenu =
    document.getElementById("userMenu");

const userButton =
    document.getElementById("userButton");

const userDropdown =
    document.getElementById("userDropdown");

const logoutButton =
    document.getElementById("logoutButton");


const navUserPhoto =
    document.getElementById("navUserPhoto");

const navUserName =
    document.getElementById("navUserName");


const dropdownPhoto =
    document.getElementById("dropdownPhoto");

const dropdownName =
    document.getElementById("dropdownName");

const dropdownEmail =
    document.getElementById("dropdownEmail");


// ==========================================
// AUTH STATE
// ==========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        // ==============================
        // USER LOGGED IN
        // ==============================

        console.log(
            "Logged in:",
            user.email
        );


        // Hide Login

        if (navLogin) {

            navLogin.classList.add(
                "hidden"
            );

        }


        // Show User Menu

        if (userMenu) {

            userMenu.classList.remove(
                "hidden"
            );

        }


        // User name

        const name =
            user.displayName ||
            "Account";


        navUserName.textContent =
            name;


        dropdownName.textContent =
            name;


        // Email

        dropdownEmail.textContent =
            user.email || "";


        // Profile photo

        if (user.photoURL) {

            navUserPhoto.src =
                user.photoURL;

            dropdownPhoto.src =
                user.photoURL;

        } else {

            navUserPhoto.src =
                "logo.png";

            dropdownPhoto.src =
                "logo.png";

        }


    } else {

        // ==============================
        // USER NOT LOGGED IN
        // ==============================

        if (navLogin) {

            navLogin.classList.remove(
                "hidden"
            );

        }


        if (userMenu) {

            userMenu.classList.add(
                "hidden"
            );

        }

    }

});


// ==========================================
// USER MENU
// ==========================================

if (userButton) {

    userButton.addEventListener(
        "click",
        () => {

            userDropdown.classList.toggle(
                "show"
            );

        }
    );

}


// ==========================================
// CLOSE DROPDOWN
// ==========================================

document.addEventListener(
    "click",
    (event) => {

        if (
            userMenu &&
            !userMenu.contains(event.target)
        ) {

            userDropdown.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================
// LOGOUT
// ==========================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                await signOut(auth);


                // Login page par wapas

                window.location.replace(
                    "login.html"
                );


            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

                alert(
                    "Logout failed. Please try again."
                );

            }

        }
    );

}