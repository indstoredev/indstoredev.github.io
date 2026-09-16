// ================================================
// FIREBASE IMPORTS
// ================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


// ================================================
// FIREBASE CONFIG
// ================================================
//
// IMPORTANT:
// apiKey mein apna REAL Firebase API key paste karo.
// Baaki values aapke project ke according hain.
//

const firebaseConfig = {
  apiKey: "AIzaSyDrcF1ZbAgvLFgUKbGYUWBZyPU37yelUTA",
  authDomain: "project-firebase-90f15.firebaseapp.com",
  projectId: "project-firebase-90f15",
  storageBucket: "project-firebase-90f15.firebasestorage.app",
  messagingSenderId: "820595415508",
  appId: "1:820595415508:web:794e259ca5b2a80b7a1e41",
  measurementId: "G-8BRY5N5L47"
};

// ================================================
// INITIALIZE FIREBASE
// ================================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


// ================================================
// GOOGLE PROVIDER
// ================================================

const googleProvider =
    new GoogleAuthProvider();


googleProvider.setCustomParameters({
    prompt: "select_account"
});


// ================================================
// ELEMENTS
// ================================================

const loginCard =
    document.getElementById("loginCard");

const signupCard =
    document.getElementById("signupCard");

const profileCard =
    document.getElementById("profileCard");


const loginForm =
    document.getElementById("loginForm");

const signupForm =
    document.getElementById("signupForm");


const googleLogin =
    document.getElementById("googleLogin");


const logoutButton =
    document.getElementById("logoutButton");


const forgotPassword =
    document.getElementById("forgotPassword");


const togglePassword =
    document.getElementById("togglePassword");


const password =
    document.getElementById("password");


const showSignup =
    document.getElementById("showSignup");


const showLogin =
    document.getElementById("showLogin");


const authMessage =
    document.getElementById("authMessage");


const signupMessage =
    document.getElementById("signupMessage");


const continueStore =
    document.getElementById("continueStore");


// ================================================
// MESSAGE FUNCTION
// ================================================

function showMessage(
    element,
    message,
    type = "error"
) {

    if (!element) return;

    element.textContent = message;

    element.className =
        "auth-message " + type;

}


// ================================================
// LOADING BUTTON
// ================================================

function setButtonLoading(
    button,
    loading,
    normalText
) {

    if (!button) return;


    if (loading) {

        button.disabled = true;

        button.style.opacity = "0.7";

        button.querySelector("span").textContent =
            "Please wait...";

    } else {

        button.disabled = false;

        button.style.opacity = "1";

        button.querySelector("span").textContent =
            normalText;

    }

}


// ================================================
// SHOW LOGIN
// ================================================

function showLoginScreen() {

    loginCard.classList.remove("hidden");

    signupCard.classList.add("hidden");

    profileCard.classList.add("hidden");

    showMessage(
        authMessage,
        ""
    );

    showMessage(
        signupMessage,
        ""
    );

}


// ================================================
// SHOW SIGNUP
// ================================================

function showSignupScreen() {

    loginCard.classList.add("hidden");

    signupCard.classList.remove("hidden");

    profileCard.classList.add("hidden");

    showMessage(
        authMessage,
        ""
    );

    showMessage(
        signupMessage,
        ""
    );

}


// ================================================
// SHOW PROFILE
// ================================================

function showProfileScreen(user) {

    loginCard.classList.add("hidden");

    signupCard.classList.add("hidden");

    profileCard.classList.remove("hidden");


    // Name

    const profileName =
        document.getElementById("profileName");


    profileName.textContent =
        user.displayName ||
        "IndStore User";


    // Email

    const profileEmail =
        document.getElementById("profileEmail");


    profileEmail.textContent =
        user.email || "";


    // Photo

    const profilePhoto =
        document.getElementById("profilePhoto");


    if (user.photoURL) {

        profilePhoto.src =
            user.photoURL;

    } else {

        profilePhoto.src =
            "logo.png";

    }

}


// ================================================
// GOOGLE LOGIN
// ================================================

googleLogin.addEventListener(
    "click",
    async () => {

        try {

            googleLogin.disabled = true;

            googleLogin.style.opacity =
                "0.7";


            showMessage(
                authMessage,
                "Opening Google sign in...",
                "success"
            );


            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );


            console.log(
                "Google Login successful:",
                result.user
            );


        } catch (error) {

            console.error(
                "Google Login Error:",
                error
            );


            showMessage(
                authMessage,
                getFirebaseError(error),
                "error"
            );


        } finally {

            googleLogin.disabled =
                false;

            googleLogin.style.opacity =
                "1";

        }

    }
);


// ================================================
// EMAIL LOGIN
// ================================================

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const passwordValue =
            password.value;


        if (!email || !passwordValue) {

            showMessage(
                authMessage,
                "Please enter email and password."
            );

            return;

        }


        const loginButton =
            document.getElementById(
                "loginButton"
            );


        try {

            setButtonLoading(
                loginButton,
                true,
                "Login to IndStore"
            );


            showMessage(
                authMessage,
                "Signing you in...",
                "success"
            );


            await signInWithEmailAndPassword(
                auth,
                email,
                passwordValue
            );


        } catch (error) {

            console.error(
                "Email Login Error:",
                error
            );


            showMessage(
                authMessage,
                getFirebaseError(error),
                "error"
            );


        } finally {

            setButtonLoading(
                loginButton,
                false,
                "Login to IndStore"
            );

        }

    }
);


// ================================================
// CREATE ACCOUNT
// ================================================

signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById("signupName")
                .value
                .trim();


        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();


        const passwordValue =
            document
                .getElementById("signupPassword")
                .value;


        if (passwordValue.length < 6) {

            showMessage(
                signupMessage,
                "Password must contain at least 6 characters."
            );

            return;

        }


        try {

            showMessage(
                signupMessage,
                "Creating your account...",
                "success"
            );


            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    passwordValue
                );


            // Add display name

            await updateProfile(
                result.user,
                {
                    displayName: name
                }
            );


            showMessage(
                signupMessage,
                "Account created successfully!",
                "success"
            );


        } catch (error) {

            console.error(
                "Signup Error:",
                error
            );


            showMessage(
                signupMessage,
                getFirebaseError(error),
                "error"
            );

        }

    }
);


// ================================================
// FORGOT PASSWORD
// ================================================

forgotPassword.addEventListener(
    "click",
    async () => {

        const email =
            document
                .getElementById("email")
                .value
                .trim();


        if (!email) {

            showMessage(
                authMessage,
                "Enter your email first."
            );

            document
                .getElementById("email")
                .focus();

            return;

        }


        try {

            await sendPasswordResetEmail(
                auth,
                email
            );


            showMessage(
                authMessage,
                "Password reset email sent. Check your inbox.",
                "success"
            );


        } catch (error) {

            console.error(
                "Password Reset Error:",
                error
            );


            showMessage(
                authMessage,
                getFirebaseError(error),
                "error"
            );

        }

    }
);


// ================================================
// PASSWORD VISIBILITY
// ================================================

togglePassword.addEventListener(
    "click",
    () => {

        if (
            password.type ===
            "password"
        ) {

            password.type =
                "text";

            togglePassword.querySelector(
                "img"
            ).src =
                "https://img.icons8.com/ios-glyphs/30/777777/hide.png";


        } else {

            password.type =
                "password";

            togglePassword.querySelector(
                "img"
            ).src =
                "https://img.icons8.com/ios-glyphs/30/777777/visible.png";

        }

    }
);


// ================================================
// LOGIN → SIGNUP
// ================================================

showSignup.addEventListener(
    "click",
    () => {

        showSignupScreen();

    }
);


// ================================================
// SIGNUP → LOGIN
// ================================================

showLogin.addEventListener(
    "click",
    () => {

        showLoginScreen();

    }
);


// ================================================
// LOGOUT
// ================================================

logoutButton.addEventListener(
    "click",
    async () => {

        try {

            logoutButton.disabled =
                true;

            logoutButton.style.opacity =
                "0.7";


            await signOut(auth);


        } catch (error) {

            console.error(
                "Logout Error:",
                error
            );


            alert(
                "Logout failed. Please try again."
            );


        } finally {

            logoutButton.disabled =
                false;

            logoutButton.style.opacity =
                "1";

        }

    }
);


// ================================================
// CONTINUE TO STORE
// ================================================

continueStore.addEventListener(
    "click",
    () => {

        /*
         * Agar aapki main IndStore file
         * index.html hai:
         */

        window.location.href =
            "index.html";

    }
);


// ================================================
// AUTH STATE
// ================================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        // Login successful → main website
        window.location.replace("index.html");

    }

});


// ================================================
// FIREBASE ERROR HANDLER
// ================================================

function getFirebaseError(error) {

    const code =
        error?.code || "";


    switch (code) {


        case "auth/invalid-email":

            return "Please enter a valid email address.";


        case "auth/user-not-found":

            return "No account exists with this email.";


        case "auth/wrong-password":

            return "Incorrect email or password.";


        case "auth/invalid-credential":

            return "Incorrect email or password.";


        case "auth/email-already-in-use":

            return "This email is already registered.";


        case "auth/weak-password":

            return "Password is too weak. Use at least 6 characters.";


        case "auth/popup-closed-by-user":

            return "Google sign in was cancelled.";


        case "auth/popup-blocked":

            return "Your browser blocked the Google popup. Allow popups and try again.";


        case "auth/unauthorized-domain":

            return "This website domain is not authorized in Firebase.";


        case "auth/operation-not-allowed":

            return "This sign-in method is not enabled in Firebase.";


        case "auth/network-request-failed":

            return "Network error. Check your internet connection.";


        case "auth/too-many-requests":

            return "Too many attempts. Please wait and try again.";


        default:

            return (
                error?.message ||
                "Authentication failed. Please try again."
            );

    }

}