const question=[
    {
        question:"Pick the answer",
        answers:[
            {Text:"answer", correct:"true"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
        ]
    },
    {
        question:"Pick the answer",
        answers:[
            {Text:"not", correct:"false"},
            {Text:"answer", correct:"true"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
        ]
    },
    {
        question:"Pick the answer",
        answers:[
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
            {Text:"answer", correct:"true"},
        ]
    },
    {
        question:"Pick the answer",
        answers:[
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
            {Text:"answer", correct:"true"},
            {Text:"not", correct:"false"},
        ]
    },
    {
        question:"Pick the answer",
        answers:[
            {Text:"answer", correct:"true"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
            {Text:"not", correct:"false"},
        ]
    },
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    countdown();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML="Next";
    showQuestion();
}
//Timer Fuction
var timeLeft = 5;
var elem = document.getElementById('timer');
var timerId = setInterval(countdown, 1000);
function countdown(){
    if (timeLeft == -1) {
      clearInterval(timerId);
      showScore();
    } else {
      elem.innerHTML = timeLeft + ' s';
      timeLeft--;
    }
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    })
    
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        selectedBtn.classList.remove("btn")
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
        selectedBtn.classList.remove("btn")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true"
    });
    nextButton.style.display ="block"
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML ="Play again";
    nextButton.style.display = "block"
   
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length && timeLeft >= 0){
        handleNextButton();
    }else{
        resetQuiz();
        startQuiz();
    }
});
function resetQuiz(){
    timeLeft = 5;
    countdown();
    
}
startQuiz(); 
