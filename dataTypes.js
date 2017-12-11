class tuple{
  //question object
  constructor(question,source,author,title){
    this.question = question;
    this.source = source;
    this.author = author;
    this.title = title;
  }
}

function options_construct(){
  //function to read config from html and store settings in array
}

function generate_proportion(bookCount,questionCount){
  //function to generate random proportions for included books
  var total = questionCount;

  if (total < 0) {
  //questions are infinite, no need to randomize proportions
    return [-1];
  }
  else{
  //determine acceptable bounds for proportions
    var average = Math.ceil(total/bookCount);
    //more extreme values increase likelihood of exceeding 100%
    var max = Math.floor(average * 1.2);
    var min = Math.floor(average * 0.8);

    //calculate proportions
    var proportionList = [];
    for (var i = 1; i < bookCount; i++) {
      //random integer in range
      var proportion = Math.floor(Math.random() * (max - min) ) + min;
      proportionList.push(proportion);
      total = total - proportion;
    }

    if(total < 0){
    //exceeded 100% - subtract overage from second to last value, use overage as last value
      proportionList[proportionList.length - 1] = proportionList[proportionList.length - 1] + total;
      proportionList.push(Math.abs(total));
    }
    else{
    //sets last proportion to remaining percentage
      proportionList.push(total);
    }

    // //test algorithm -> proportions should always sum to 100
    // var count = Number(0);
    // for (var i = 0; i < proportionList.length; i++) {
    //   count = count + Number(proportionList[i]);
    // }
    // console.log("This should be the question count: " + count)

    return proportionList;
  }
}

class quiz_session{
  // one class to handle all quiz session data
  // export function for debug
  constructor(options){
    //takes array from options_construct
    this.bookList = options[0];       //list of 0/1 values
    this.bookCount = countBooks(this.booklist);

    this.questionType = options[1];   // true is spoken, false is text
    this.questionCount = options[2];  // integer value, -1 is infinite
    this.questionTimer = options[3];  // integer value, -1 is no timer
    this.questionRepeat = options[4]; // false is no repeated values, true allows repeats

    this.answerType = options[5]      // 0 no details, 1 is a break, 2 correct/incorrect, 3 is full
    this.answerTimer = options[6];    // integer value, -1 is no timer
    this.answerInput = options[7];    // 0 MC, 1 write-in, 2 MC w/ chapter, 3 write-in w/ chapter

    this.generalSound = options[8];       // false no sound, true has sound
    this.generalProgressBar = options[9]; // false no bar, true has bar
    this.generalTimer = options[10];      // false timer not displayed, true timer displayed

    this.proportions = generate_proportion(this.bookList, this.questionCount);

    //generate question list
    generateQuiz(this.questionCount);
    var this.currentQuestion;
    var this.currentQuestionBonus = false;  //bonus question boolean flag

    //initialize session stats
    this.stats = new statisticsTracker();

  }

  countBooks(booklist){
    var bookCount = 0;
    //determine number of books in question
    for (var i = 0; i < booklist.length; i++) {
      bookCount += booklist[i];
    }
    return bookCount;
  }

  giveDisplayOptions(){
    // return array of options for display decisions - intended for html build function
    return [this.generalSound,this.generalProgressBar,this.generalTimer];
  }

  generateQuestions(){
    //assembles list of questions
  }

  chooseQuestion(){
    //selects question from list, updates quiz session
  }

  giveQuestion(){
    //return question information
  }

  receiveResponse(){
    //receives user input and stores
  }

  gradeResponse(){
    //grades stored user input and updates stats
    var pointAward = [0,2];
    var authorCorrect = false;
    var titleCorrect = false;

    if(responseTitle === this.currentQuestion[3]){
      //title correct
      if(responseAuthor === this.currentQuestion[2]){
        //both correct, full credit
        pointAward[0] = 2;
      }
      else if (responseAuthor === all_authors[0]) {
        //no response for author, partial credit
        pointAward[0] = 1;
      }
      else{
        //author incorrect
        pointAward[0] = 0;
      }
    }
    else {
      //title incorrect
      pointAward[0] = 0;
    }
    if this.currentQuestionBonus{
      // bonus questions worth double
      pointAward[0] = pointAward[0] * 2;
      pointAward[1] = 4;
    }
    this.stats.addPoints(pointAward);
  }

  giveAnswer(){
    //return answer information
  }

  giveStats(){
    //returns session information
  }

  debug(comment){
    //returns class state with appended comment from user to csv

  }

}

class statisticsTracker {
  constructor() {
    this.questionCount;
    this.totalAuthor_correct;
    this.totalAuthor_incorrect;
    this.totalTitle_correct;
    this.totalTitle_incorrect;

    this.points;
    this.pointsMax;

    this.ByAuthor_total;
    this.ByAuthor_correct;
    this.ByAuthor_incorrect;
    this.ByTitle_total;
    this.ByTitle_correct;
    this.ByTitle_incorrect;
  }

  percentage(num,denom){
    //percentage calc
    if(denom > 0){
    return Math.floor((num / denom)*100);
    }
    else {
      return 0;
    }
  }

  addPoints(points){
    this.points += points;
  }
}

//array of author names
var all_authors = [
  "----",                         // no response
  "Barber, Tiki",                 // #1
  "Bradley, Kimberly Brubaker",   // #2
  "Deutsch, Barry",               // #3
  "Grabenstein, Chris",           // #4
  "Hannigan, Kate",               // #5
  "Jones, Kelly",                 // #6
  "Konigsburg, E. L.",            // #7
  "Malone, Lee Gjertsen",         // #8
  "Plourde, Lynn",                // #9
  "Roman, Dave",                  // #10
  "Rusch, Elizabeth",             // #11
  "Wheeler-Toppen, Jodi",         // #12
  "Woodson, Jacqueline",          // #13
];

//array of book titles
var all_books = [
  "----",                                                   // no response
  "Kickoff!",                                               // #1
  "The War That Saved My Life",                             // #2
  "Hereville: How Mirka Got Her Sword",                     // #3
  "Mr. Lemoncello's Library Olympics",                      // #4
  "The Detective's Assistant",                              // #5
  "Unusual Chickens for the Exceptional Poultry Farmer",    // #6
  "From the Mixed-Up Files of Mrs. Basil E. Frankweiler",   // #7
  "The Last Boy at St. Edith's",                            // #8
  "Maxi's Secrets:(Or, What You Can Learn from a Dog)",     // #9
  "Astronaut Academy: Zero Gravity",                        // #10
  "Eruption!: Volcanoes and the Science of Saving Lives",   // #11
  "Edible Science: Experiments You Can Eat",                // #12
  "Brown Girl Dreaming",                                    // #13
];


function questionList(int_questions,bool_multiset,bool_array_bookList) {
  //super placeholdery ->
  //int_questions -> number of questions to generate
  //bool_multiset -> whether or not to allow duplicate questions
  //bool_array_bookList -> array of size 13, indicates whether to include corresponding book
  //generates random number in range of questions
  //dependent on bool_multiset, checks if unique
  //continues until have int_questions numbers
  //returns array of indexes for tuples
  //books are sectioned -> question bank of 1300, each book has 100 entries 0-99
  //outlaw ranges bool_array_bookList dependent
  return Math.random();
}
