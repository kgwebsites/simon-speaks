let practice = false;
const practiceSwitch = document.querySelector('input[name=practice]');
let count = 0;
const countHTML = document.querySelector('#count');
let buzzes = [];
var playerBuzzes = [];

practiceSwitch.addEventListener('change', () => {togglePractice();});
const togglePractice = () => {
  if(practice){
    practice = false;
  } else {
    practice = true;
  }
}

const reset = () => {
  count = 1;
  buzzes = [];
  playerBuzzes = [];
  countHTML.innerHTML = count;
}

const start = () => {
  reset();
  buzz();
}

const buzz = () => {
  // Add New Buzz
  let buttonId = Math.floor(Math.random() * 4) + 1;
  let button = document.querySelector('button[value="' + buttonId + '"]');
  buzzes.push(buttonId);
  buzzList();
}

const buzzList = () => {
  // Loop buzz list
  for(let b=0;b<buzzes.length;b++){
    setTimeout(() => {
      console.log(buzzes[b]);
      audio(buzzes[b]);
      let button = document.querySelector('button[value="' + buzzes[b] + '"]');
      blink(button);
    }, 500 + (500 * b)); 
  }
}

const blink = (b) => {
  b.classList.add('active');
  //play sound
  setTimeout(() => {
    b.classList.remove('active');
  }, 250);
}

const playerBuzz = (p) => {
  playerBuzzes.push(p);
  answerCheck(p);
}

const answerCheck = (p) => {
  if(p === buzzes[playerBuzzes.length - 1]){
    audio(p);
    // Correct button pressed
    if(playerBuzzes.length == buzzes.length){
      count++;
      // If count > 20 then declare winner
      if(count > 20){
        winner();
        setTimeout(reset(), 500);
        return;
      }
      countHTML.innerHTML = count;
      playerBuzzes = [];
      buzz();
    }
  } else {
    // Wrong Sequence
    if(practice){
      // Practice Mode
      wrong();
      playerBuzzes = [];
      setTimeout(buzzList(), 500);
    } else {
      // Strict Mode
      wrong();
      setTimeout(reset(), 500);
    }
  }
}

const winner = () => {
  const winnerHTML = document.querySelector('#winner');
  winnerHTML.style.display = 'block';
  new Audio('http://www.orangefreesounds.com/wp-content/uploads/2017/09/Good-idea-bell.mp3?_=1').play();
  setTimeout(() => {
    winnerHTML.style.display = 'none';
  }, 500);
}

const wrong = () => {
  const wrongHTML = document.querySelector('#wrong');
  wrongHTML.style.display = 'block';
  new Audio('http://www.orangefreesounds.com/wp-content/uploads/2014/08/Wrong-answer-sound-effect.mp3?_=1').play();
  setTimeout(() => {
    wrongHTML.style.display = 'none';
  }, 500);
}

const audio = (b) => {
  console.log(b);
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + b + '.mp3').play();
}