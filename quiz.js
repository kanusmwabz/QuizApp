const questions = [
    {
        question: "What is a common file format for digital images?",
        answers: [
            { text: ".docx", correct: false },
            { text: ".jpg", correct: true },
            { text: ".mp3", correct: false },
            { text: ".exe", correct: false },
        ]
    },
    {
        question: "Which programming language is primarily used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "C++", correct: false },
            { text: "Javascript", correct: true },
            { text: "COBOL", correct: false },
        ]
    },
    {
        question: "What is the main function of a router in a computer network?",
        answers: [
            { text: "To direct data traffic between devices", correct: true },
            { text: "To store files", correct: false },
            { text: "To process data", correct: false },
            { text: "To install software", correct: false },
        ]
    },
    {
        question: "Which of the following is NOT an example of an operating system?",
        answers: [
            { text: "Linux", correct: false },
            { text: "Windows", correct: false },
            { text: "macOS", correct: false },
            { text: "Microsoft Word", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");
const feedbackElement = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerSelected = false;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswer = null;
    answerSelected = false;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    feedbackElement.innerHTML = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
    answerSelected = false;
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    // If the same button is selected again, we allow them to unselect it
    if (selectedAnswer === selectedBtn) {
        selectedBtn.classList.remove("selected", "correct", "incorrect");
        selectedBtn.disabled = false; 
        selectedAnswer = null;
        answerSelected = false;
        nextButton.style.display = "none";
        feedbackElement.innerHTML = "";
        return;
    }

    // If another answer is selected, unselect the previous one
    if (selectedAnswer) {
        selectedAnswer.classList.remove("selected", "correct", "incorrect");
        selectedAnswer.disabled = false;
    }

    selectedBtn.classList.add("selected");
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        feedbackElement.innerHTML = "Correct! Well done.";
        feedbackElement.style.color = "green";
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
        feedbackElement.innerHTML = "Wrong! The correct answer is:";
        feedbackElement.style.color = "red";
    }

    // Highlight the correct answer if the selected answer is incorrect
    if (!isCorrect) {
        const correctBtn = Array.from(answerButtons.children).find(button => button.dataset.correct === "true");
        if (correctBtn) {
            correctBtn.classList.add("correct");
        }
    }

    // Disable all buttons after selection
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
    });

    selectedAnswer = selectedBtn;
    answerSelected = true;
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
