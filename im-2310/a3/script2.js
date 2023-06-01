/*
The function loadPageAfterDelay() handles the red timer bar -
it takes in a number in ms that defines how long until the next page will load. the animation time must match the 
load time in order to proper sequence the 'time-out' functionality of the interaction. Load time and animation time are in 
milliseconds and seconds respectively. I finished building the project and consolidated these parametres by multiplying or dividing one of them by 1000 in the funciton. 
*/
function loadPageAfterDelay(loadTime, currentPageId, nextPageId, startButtonId, loadBodyId, loadThrobberId){
  /* the first step is to show the loading bar element */
  // hide link
  // show throbber
  document.getElementById(loadThrobberId).style.display = 'block';
  //animation time = load time divided by 1000 ... changing ms->s
  document.getElementById(loadThrobberId).style.animation = 'growBar '+ loadTime/1000 +'s infinite linear';

  // the time bar is actually the load body's background color turned red, with the load throbber above shrinking to 
  // look like a growing red bar
  document.getElementById(loadBodyId).style.backgroundColor = 'rgb(246, 124, 111)';

  // make the start button invisible
  document.getElementById(startButtonId).style.backgroundColor = 'transparent';
  document.getElementById(startButtonId).style.color = 'transparent';
  document.getElementById(startButtonId).style.transition = 'color 0.5s linear';
  // making the cursor normal signifies the end of interactivity
  document.getElementById(startButtonId).style.cursor = 'default';

  // make the 'restart' button appear by altering its display attribution 
  document.getElementById("top-banner-restart").style.display = 'inline-flex';

  //  set the display of the start button element to 'none'. stops it from executing the 
  //  createImages() and createDistinctImages() functions.
  setTimeout(() => {
    document.getElementById(startButtonId).style.display = 'none';
  }, 600);



  /*
  set the time for the interaction to transition to the 'game over' state, should the user fail to click the face in time 
  */

  setTimeout(() => {
    showPage(currentPageId, nextPageId);
  }, loadTime);
  
  
}

// function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
// function to create and position the 'sad faces'
function createImages(imageNumber, minTime, maxTime, loadBodyId) {
  var container = document.getElementById(loadBodyId);


  for (var i = 0; i < imageNumber; i++) {
    // delay the creation of each image by a random time within 4 seconds
    var delay = getRandomNumber(minTime, maxTime);

    setTimeout(function() {
    var image = document.createElement("img");
    image.src = "./images/sadFace.png";
    image.classList.add("image-test");


    // set random positions
    var posX = getRandomNumber(0, window.innerWidth - 20);
    var posY = getRandomNumber(0, window.innerHeight - 20);
    image.style.left = posX + "px";
    image.style.top = posY + "px";
    
    // generate the image onto the page
    container.appendChild(image);
    }, delay);
  }
}
// Function to create and position the 'happy faces'
function createDistinctImages(imageNumber, minTime, maxTime, currentPageId, nextPageId, loadBodyId) {
    
  var container = document.getElementById(loadBodyId);

  for (var i = 0; i < imageNumber; i++) {
    // Delay the creation of each image by a random time within 4 seconds
    var delay = getRandomNumber(minTime, maxTime);
    setTimeout(function() {
    var image = document.createElement("img");
    image.src = "./images/happyFace.png";
    image.classList.add("distinct-image");

    // transition to the next level by clicking on the happy face
    // go from the current page to the next page by altering certain display attributions
    image.addEventListener("click", e => {
      showPage(currentPageId, nextPageId)});



    // set random positions so as to afford difficulty 
    var posX = getRandomNumber(0, window.innerWidth - 20);
    var posY = getRandomNumber(0, window.innerHeight - 20);
    image.style.left = posX + "px";
    image.style.top = posY + "px";

    container.appendChild(image);
    
    }, delay);
  }

}


/* MUTE/UNMUTE */

// function muteUnmute() {
//   var muteButton = document.getElementById("top-banner-mute");

//   // console.log('mute/unmute');
//   if (muteButton.muted) {
//     // if it isn't already unmuted make it unmute
//     muteButton.muted = false;
//     // then make sure the button changes to mute indicating what it does if you click it
//     muteButton.innerText = "MUTE";
//   } else {
//     // if it isn't already muted make it mute
//     muteButton.muted = true;
//     // then make sure the icon on the button changes to unmute indicating what it does if you click it
//     muteButton.innerText = "UNMUTE";
//   }
// }


// function that switches the display value to 'none' and visible respectively for current page and next page
// this is the fundamental visual transition function
function showPage(currentPageId, nextPageId) {
  // Hide all pages
  var currentPage = document.getElementById(currentPageId);
    currentPage.style.display = 'none';

  // Show the selected page
  var pageToShow = document.getElementById(nextPageId);
  pageToShow.style.display = 'block';
}