answers_buttons_div = document.getElementById("answers-buttons");
question_display = document.getElementById("question");
next_button = document.getElementById("next-ques-button");

let questions_answers = [
    {
        question: "Which movie is the highest rated film of the Century?",
        answers: [
            {text: "The boys", correct: true},
            {text: "Wonderwoman", correct: false},
            {text: "Avengers", correct: false},
            {text: "Captain Marvel", correct: false},
        ]
    },
    {
        question: "Which book is the highest rated book of the Century?",
        answers: [
            {text: "Percy Jackson", correct: false},
            {text: "Kane Cronicles", correct: false},
            {text: "Cursed Immortality", correct: true},
            {text: "Naruto", correct: false},
        ]
    },    {
        question: "Who was voted the most beautiful woman in the world?",
        answers: [
            {text: "Emma Watson", correct: false},
            {text: "Halle Berry", correct: true},
            {text: "Cassandra Clare", correct: false},
            {text: "Scarlet Johanson", correct: false},
        ]
    },    {
        question: "Which videogame is the highest rated PS game of the Century?",
        answers: [
            {text: "God of War Ragnarok", correct: true},
            {text: "Hogwarts Legacy", correct: false},
            {text: "Fifa 2023", correct: false},
            {text: "GTA 5", correct: false},
        ]
    },  {
        question: "Which series is the best rated series of the Century?",
        answers: [
            {text: "The Vampire Diaries", correct: false},
            {text: "Heroes", correct: false},
            {text: "Legends of Tommorow", correct: false},
            {text: "The Originals", correct: true},
        ]
    }

    ];


let currentQuestionIndex = 0;
let score = 0;

function displayQuestionsAndAnswers(){
    resetQuizAndAnswers();
    let currentQuestion_question = questions_answers[currentQuestionIndex].question;
    let currentQuestion_answers = questions_answers[currentQuestionIndex].answers;
    let currentQuestionNumber = currentQuestionIndex + 1;
    question_display.innerHTML = currentQuestionNumber + ". " + currentQuestion_question;

    currentQuestion_answers.forEach(answer => {
        let button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("answer-button");
        answers_buttons_div.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
    });
};

function resetQuizAndAnswers(){
    next_button.style.display = "none";
    while(answers_buttons_div.firstChild){
        answers_buttons_div.removeChild(answers_buttons_div.firstChild);
    }
};

function chooseAnswer(e){
    let chosenButton = e.target;
    let isCorrect = chosenButton.dataset.correct === "true";
    if (isCorrect){
        chosenButton.classList.add("correct");
    }
    else{
        chosenButton.classList.add("incorrect");
    }
    Array.from(answers_buttons_div.children).forEach(
        button => {
            if (button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        }
    );
    next_button.style.display = "block";
}

next_button.addEventListener('click', () => {
    if (currentQuestionIndex < questions_answers.length){
        activateNextButton();
    }
    else {
        BeginQuiz()
    }
})

function activateNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex<questions_answers.length){
        displayQuestionsAndAnswers()
    }
}


function BeginQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    displayQuestionsAndAnswers();
};

BeginQuiz();
