// wait until DOM is ready
document.addEventListener("DOMContentLoaded", function(event) {

 // wait until window, stylesheets, images, links, and other media assets are loaded
 window.onload = function() {

  /* --- Animation --- */

gsap.set(".header", {opacity: 1});
gsap.set(".instructions-number", {opacity: 1});
gsap.set(".instructions-text", {opacity: 1});
gsap.set(".door-row", {opacity: 1});
gsap.set(".start-row", {opacity: 1});

let tl = gsap.timeline();

tl.from(".header", {delay: .1, duration: 1, scaleY: 0, transformOrigin: "center top"});

let mySplitText = new SplitText("#page-title");
tl.from(mySplitText.chars, {duration: 1, scale: 5, x: "-25px", rotationY:360, alpha: 0, stagger: 0.05, ease: "Back.easeOut"}, "<");

tl.from(".instructions-number", {duration: .4, ease: "back.out", alpha: 0, x: -50, stagger: .25});
tl.from(".instructions-text", {duration: .4, ease: "back.out", alpha: 0, x: 50, stagger: .25}, "<");

tl.from("#door1", {duration: 1, ease: "back.out", scale: 0, alpha: 0});
tl.from("#door2", {duration: 1, ease: "back.out", scale: 0, alpha: 0}, "<.4");
tl.from("#door3", {duration: 1, ease: "back.out", scale: 0, alpha: 0}, "<.4");


tl.from(".start-row", {duration: 1, alpha: 0, y: 50, ease: "back.out"}, "<.25");
 };
});



/* --- Game functionality starts here --- */

let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;
let startButton = document.getElementById('start');
let currentlyPlaying = true;

const isBot = (door) => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
}

const isClicked = (door) => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
}

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
  gameOver('win');
} else if (isBot(door)) {
  gameOver();
}
}

const closedDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/better_together/door.png";
const botDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/better_together/both.png";
const beachDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/better_together/cat.png";
const spaceDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/better_together/dog.png";

doorImage1.onclick = () => {
if (currentlyPlaying && !isClicked(door1)) {
  doorImage1.src = openDoor1;
  playDoor(doorImage1);
}
}

doorImage2.onclick = () => {
if (currentlyPlaying && !isClicked(door2)) {
  doorImage2.src = openDoor2;
  playDoor(doorImage2);
}
}

doorImage3.onclick = () => {
if (currentlyPlaying && !isClicked(door3)) {
  doorImage3.src = openDoor3;
  playDoor(doorImage3);
}
}

startButton.onclick = () => {
  if(!currentlyPlaying) {
    startRound();
  }
}

const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = 'Good Luck!';
  currentlyPlaying = true;
  randomChoreDoorGenerator();
}

function gameOver(status) {
  if (status === 'win') {
    startButton.innerHTML = 'You win! Play Again?';
    let mySplitText = new SplitText("#page-title");
    gsap.from(mySplitText.chars, {duration: 1, scale: 5, x: "-25px", rotationY:360, alpha: 0, stagger: 0.05, ease: "Back.easeOut"});
    gsap.from(".start-row", 2, {scale: 1.3, ease: "elastic.out(1, 0.3)"});
  } else {
    startButton.innerHTML = 'Game over! Play Again?';
    gsap.from(".start-row", 2, {scale: 1.3, ease: "elastic.out(1, 0.3)"});
  }
  currentlyPlaying = false;
}

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  if (choreDoor === 0) {
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if (choreDoor === 1) {
    openDoor2 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else {
    openDoor3 = botDoorPath;
    openDoor1 = beachDoorPath;
    openDoor2 = spaceDoorPath;
  }
}

startRound();

