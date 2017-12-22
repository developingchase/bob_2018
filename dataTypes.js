//data types for quiz

class tupleQuestion{
  //question object
  constructor(question,source,author,title){
    this.question = question;
    this.source = source;
    this.author = author;
    this.title = title;
  }
}

class quiz_session{
  // one class to handle all quiz session data
  // export function for debug
  constructor(options){
    this.options = options;
    //takes array from options_construct
    this.bookList = options[0];       //list of 0/1 values, first value is 'all'
    this.bookCount = this.countBooks(this.bookList);

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

    this.proportions = this.generateProportion(this.bookCount, this.questionCount);

    //generate question list
    this.currentQuestion;
    this.currentQuestionBonus = false;  //bonus question boolean flag

    //multiple choice options -> first value is blank
    this.currentTitles = ["----"];
    this.currentAuthors = ["----"];
    this.currentSources = ["----"];

    this.questionList = [];
    this.usedQuestions = [];
    this.generateQuestions(this.proportions);

    //user input tracker
    this.responseTracker = [];

    //initialize session stats
    this.stats = new statisticsTracker();

  }

  countBooks(booklist){
    var bookCount = 0;
    //determine number of books in question
    if(booklist[0] < 1){
      //user selection
      for (var i = 1; i < booklist.length; i++) {
        bookCount += booklist[i];
      }
    }
    else {
      //'all'
      bookCount = (booklist.length - 1);
    }
    return bookCount;

  }

  giveDisplayOptions(){
    // return array of options for display decisions - intended for html build function
    return [this.generalSound,this.generalProgressBar,this.generalTimer];
  }

  generateQuestions(proportionValues){
    //assembles list of questions and MC choices

    //MC choices
    for (var i = 1; i <= this.bookList.length; i++) {
      if(this.bookList[i] > 0){
        //book selected for inclusion, [1] is #1
        this.currentTitles.push(all_books[i]);
        this.currentAuthors.push(all_authors[i]);
        this.currentSources.push(all_sources[i]);
      }
    }


    for (var i = 1; i < this.bookList.length; i++) {
      //book is included, start at #1
      if(this.bookList[i] > 0){
        //questions for i book
        var count = proportionValues.shift();
        var indexTracker = [];
        var questionIndex;

        //generate count number of questions
        for (var j = 0; j < count; j++) {
          //random index within specified questionSet
          questionIndex = this.randIndex(all_questionSets[i]);
          if(this.questionRepeat){
            //repeats allowed
            this.questionList.push(all_questionSets[i][questionIndex]);
          }
          else {
            //check for repeats, find new index
            var infiniteBeGone = 0;   //attempts to find new question 5 times
            while (indexTracker.includes(questionIndex) && infiniteBeGone < 5) {
              questionIndex = this.randIndex(all_questionSets[i]);
              infiniteBeGone += 1;
            }
            indexTracker.push(questionIndex);
            this.questionList.push(all_questionSets[i][questionIndex]);
          }
        }
      }
    }
  }

  chooseQuestion(){
    //selects question from list, updates quiz session
    var questionIndex = this.randIndex(this.questionList);

    var infiniteBeGone = 0;   //attempts to find new question 5 times
    while (this.usedQuestions.includes(questionIndex) && infiniteBeGone < 5) {
      questionIndex = this.randIndex(this.questionList);
      infiniteBeGone += 1;
    }
    //fallback if random indexes fail
    if(this.usedQuestions.includes(questionIndex)){
      //find unused index
      for (var i = 0; i < this.questionList.length; i++) {
        //check all indexes of questionList
        if(this.usedQuestions.includes(i)){
          //in case all questions have been used
          questionIndex = -1;
          continue;
        }
        else {
          //unused index is new index
          questionIndex = i;
          this.usedQuestions.push(i);
          break;
        }
      }
    }
    else {
      this.usedQuestions.push(questionIndex);
    }
    if (questionIndex < 0) {
      //set currentQuestion to debug tuple
      this.currentQuestion = all_questionSets[0][0];
    }
    else {
      //set currentQuestion
      this.currentQuestion = this.questionList[questionIndex];
    }
  }

  gradeResponse(response){
    //receives user input, stores, and grades, then updates stats
    //response should be a tuple
    var pointAward = [0,2]; //[current points, possible points]

    //store response
    this.responseTracker.push(response);

    if(this.answerType < 2){
      //not tracking chapters
      if(response.title === this.currentQuestion.title){
        //title correct
        if(response.author === this.currentQuestion.author){
          //both correct, full credit
          pointAward[0] = 2;
        }
        else if (response.author === all_authors[0]) {
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
      if (this.currentQuestionBonus) {
        // bonus questions worth double
        pointAward[0] = pointAward[0] * 2;
        pointAward[1] = 4;
      }
    }
    else {
      //tracking chapters - no partial credit
      if(response.title === this.currentQuestion.title){
        if(response.author === this.currentQuestion.author){
          if(response.source === this.currentQuestion.source){
            pointAward[0] = 2;
          }
        }
      }
    }
    this.stats.addPoints(pointAward);
    return pointAward;
  }

  giveStats(){
    //returns session information
  }

  randIndex(dataset){
    //takes dataset, returns random index within that dataset
    var index;
    var max = dataset.length - 1;
    var min = 0;
    var index = Math.floor(Math.random() * (max - min) ) + min;
    return index;
  }

  generateProportion(bookCount,questionCount){
    //function to generate random proportions
    //splits number of questions up between included books unevenly
    var total = questionCount;

    if (total < 0) {
    //questions are infinite, no need to randomize proportions
      var proportionList = [];

      //for each included book, add 25 questions
      for (var i = 0; i < bookCount; i++) {
        proportionList.push(25);
      }
      return proportionList;
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

  debug(comment){
    //downloads a tsv with appended comment from user
  //   var data = [
  //   this.options
  //   this.bookCount
  //   this.proportions
  //   //generate question list
  //   this.currentQuestion
  //   this.currentQuestionBonus
  //   //multiple choice options -> first value is blank
  //   this.currentTitles
  //   this.currentAuthors
  //   this.currentSources
  //   this.questionList
  //   this.usedQuestions
  //   //user input tracker
  //   this.responseTracker
  //   //initialize session stats
  //   // this.stats
  //
  //
  //       var csv = 'Name,Title\n';
  //       data.forEach(function(row) {
  //               csv += row.join(',');
  //               csv += "\n";
  //       });
  //
  //       //https://code-maven.com/create-and-download-csv-with-javascript
  //       console.log(csv);
  //       var hiddenElement = document.createElement('a');
  //       hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  //       hiddenElement.target = '_blank';
  //       hiddenElement.download = 'people.csv';
  //       hiddenElement.click();
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
