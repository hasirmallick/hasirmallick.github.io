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
var messagesRef = firebase.database().ref('messages2');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

   // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var description = getInputVal('description');
  var steps = getInputVal('steps');
  var comment = getInputVal('comment');
  var imgURL = getInputVal('imgURL');
   // Save message
  saveMessage(name, email, description, steps, comment, imgURL);

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
function saveMessage(name, email, description, steps, comment, imgURL){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email: email,
    description: description,
    steps: steps,
    comment: comment,
    URL:imgURL
  });
}