//quiz runtime and relevant functions
var quizSession;
var quizResponse;

window.onload = function() {

  //test sets
    // var books = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]; //'all' books
    // var books = [0,1,1,1,1,1,1,1,1,1,1,1,1,1]; // all books selected
    // var books = [0,1,1,1,0,1,1,1,1,0,1,1,1,0]; // No Lemoncello,Maxi's,BrownGirldreaming

    var books = [0,1,1,0,1,1,1,1,1,1,0,0,0,1]; // all minus those without datasets - 3, 10, 11, 12

    // var optionList = [books, false,300,-1,false,0,-1,0,false,false,false]; //worst case
    var optionList = [books, false, 50,-1,false,0,-1,0,false,false,false];

  quizSession = new quiz_session(optionList);
  quizSession.chooseQuestion();
  console.log(quizSession.currentQuestion); //correct answer

  // question init
  question = element_bs_block("question_div_1", quizSession.currentQuestion.question,"questions");

  // author MC
  authorbutton = element_bs_select("authors_select_1", all_authors, "answers_authors");
  // title MC
  titlebutton = element_bs_select("titles_select_1", all_books,"answers_titles");


  var flag_grade = false;

  //action when user clicks "Submit Answer"
  document.getElementById("submit").onclick =
    function(e){
      flag_grade = true;
        //generate response tuple
        quizResponse = read_response(quizSession,"authors_select_1","titles_select_1");
        //grade response and update stats
        grade = quizSession.gradeResponse(quizResponse);
        console.log(grade);
        //print raw score
        percentage = grade[0] / grade [1]; //I called it percentage but it really isn't but I'm not going to change it because I know it'll bug you just like this long commnet I'm not wrapping
        if (percentage<1){
          console.log("Didn't pass");
          divclassstr = "alert alert-danger";
          //gradetext = "<span class='alert alert-danger'>You <b>missed</b> this one. Your score was " + grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)</span>";
          gradetext = "You <b>missed</b> this one. Your score was " + grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)";
          shortgradetext = grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)";
        }
        if (percentage==1){
          console.log("Passed!");
          divclassstr = "alert alert-success";
          //gradetext = "<span class='alert alert-success'><b>You got it right!</b> Your score was " + grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)</span>";
          gradetext = "<b>You got it right!</b> Your score was " + grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)";
          shortgradetext = grade[0] + "/" + grade[1] + " ( " + (percentage*100) + "%)";
        }
        document.getElementById("print_results").innerHTML = "<div class='" + divclassstr + "'>" + gradetext + "</div>";
        document.getElementById("print_results").style.display = "block";

        //generate answer sheet from grade and quiz session here
        var answer = "<div class='alert alert-info'>";
        answer += "<b>"
        answer += quizSession.currentQuestion.title;
        answer += "<br>";
        answer += quizSession.currentQuestion.author;
        answer += "</b>"
        answer += "<br>";
        answer += quizSession.currentQuestion.source;
        answer += "</div>";
        document.getElementById("print_results").innerHTML += answer;

        //hide the answer boxes and submit button
        document.getElementById("submit").style.display = "none";
        document.getElementById("answers_authors").style.display = "none";
        document.getElementById("authors_select_1").style.display = "none";
        document.getElementById("answers_titles").style.display = "none";
        document.getElementById("titles_select_1").style.display = "none";

      };

  //action when user clicks "Generate New Question"
  document.getElementById("newQuestion").onclick =
    function(e){
      if(flag_grade){
        //generate history of answered questions
        var answer = "<div class='alert alert-info'>";
        answer += quizSession.currentQuestion.question;
        answer += "<br><b>"
        answer += quizSession.currentQuestion.title;
        answer += " - ";
        answer += quizSession.currentQuestion.author;
        answer += "</b>"
        answer += " - ";
        answer += quizSession.currentQuestion.source;
        answer += " ";
        answer += "<span class='badge'>" + gradetext + "</span>";
        answer += "";
        answer += "</div>";
        document.getElementById("history").innerHTML += answer;
      }
      flag_grade = false;
      //get a new question
      quizSession.chooseQuestion();
      console.log(quizSession.currentQuestion); //correct answer
      //update question text
      question = element_bs_block("question_div_1", quizSession.currentQuestion.question,"questions");
      // reset select lists
      document.getElementById("authors_select_1").value = document.getElementById("titles_select_1").value = 0;
      document.getElementById("answers_authors").style.display = "block";
      document.getElementById("authors_select_1").style.display = "block";
      document.getElementById("answers_titles").style.display = "block";
      document.getElementById("titles_select_1").style.display = "block";
      document.getElementById("submit").style.display = "block";
      // hide the grades
      document.getElementById("print_results").style.display="none";

    };
};

function read_response(session, authorId, titleId){
  responseQuestion = session.currentQuestion.question;

  if(session.answerInput > 1){
    //also quizzing on source
    //element for source
  }
  else{
    responseSource = session.currentQuestion.source;
  }

  //element for author
  var responseAuthor = document.getElementById(authorId);
  responseAuthor = responseAuthor.value;
  responseAuthor = all_authors[responseAuthor];
  //element for title
  var responseTitle = document.getElementById(titleId);
  responseTitle = responseTitle.value;
  responseTitle = all_books[responseTitle];

  response = new tupleQuestion(responseQuestion,responseSource,responseAuthor,responseTitle);
  return response;
}

//TODO: generateNewQuestion function
//Append current question, provided answer, and correct answer to the history div tag
//Generate a new question and reload the question_div_1 tag



//a bootstrap create SELECT function
function element_bs_select(id,options,parent){
  var element = document.getElementById(id);
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    option.value = i;
    element.add(option);
  }
  var out = document.getElementById(parent);
  out.appendChild(element);
}

//a bootstrap create BLOCKquote function
function element_bs_block(id,options,parent){
  var element = document.getElementById(id);
  var quote = document.createTextNode(options);
  if (element.hasChildNodes()) {
    element.removeChild(element.childNodes[0]);
  }
  element.appendChild(quote);

  var out = document.getElementById(parent);
  out.appendChild(element);
}
