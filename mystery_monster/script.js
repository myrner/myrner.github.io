/* --- Animation code starts here --- */
let mySplitText = new SplitText("#page-title", {type: "words,chars", position: "relative"});

gsap.from(mySplitText.chars, {duration: .4, scale: 5, x: "-50px", rotationY:360, alpha: 0, stagger: 0.05, ease: "Back.easeOut"});

/*
gsap.staggerFrom(mySplitText.chars, 0.8, {alpha:0, scale:0, ease: "Back.easeOut"}, 0.01, allDone);

function allDone(){
  mySplitText.revert();
}
*/

/*
let tl = gsap.timeline();

tl.from("#page-title", {duration: 1, scale: 0, ease: "back.out"});
*/

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

const closedDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/Monster+Game/door.png";
const botDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/Monster+Game/monster.png";
const beachDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/Monster+Game/flowers1.png";
const spaceDoorPath = "https://s3-us-west-2.amazonaws.com/niels.myrner/web.dev.projects/Monster+Game/flowers2.png";

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
  } else {
    startButton.innerHTML = 'Game over! Play Again?';
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
