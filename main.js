import './style.css'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUc36ET69Y-Z9fkR6IrXCgSLC4xN7hLFE",
  authDomain: "auth-d1e60.firebaseapp.com",
  projectId: "auth-d1e60",
  storageBucket: "auth-d1e60.appspot.com",
  messagingSenderId: "160084788011",
  appId: "1:160084788011:web:4d660c55bf7733752cbb6e"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const notify = document.querySelector("#notify");








// signup user........


function crearteUser(){
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if(email == "" || password == ""){
      notify.innerText = "plz provide email and password";
  }
  else{

    createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
      const user = userCredentials;
        notify.innerText = "User created success";
    
  
    }) .catch((error) => {
      // Handle Signin errors
      console.error("Firebase Authentication Error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        notify.innerText = "Invalid Email. Please try again.";
      } else if (errorCode === "auth/weak-password") {
        notify.innerText = "Weak Password!!.";
      } else {
        notify.innerText = "Something went wrong. Please try again later.";
        console.error(errorMessage); // Log other errors for debugging
      }
    })

  }

}

const signup_btn = document.querySelector("#signup_btn");
signup_btn.addEventListener("click",crearteUser);









// login user........


// function loginUser(){
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;

//   if(email == "" || password == ""){
//       notify.innerText = "plz provide email and password";
//   }
//   else{

//     signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
//       const user = userCredentials;

//       if(user){
//         notify.innerText = "Login User";
//       }else{
//         notify.innerText = "Some thing is wrong";
//       }
  
//     }).catch((err)=>{
//       console.log(err);
//     })

//   }
// }


function loginUser() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;
  const notify = document.querySelector("#notify");

  if (email === "" || password === "") {
    notify.innerText = "Please provide email and passwordmmm.";
  } else {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User successfully logged in
        const user = userCredential.user;
        notify.innerText = "User logged in successfully!";
        // You can redirect or perform other actions here upon successful login
      })
      .catch((error) => {
        // Handle login errors
        console.error("Firebase Authentication Error:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/wrong-password") {
          notify.innerText = "Incorrect password. Please try again.";
        } else if (errorCode === "auth/user-not-found") {
          notify.innerText = "User not found. Please check your email.";
        } else {
          notify.innerText = "Something went wrong. Please try again later.";
          console.error(errorMessage); // Log other errors for debugging
        }
      });
  }
}


const login_btn = document.querySelector("#login_btn");
login_btn.addEventListener("click",loginUser);





//after login....

onAuthStateChanged(auth,(user)=>{
  if(user){
    document.querySelector('.user_form').classList.add('hide');
    document.querySelector('.admin_page').classList.add('show');
  }

})











// logout user........


function logout(){
 


    signOut(auth).then(()=>{
     
      document.querySelector('.user_form').classList.remove('hide');
      document.querySelector('.admin_page').classList.remove('show');
  
    }).catch((err)=>{
      console.log(err);
    })

  }

const logout_btn = document.querySelector("#logout_btn");
logout_btn.addEventListener("click",logout);





//forget password...



function showForfetPasswordFrom(){
  document.querySelector('.forget_password').classList.add('visible');
}

// function forgetPassword(){
//    const email = document.querySelector("#forget_email").value;
//    if(email == ""){
//     notify2.innerText = "Please Enter your Email";
//    }
//    else{
//     sendPasswordResetEmail(auth,email).then((user)=>{
//       console.log(user);
//       notify2.innerText = "Password reset email send check your email inbox";
//     }).then((err)=>{
//         console.log(err);
//     })

//    }
// }

function forgetPassword() {
  const email = document.querySelector("#forget_email").value;
  const notify2 = document.querySelector(".notify2");

  if (email == "") {
      notify2.innerText = "Please enter your email.";
  } else {
      sendPasswordResetEmail(auth, email)
          .then((userCredential) => {
              notify2.innerText = "Password reset email sent. Please check your email inbox.";
          })
          .catch((error) => {
              // Check if the error is due to user not found
              if (error.code === "auth/user-not-found") {
                  notify2.innerText = "Email not found. Please enter a valid email address.";
              } else {
                  // Handle other errors
                  notify2.innerText = "Something went wrong. Please try again later.";
                  console.error("Error sending password reset email:", error);
              }
          });
  }
}





const forget_link = document.querySelector('#forget_link');
forget_link.addEventListener("click",showForfetPasswordFrom);


const forget_btn = document.querySelector('#forget_btn');
forget_btn.addEventListener("click",forgetPassword);