var config = {
    apiKey: "AIzaSyA6lAnrX_QXvKtPf24I6jCnCArGpKn0JEI",
    authDomain: "foodyc-b964b.firebaseapp.com",
    databaseURL: "https://foodyc-b964b.firebaseio.com",
    projectId: "foodyc-b964b",
    storageBucket: "foodyc-b964b.appspot.com",
    messagingSenderId: "250975059042"
};
firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages1');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var rply = getInputVal('rply');

 // Save message
  saveMessage(name, email, rply);

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
function saveMessage(name, email, rply){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    reply: rply
  });
}