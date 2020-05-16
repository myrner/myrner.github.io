const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let counter = 0;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if (firstCard.dataset.framework === secondCard.dataset.framework) counter++;
  if (counter == 6) {
  gsap.to("#win", {display:'flex'});
  gsap.from("#win", {delay: .5, duration: 1, alpha: 0, x: -1000, ease: "power4.out"});
}

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


/* intro shuffle tween in all cards */

/*
document.addEventListener("DOMContentLoaded", function(event) {
  
  // wait until images, links, fonts, stylesheets, scripts, and other media assets are loaded
  
  window.addEventListener("load", function() {
    
//Start of tweening Code
gsap.from(".back-face", {scale: 0, alpha: 0, stagger: .1, duration: 1.5, ease: "power4.out"});
 
//End of tweening Code
    
  }, false);
  
});

*/











