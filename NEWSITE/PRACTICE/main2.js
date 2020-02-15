var imgURL;
var config = {
    apiKey: "AIzaSyA6lAnrX_QXvKtPf24I6jCnCArGpKn0JEI",
    authDomain: "foodyc-b964b.firebaseapp.com",
    databaseURL: "https://foodyc-b964b.firebaseio.com",
    projectId: "foodyc-b964b",
    storageBucket: "foodyc-b964b.appspot.com",
    messagingSenderId: "250975059042"
};
firebase.initializeApp(config);

function upload() {
    //get your select image
    var image = document.getElementById("image").files[0];
    //now get your image name
    var imageName = image.name;
    //firebase  storage reference
    //it is the path where yyour image will store
    var storageRef = firebase.storage().ref('images/' + imageName);
    //upload image to selected storage reference

    var uploadTask = storageRef.put(image);

    uploadTask.on('state_changed', function (snapshot) {
        //observe state change events such as progress , pause ,resume
        //get task progress by including the number of bytes uploaded and total
        //number of bytes
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + " done");
        document.getElementById('pBar').value = progress;

    }, function (error) {
        //handle error here
        console.log(error.message);
    }, function () {
        //handle successful uploads on complete

        uploadTask.snapshot.ref.getDownloadURL().then(function (downlaodURL) {
            //get your upload image url here...
            console.log(downlaodURL);
            imgURL = downlaodURL;
            document.getElementById('contactForm').style.display="block";
            document.getElementById('imgUpload').style.display="none";
            document.getElementById('upImage').src=downlaodURL;
        });
    });
}

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
   // Save message
  saveMessage(name, email, description, steps, comment, imgURL);
   // Clear form
  document.getElementById('contactForm').reset();
  //alert
  var r = confirm("Your message has been sent");
  if (r == true) {
    location.reload(true);
  }
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