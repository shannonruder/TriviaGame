
///////////////////////////////////////////////////////////////////////////////
//CLICK EVENTS
///////////////////////////////////////////////////////////////////////////////


$('#start').on('click', function(){
    $('#start').remove();
    game.loadQuestion();
})

$(document).on('click', '.answer-button', function(e){
    game.clicked(e);
})
$(document).on('click', '#reset', function(){
    game.reset();
})

///////////////////////////////////////////////////////////////////////////////
//QUESTIONS
///////////////////////////////////////////////////////////////////////////////

var questions = [{

    question: "Which 1980s movie was the highest grossing film of the decade?",
    answers: [ "E.T. The Extraterrestrial", "Star Wars", "Jurassic Park", "Raiders of the Lost Ark"],
    correctAnswer: "E.T. The Extraterrestrial",
    image: "assets/images/ET.jpg"
}, {

    question: "MTV catapulted which of these movies to first to become a hit?",
    answers: [ "Footloose", "Purple Rain", "Blues Brothers", "Flashdance"],
    correctAnswer: "Flashdance",
    image: "assets/images/Flashdance.jpg"

}, {
    question: "The quote: 'We came. We saw. We kicked its ass.', came from which 1980s movie?",
    answers: [ "The Princess Bride", "Ghostbusters", "The Breakfast Club", "Ghost"],
    correctAnswer: "Ghostbusters",
    image: "assets/images/Ghostbusters.jpg"

}, {
    question: "Which 80s movie was Bruce Willis’ first feature film role?",
    answers: [ "Fame", "Die Hard", "An Officer and a Gentleman", "The Terminator"],
    correctAnswer: "Die Hard",
    image: "assets/images/Diehard.jpg"
}, {
    question: "Which 80s movie spawned 6 sequels and a T.V. series?",
    answers: [ "The Day After", "Gremlins", "Police Academy", "Back to the Future"],
    correctAnswer: "Police Academy",
    image: "assets/images/Policeacademy.jpg"
}, {
    question: "Which 80s movie involves a cyborg assassin travelling from the future back to 1984?",
    answers: [ "Fame", "Star Wars:The Empire Strikes Back", "The Terminator", "Back to the Future"],
    correctAnswer: "The Terminator",
    image: "assets/images/Terminator.jpg"
}, {
    question: "Which coming-of-age film was written with Molly Ringwald as the inspiration?",
    answers: [ "Pretty in Pink", "The Burning Bed", "Sixteen Candles", "Ferris Bueller's Day Off"],
    correctAnswer: "Sixteen Candles",
    image: "assets/images/16candles.jpg"
}, {
    question: "'Carpe Diem boys. Seize the day. Make your lives extraordinary.', was spoken in which movie?",
    answers: [ "Honey I Shrunk the Kids", "The Little Mermaid", "The Breakfast Club", "Dead Poet's Society"],
    correctAnswer: "Dead Poet's Society",
    image: "assets/images/DeadPoets.jpg"
}, {
    question: "What did the media affectionately call the five main actors in the 1985 movie 'The Breakfast Club?' ",
    answers: [ "The Brat Pack", "The Jackanapes", "The Terrible Teenyboppers", "The Mod Squad"],
    correctAnswer: "The Brat Pack",
    image: "assets/images/BreakfastClub.jpg"

}, {
    question: "In which movie are we introduced to the female lead Marion Ravenwood as she outdrinks a huge guy in a bar and wins a bunch of cash in the process?",
    answers: [ "Jurassic Park", "Raiders of the Lost Ark", "The Princess Bride", "Dirty Dancing"],
    correctAnswer: "Raiders of the Lost Ark",
    image: "assets/images/Raiders.jpg"
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,

///////////////////////////////////////////////////////////////////////////////
//FUNCTIONS
///////////////////////////////////////////////////////////////////////////////


    countDown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countDown,1000);
        $('#subwrapper').html("<p>Time Left: <span id='counter'>30</span> Seconds </p>");
        $('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');

        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
    },
    nextQuestion: function(){
        game.counter = 30;
        $('#counter').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
        
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $('#subwrapper').html('<h2>Out of Time!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer Was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>You finished. Congratulations!</h2>");
        $('#subwrapper').append("<h3>Answers Correct: "+game.correct+ "</h3>");
        $('#subwrapper').append("<h3>Answers Incorrect: "+game.incorrect+ "</h3>");
        $('#subwrapper').append("<h3>Unanswered Questions: "+game.unanswered+ "</h3>");
        $('#subwrapper').append("<button id='reset'>Start Over?</button>");
   
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")===questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
            }
    },

    answeredCorrectly: function(){
        clearInterval(timer);
        game.correct++;
        $('#subwrapper').html('<h2>You are correct!</h2>');
        $('#subwrapper').append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        clearInterval(timer);
        game.incorrect++;
        $('#subwrapper').html('<h2>Nope!</h2>');
        $('#subwrapper').append('<h3>The Correct Answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
        $('#subwrapper').append('<img src="' + questions[game.currentQuestion].image + '" />');
    
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }

}