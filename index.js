let questions= [
  {
    question : 'How many NBA teams are there?',
    answer : '30',
    options : ['4', '10', '28', '30'],
  },
  {
    question : 'What year did the Knicks win its first championship?',
    answer : '1970',
    options : ['1973', '1970', '1997', '2017'],
  },
  {
    question : 'Before Russel Westbrook who held the most triple doubles in a season record?',
    answer : 'Robertson',
    options : ['Greg Oden', 'Robertson', 'Kyle Miller', 'Westbrook'],
  },
  {
    question : 'Who won the most recent nba championship?',
    answer : 'Warriors',
    options : ['Knicks', 'Jazz', 'Cavaliers', 'Warriors'],
  },
  {
    question : 'Which active player has the most MVPs',
    answer : 'Lebron',
    options : ['Curry', 'Jordan', 'Lebron', 'Harden'],
  }
];

let currentQuestionIndex = -1;
let numCorrect = 0;

function renderCurrentQuestion(index) {
  // example we are on question 2 therefore the index is index 1 
  // html would have a place to render the HTML for a question
  
  // rendering the question
  $('.question').text(questions[index].question);
  //reset current result
  $('.current-result').text('');
  
  // rendering the options
  $('.answer-option').html
    (
      `<form>
        <fieldset>
        <legend>Options</legend>
          <input type="radio" name="radio-option" value=${questions[index].options[0]}>
            ${questions[index].options[0]}
          </label>
          <label><input type="radio" name="radio-option" value=${questions[index].options[1]}>
            ${questions[index].options[1]}
          </label>
          <label><input type="radio" name="radio-option" value=${questions[index].options[2]}>
            ${questions[index].options[2]}
          </label>
          <label><input type="radio" name="radio-option" value=${questions[index].options[3]}>
            ${questions[index].options[3]}
          </label>
        </fieldset>
      </form>`
    );
    
    if (currentQuestionIndex === (questions.length-1)) {
      $('.next').hide();
    }
}

function renderButtons(){
  $('main').html(`
    <p class='question'></p>
    <ul class='answer-option'></ul>
    <span class='button-place'>
      <input class='submit-answer' type="button" value="Submit" />
      <button class='next' disabled>Next</button>
    </span>
    <button class='end-game'>End Game</button>
  `);
}

function renderScoring(){
  $('main').append(`
    <p class = 'current-result'></p>
    <span class='current-question'></span>
    <span class='current-score'>Score 0 points</span>
  `);
}

$('main').on('click', '.start-button', function(){
  renderButtons();
  renderScoring();
  currentQuestionIndex++;
  $('.current-question').text(`Question ${currentQuestionIndex+1}/5`);
  renderCurrentQuestion(currentQuestionIndex);
});

$('main').on('click', '.next', function(){
  $(".submit-answer").prop('disabled', false);
  $(this).prop('disabled', true);
  nextQuestion();
});

function nextQuestion(){
  currentQuestionIndex++;
  $('.current-question').text(`Question ${currentQuestionIndex+1}`);
  renderCurrentQuestion(currentQuestionIndex);
  $(this).hide();
}

$("main").on('click', '.submit-answer', function (){
  let radioValue = $("input[name='radio-option']:checked").val();
  if(radioValue !== undefined){
    isCorrect(radioValue);
    $(this).prop('disabled', true);
    $(".next").prop('disabled', false);
  }
  else{
    $('.current-result').text('Please select an answer.');
  }
});

function isCorrect(radioValue){
  if(radioValue === questions[currentQuestionIndex].answer){
   numCorrect++;
   $('.current-result').text('Correct!');
  }
  else if(radioValue !== questions[currentQuestionIndex].answer){
    $('.current-result').text(`The Correct answer is ${questions[currentQuestionIndex].answer}` );
    }
  $('.current-score').text(`Score ${numCorrect} points`);
}

$('main').on('click', '.end-game', function(){
  renderEndGame();
  gameEnd();
});

function renderEndGame(){
  $('main').html(`
    <p>Congratulations you have completed the NBA quiz app! Press start quiz to try again.</p>
    <button class='start-button'>Start Quiz</button>
    <p class= 'total-score'></p>
  `);
}

function gameEnd() {
  $('.end-game').hide();
  $('.total-score').text(`Your total was ${numCorrect} points`);
  currentQuestionIndex= -1;
  numCorrect= 0;
}

 