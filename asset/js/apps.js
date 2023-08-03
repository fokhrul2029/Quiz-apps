"use strict";
/*
    // Application Name  : Quiz Application
    // Auther Name       : Md Fokhrul Islam
    // Description       : It's a simple Quiz Application and it's made by using pure js and js DOM. i have make it as a protfolio. There has a few simple question that can improve human's basic knowlage .
*/

// Class and Element Selector
let firstPage = document.querySelector(".firstPage");
let rulesPage = document.querySelector(".rulesPage");
let quizPage = document.querySelector(".quizPage");
let resultPage = document.querySelector(".resultPage");
let timeStatus = document.querySelector(".timeStatus");
let examT = document.querySelector(".examT");
let DeveloperInfo = document.querySelector(".DeveloperInfo");
let totalQueS = document.querySelector(".totalQueS");
let timerBb = document.querySelector(".examTime .blockB");

let startQ = document.querySelector(".startQ");
let exitQ = document.querySelector(".exitQ");
let ContinueQ = document.querySelector(".ContinueQ");
let nextQ = document.querySelector(".nextQ");
let replayQ = document.querySelector(".replayQ");
let quitQ = document.querySelector(".quitQ");
let Timer = document.querySelector(".Timer");
let result = document.querySelector(".result h4");
let fkrl = document.querySelector(".fkrl");
let backP = document.querySelector(".backP");
let exitP = document.querySelector(".exitP");

//  EventListeners
fkrl.onclick = () => {
  firstPage.classList.remove("active");
  DeveloperInfo.classList.add("showInfo");
};
backP.onclick = () => {
  firstPage.classList.add("active");
  DeveloperInfo.classList.remove("showInfo");
};
exitP.onclick = () => {
  firstPage.classList.add("active");
  DeveloperInfo.setAttribute("class", "DeveloperInfo");
};

startQ.onclick = () => {
  firstPage.classList.remove("active");
  rulesPage.classList.add("active");
};
exitQ.onclick = () => {
  firstPage.classList.add("active");
  rulesPage.classList.remove("active");
};

replayQ.onclick = () => {
  resultPage.classList.remove("active");
  quizPage.classList.add("active");
  replayQuiz();
};
quitQ.onclick = () => {
  window.location.reload();
};

ContinueQ.onclick = () => {
  quizPage.classList.add("active");
  rulesPage.classList.remove("active");
  showQuestions(que_count);
  startTimer(timeValue);
};

let que_count = 0;
let counter;
let timeValue = 25; // EXAM'S TIME
let score = 0;
Timer.textContent = timeValue;
examT.textContent = `${timeValue} seconds`;

nextQ.onclick = () => {
  nextQ.style.display = "none";
  timeStatus.textContent = "Time Left";
  if (que_count < Questions.length - 1) {
    timeStatus.style.color = "var(--primary-color)";
    timerBb.style.border = "2px solid var(--primary-color)";
    Timer.style.background = "var(--primary-color)";
    que_count++;
    showQuestions(que_count);
    clearInterval(counter);
    startTimer(timeValue);
  } else {
    quizPage.classList.remove("active");
    resultPage.classList.add("active");
    result.textContent = `You Have Got ${score} Out of ${Questions.length}`;
  }
};
const showQuestions = (index) => {
  // Question Number and Questions
  let questions = document.querySelector(".questions");
  let queTag = `<span> ${Questions[index].numb}. ${Questions[index].question} </span>`;
  questions.innerHTML = queTag;
  // Options of Questions
  let allOptions = document.querySelector(".allOptions");
  let optTag = `
    <div class="option"><span>${Questions[index].options[0]}</span></div>
    <div class="option"><span>${Questions[index].options[1]}</span></div>
    <div class="option"><span>${Questions[index].options[2]}</span></div>
    <div class="option"><span>${Questions[index].options[3]}</span></div>
    `;
  allOptions.innerHTML = optTag;

  let totalQ = document.querySelector(".totalQ");
  let totalTag = `${Questions[index].numb} of ${Questions.length}`;
  totalQ.innerHTML = totalTag;

  let option = allOptions.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
};
let trueIcon = `<div> <i class="fas fa-check"></i> </div> `;
let falseIcon = ` <div> <i class="fas fa-times"></i> </div> `;
const optionSelected = (ans) => {
  nextQ.style.display = "block";
  clearInterval(counter);
  let userAns = ans.textContent;
  let correctAns = Questions[que_count].answer;
  if (userAns === correctAns) {
    score += 1;
    console.log(score);
    ans.classList.add("true");
    ans.insertAdjacentHTML("beforeend", trueIcon);
  } else {
    ans.classList.add("false");
    ans.insertAdjacentHTML("beforeend", falseIcon);
    let option = document.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
      if (option[i].textContent === correctAns) {
        option[i].setAttribute("class", "option true");
        option[i].insertAdjacentHTML("beforeend", trueIcon);
      }
    }
  }

  let option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].classList.add("disabled");
  }
};

const startTimer = (time) => {
  counter = setInterval(() => {
    Timer.textContent = time;
    time--;

    if (time < 9) {
      let i = Timer.textContent;
      Timer.textContent = `0${i}`;
    }

    if (time < 10) {
      timeStatus.style.color = "var(--worning-color)";
      timerBb.style.border = "2px solid var(--worning-color)";
      Timer.style.background = "var(--worning-color)";
    }
    if (time < 0) {
      clearInterval(counter);
      Timer.textContent = "00";
      timeStatus.textContent = "Time Off";
      let ans = Questions[que_count].answer;
      let option = document.querySelectorAll(".option");
      for (let i = 0; i < option.length; i++) {
        if (option[i].textContent === ans) {
          option[i].setAttribute("class", "option true");
          option[i].insertAdjacentHTML("beforeend", trueIcon);
        }
      }
      for (let i = 0; i < option.length; i++) {
        option[i].classList.add("disabled");
      }
      nextQ.style.display = "block";
    }
  }, 1000);
};

const replayQuiz = () => {
  que_count = 0;
  score = 0;
  showQuestions(que_count);
};
