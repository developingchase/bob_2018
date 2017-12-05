class tuple{
  constructor(question,source,author,title){
    this.question = question;
    this.source = source;
    this.author = author;
    this.title = title;
  }
}

class results{
  constructor(){
    this.total = 0;
    this.correct = 0;
    this.percentage = 0;
  }
  update(boolean_correct){
    this.total += 1;
    if(boolean_correct){
      this.correct+= 1;
    }
    this.percentage = Math.floor((this.correct / this.total)*100);
  }
}

function options_construct(){

}

function generate_proportion(booklist){
  //function to generate random proportions for included books
  var bookCount = 0;
  var total = 100;

  //determine number of books in question
  for (var i = 0; i < booklist.length; i++) {
    bookCount += booklist[i];
  }

  //determine acceptable bounds for proportions
  var average = Math.floor(100/bookCount);
  var max = Math.floor(average * 1.5);
  var min = Math.floor(average * 0.8);

  //calculate proportions
  var proportionList = [];
  for (var i = 1; i < bookCount; i++) {
    var proportion = Math.floor(Math.random() * (max - min) ) + min;
    proportionList.push(proportion);
    total = total - proportion;
  }

  //sets last proportion to remaining percentage -> often heavily weights single option
  proportionList.push(total);

  // //test algorithm -> proportions should always sum to 100
  // var hundred = Number(0);
  // for (var i = 0; i < proportionList.length; i++) {
  //   hundred = hundred + Number(proportionList[i]);
  // }
  // console.log("This should be a hundred: " + hundred)

  return proportionList;
}

class quiz_session{
  constructor(options){
    this.bookList = options[0];

    this.questionType = options[1];
    this.questionCount = options[2];
    this.questionTimer = options[3];
    this.questionRepeat = options[4];

    this.answerType = options[5]
    this.answerTimer = options[6];
    this.answerInput = options[7];

    this.generalSound = options[8];
    this.generalProgressBar = options[9];
    this.generalTimer = options[10];
  }
}

var all_authors = [
  "----",                         // no response
  "Barber, Tiki",                 // #0
  "Bradley, Kimberly Brubaker",   // #1
  "Deutsch, Barry",               // #2
  "Grabenstein, Chris",           // #3
  "Hannigan, Kate",               // #4
  "Jones, Kelly",                 // #5
  "Konigsburg, E. L.",            // #6
  "Malone, Lee Gjertsen",         // #7
  "Plourde, Lynn",                // #8
  "Roman, Dave",                  // #9
  "Rusch, Elizabeth",             // #10
  "Wheeler-Toppen, Jodi",         // #11
  "Woodson, Jacqueline",          // #12
];

var all_books = [
  "----",                                                   // no response
  "Kickoff!",                                               // #0
  "The War That Saved My Life",                             // #1
  "Hereville: How Mirka Got Her Sword",                     // #2
  "Mr. Lemoncello's Library Olympics",                      // #3
  "The Detective's Assistant",                              // #4
  "Unusual Chickens for the Exceptional Poultry Farmer",    // #5
  "From the Mixed-Up Files of Mrs. Basil E. Frankweiler",   // #6
  "The Last Boy at St. Edith's",                            // #7
  "Maxi's Secrets:(Or, What You Can Learn from a Dog)",     // #8
  "Astronaut Academy: Zero Gravity",                        // #9
  "Eruption!: Volcanoes and the Science of Saving Lives",   // #10
  "Edible Science: Experiments You Can Eat",                // #11
  "Brown Girl Dreaming",                                    // #12
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
