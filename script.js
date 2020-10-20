const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Www stands for?',
    answers: [
      { text: 'world wide web', correct: true },
      { text: 'world wind web', correct: false }
    ]
  },
  {
    question: 'Which software is used to view web pages?',
    answers: [
      { text: 'Whatsapp', correct: false},
      { text: 'facebook', correct: false },
      { text: 'web browser', correct: true },
      { text: 'app store', correct: false }
    ]
  },
  {
    question: 'isp stands for?',
    answers: [
      { text: 'internet service provider', correct: true },
      { text: 'intranet source provider', correct: false },
      { text: 'intraaction set provider', correct: false },
      { text: 'none', correct: false }
    ]
  },
  {
    question: 'the company behind chrome web browser?',
    answers: [
      { text: 'googlos', correct: false },
      { text: 'google', correct: true },
      { text: 'yahooo', correct: false },
      { text: 'sony', correct: false }
    ]
  },
  {
    question: 'who created java script?',
    answers: [
      { text: 'brendan eich', correct: true },
      { text: 'mark jukerberg', correct: false },
      { text: 'steave job', correct: false },
      { text: 'narendra modi', correct: false }
    ]
  },
  {
    question: 'which tag is used to link an image in html page?',
    answers: [
      { text: 'p', correct: false },
      { text: 'div', correct: false },
      { text: 'function', correct: false },
      { text: 'img', correct: true }
    ]
  },
  {
    question: 'name a popular version control system.',
    answers: [
      { text: 'github', correct: true },
      { text: 'gethub', correct: false }
    ]
  }
]
