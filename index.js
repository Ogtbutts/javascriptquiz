(function(){
    // Functions
    function buildQuiz(){
        // variable to store the HTML output
        const output = [];

        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {

                // variable to store the list of possible answers
                const answers = [];

                // and for each available answer...
                for(let letter in currentQuestion.answers){

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }

                // add this question and its answers to the output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        );

        // finally combine our output list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults(){
        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        let numCorrect = 0;

        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {

            // find selected answer
            const answerContainer = answerContainers[questionNumber];
            const selector = `input[name=question${questionNumber}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if(userAnswer === currentQuestion.correctAnswer){
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[questionNumber].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[questionNumber].style.color = 'red';
            }
        });

        // show number of correct answers out of total
        resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide === 0){
            previousButton.style.display = 'none';
        }
        else{
            previousButton.style.display = 'inline-block';
        }
        if(currentSlide === slides.length-1){
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else{
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function showNextSlide() {
        showSlide(currentSlide + 1);
    }

    function showPreviousSlide() {
        showSlide(currentSlide - 1);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function startTimer() {
        clearInterval(timer); // Clear any existing timer
        timeLeft = 60; // Reset the timer
        document.getElementById('timer').textContent = timeLeft;
        document.getElementById('timer').style.color = "black";
        
        timer = setInterval(function() {
            timeLeft--;
            document.getElementById('timer').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert('Time is up!');
                setTimeout(5000);
                setTimeout(showResults(), 5000);
                setTimeout(resetQuiz(), 5000);
            }
            else if (timeLeft <= 10) {
                document.getElementById('timer').style.color = "red";
            }
        }, 1000);
    }

    function resetQuiz() {
        // Shuffle questions
        shuffle(myQuestions);

        // Rebuild quiz
        buildQuiz();

        // Reset current slide
        currentSlide = 0;

        // Re-select all slides
        slides = document.querySelectorAll(".slide");

        // Show the first slide
        showSlide(currentSlide);

        // Restart timer
        startTimer();
    }

    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    let myQuestions = [
        {
            question: "Who invented JavaScript?",
            answers: {
                A: "Douglas Crockford",
                B: "Sheryl Sandberg",
                C: "Brendan Eich"
            },
            correctAnswer: "C"
        },
        {
            question: "Which one of these is a JavaScript package manager?",
            answers: {
                A: "Node.js",
                B: "TypeScript",
                C: "npm"
            },
            correctAnswer: "C"
        },
        {
            question: "Which tool can you use to ensure code quality?",
            answers: {
                A: "Angular",
                B: "jQuery",
                C: "RequireJS",
                D: "ESLint"
            },
            correctAnswer: "D"
        },
        {
            question: "When was Year Up founded?",
            answers: {
                A: "2004",
                B: "1997",
                C: "2000",
                D: "2002"
            },
            correctAnswer: "C"
        },
        {
            question: "What attribute would you add to load the HTML document before the JavaScript?",
            answers: {
                A: "async",
                B: "alt",
                C: "wait",
                D: "defer"
            },
            correctAnswer: "D"
        },
        {
            question: "What keybind opens the developer tools.",
            answers: {
                A: "F12",
                B: "Ctrl + C",
                C: "Alt + F4",
                D: "Ctrl + v"
            },
            correctAnswer: "A"
        }
    ];

    // Shuffle questions
    shuffle(myQuestions);

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let slides;
    let currentSlide = 0;
    let timeLeft;
    let timer;

    // Kick things off
    buildQuiz();
    slides = document.querySelectorAll(".slide");
    showSlide(currentSlide);
    startTimer();

    // Event listeners
    submitButton.addEventListener('click', function() {
        alert('Try Again!');
        showResults();
        resetQuiz();
    });
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
})();
