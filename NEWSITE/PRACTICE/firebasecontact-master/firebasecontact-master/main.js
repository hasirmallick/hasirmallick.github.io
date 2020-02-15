// Initialize Firebase (ADD YOUR OWN DATA)
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCJJlIQl-JwiSNkUKFlCQsKOnuojapSNjs",
    authDomain: "contactform-f97c1.firebaseapp.com",
    databaseURL: "https://contactform-f97c1.firebaseio.com",
    projectId: "contactform-f97c1",
    storageBucket: "contactform-f97c1.appspot.com",
    messagingSenderId: "201569788456",
    appId: "1:201569788456:web:3ad8880745388517ed4b1d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}