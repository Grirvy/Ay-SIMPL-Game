const questions = [
    { question: "What is the first letter in the alphabet?", answer: "A" },
    { question: "What is the third letter in the alphabet?", answer: "C" },
    { question: "What is the letter after your last answer?", answer: "D" },
    { question: "What did you pick second?", answer: "C" },
    { question: "What did you pick last?", answer: "C" },
    { question: "What did you pick third", answer: "D" },
    { question: "What did you pick at the start?", answer: "A" },
    { question: "What was your last answer?", answer: "A" },

    // Add more questions here
  ];
  
  const timePerQuestion = 15; // Time allowed per question in seconds
  let questionIndex = 0;
  let timeLeft = 0;
  let timerInterval;
  
  // Grab the start button
  const startButton = document.getElementById('start-btn');
  // Grab the question element
  const questionElement = document.getElementById('question');
  // Grab the time left element
  const timeLeftElement = document.getElementById('time-left');
  // Grab the submit score button
  const submitScoreButton = document.getElementById('submit-score');
  // Grab the initials input
  const initialsInput = document.getElementById('initials');

  // Add event listener to start button to start quiz
  startButton.addEventListener('click', startQuiz);
  
  function startQuiz() {
  // Hide the start button
    startButton.style.display = 'none';

    // Set the time left
    timeLeft = questions.length * timePerQuestion;

    // Display the questions
    displayQuestion();
    // Start the timer
    startTimer();
  };
  
  function displayQuestion() {
    if (questionIndex < questions.length) {
      questionElement.textContent = questions[questionIndex].question;
    } else {
      endQuiz();

    }
  };
  
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
      } else {
        endQuiz();

      }
    }, 1000);
  };

  function checkAnswer(answer) {
    if (answer === questions[questionIndex].answer) {
        console.log('Correct!');

    } else {
        timeLeft -= 3;
        if (timeLeft < 0) {
            timeLeft = 0;

        }
        timeLeftElement.textContent = timeLeft;
    }
    questionIndex++;
    displayQuestion();

  };

  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && questionIndex < questions.length) {
      const userAnswer = document.getElementById('user-answer').value;
      checkAnswer(userAnswer);

    }
  });
  
  function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = 'Game Over';
    submitScoreButton.style.display = 'block';
    // Other logic to handle score
    submitScoreButton.addEventListener('click', saveScore);
  };
  
  function saveScore() {
    const initials = initialsInput.value;
    const score = timeLeft; // Use time left as the score
    // Store the score and initials in a database or local storage

    console.log("Initials:", initials, "Score:", score);
    // Additional logic to handle score saving
  };

  function endQuiz() {
    clearInterval(timerInterval);
    questionElement.textContent = 'Game Over';
    submitScoreButton.style.display = 'block';
    submitScoreButton.addEventListener('click', saveScore);

  };

  function promptForInitials() {
    submitScoreButton.style.display = 'block';
    submitScoreButton.addEventListener('click', saveScore);

  };

  function saveScore() {
    const initials = initialsInput.value;
    const score = timeLeft;

    if (initials.trim() !== '') {
        let scores = JSON.parse(localStorage.getItem('quizScores')) || [];
        scores.push({ initials: initials, score: score });

        scores.sort((a, b) => {
            return b.score - a.score;

        });

        localStorage.setItem('quizScores', JSON.stringify(scores));
        alert('Score saved!');

        displayHighScore(scores[0]);

    } else {
        alert('You must enter your initials to save!');

    }
  };

  function displayHighScore(highScore) {
    const highScoreDisplay = document.getElementById('high-score');

    if (highScore) {
      highScoreDisplay.textContent = `High Score: ${highScore.initials} - ${highScore.score}`;

    }

  }