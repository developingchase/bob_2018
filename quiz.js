//quiz runtime and relevant functions

window.onload = function() {

  // buildMenu();
  // window.setTimeout(function(){clearDivs(tracker_menu_id);buildQuestion(quote_oneSentence_zero[0].question);
  //   window.setTimeout(function(){clearDivs(tracker_question_id);buildAnswer(quote_oneSentence_zero[0]);
  //     window.setTimeout(function(){clearDivs(tracker_answer_id);buildResults(session_results);
  //       window.setTimeout(function(){clearDivs(tracker_results_id);buildMenu();
  //       }, 5000);
  //     }, 5000);
  //   }, 5000);
  // }, 5000);
  //
  // buildMenu();
  // window.setTimeout(function(){clearBody();buildQuestion(quote_oneSentence_zero[0].question);
  //   window.setTimeout(function(){clearBody();buildAnswer(quote_oneSentence_zero[0]);
  //     window.setTimeout(function(){clearBody();buildResults(session_results);
  //       window.setTimeout(function(){clearBody();buildMenu();
  //       }, 5000);
  //     }, 5000);
  //   }, 5000);
  // }, 5000);

// var books = [1,1,1,1,1,1,1,1,1,1,1,1,1,1]; //'all' books
// var books = [0,1,1,1,1,1,1,1,1,1,1,1,1,1]; // all books selected
var books = [0,1,1,1,0,1,1,1,1,0,1,1,1,0]; // No Lemoncello,Maxi's,BrownGirldreaming

// var optionList = [books, false,300,-1,false,0,-1,0,false,false,false]; //worst case
var optionList = [books, false, 25,-1,false,0,-1,0,false,false,false];

var test = new quiz_session(optionList);

console.log(test.proportions);
console.log(test.questionList);
for (var i = 0; i < test.questionList.length; i++) {
  test.chooseQuestion();
}
test.chooseQuestion();
test.chooseQuestion();
test.chooseQuestion();
console.log(test.currentQuestion);
};


function options_construct(){
  //function to read config from html and store settings in array
}

function response_construct(){
  //function to read user input from html and store as tupleQuestion
}


// html element builders

function element_button(text, id, function_call, parent) {
  var element = document.createElement("BUTTON");
  var text = document.createTextNode(text);
  element.setAttribute("id",id);
  element.setAttribute("onclick",function_call);
  element.appendChild(text);

  var out = document.getElementById(parent);
  out.appendChild(element);
}

function element_select(id, options,parent){
  var element = document.createElement("SELECT");
  element.setAttribute("id",id);
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement("option");
    option.text = options[i];
    element.add(option);
  }
  var out = document.getElementById(parent);
  out.appendChild(element);
}

function element_input(id, type, value, min, max, step,parent){
  var element = document.createElement("INPUT");
  element.setAttribute("id",id);
  element.setAttribute("type",type);
  element.setAttribute("value",value);
  element.setAttribute("min",min);
  element.setAttribute("max",max);
  element.setAttribute("step",step);

  var out = document.getElementById(parent);
  out.appendChild(element);
}

function element_br(id,parent){
  var element = document.createElement("BR");
  element.setAttribute("id",id);

  var out = document.getElementById(parent);
  out.appendChild(element);
}

function element_div(id, text, parent){
  var element = document.createElement("DIV");
  var text_node = document.createTextNode(text);
  element.setAttribute("id",id);
  element.appendChild(text_node);

  var out = document.getElementById(parent);
  out.appendChild(element);
}

// clear/delete html element functions

function clearDivs(div_list) {
  console.log("Deleting div elements");
  while(div_list.length > 0){
    div = document.getElementById(div_list.pop());
    while (div.hasChildNodes()) {
      div.removeChild(div.firstChild);
    }
  }
}

function clearBody(){
  console.log("Deleting body elements");
  body = document.getElementById("body_main");
  while (body.hasChildNodes()) {
    body.removeChild(body.firstChild);
  }
}



// build html element functions
var tracker_menu_id = [];
var tracker_question_id = [];
var tracker_answer_id = [];
var tracker_results_id = [];

function buildMenu() {
  console.log("Building menu elements");

  element_div("menu_div_1","","body_main");
  tracker_menu_id.push("menu_div_1");
  element_select("menu_select_type_quiz", ["Title/Author Drills","Content Drills", "Contest Simulation"],"menu_div_1");

  element_div("menu_div_2","","body_main");
  tracker_menu_id.push("menu_div_2");
  element_select("menu_select_type_question", ["Multiple Choice","Write-In"], "menu_div_2");

  element_div("menu_div_3","","body_main");
  tracker_menu_id.push("menu_div_3");
  element_input("menu_input_count_question", "number", "1", "1", "50", "1", "menu_div_3");

  element_div("menu_div_4","","body_main");
  tracker_menu_id.push("menu_div_4");
  element_br("menu_break_1", "menu_div_4");
  element_button("Quiz Time!", "menu_button_startquiz", "startQuiz()", "menu_div_4");
}

function buildQuestion(question, switch_type) {
  console.log("Building question page elements");
  element_div("question_div_1",question,"body_main");
  element_br("question_break_1", "question_div_1");
  element_br("question_break_2", "question_div_1");
  tracker_question_id.push("question_div_1");

  element_div("question_div_2","","body_main");
  tracker_question_id.push("question_div_2");
  element_select("question_select_authors", all_authors,"question_div_2");
  element_select("question_select_books", all_books,"question_div_2");

  element_div("question_div_3","","body_main");
  tracker_question_id.push("question_div_3");
  element_br("question_break_3", "question_div_3");
  element_button("Submit", "question_button_submit", "submitAnswer()", "question_div_3");
}

function buildAnswer(answer, switch_type) {
  console.log("Building answer page elements");
  element_div("answer_div_1",answer.question,"body_main");
  element_br("answer_break_1", "answer_div_1");
  element_br("answer_break_2", "answer_div_1");
  tracker_answer_id.push("answer_div_1");

  element_div("answer_div_2",answer.source,"body_main");
  element_br("answer_break_3", "answer_div_2");
  element_br("answer_break_4", "answer_div_2");
  tracker_answer_id.push("answer_div_2");

  element_div("answer_div_3",answer.author,"body_main");
  element_br("answer_break_5", "answer_div_3");
  element_br("answer_break_6", "answer_div_3");
  tracker_answer_id.push("answer_div_3");

  element_div("answer_div_4",answer.title,"body_main");
  element_br("answer_break_5", "answer_div_4");
  element_br("answer_break_6", "answer_div_4");
  tracker_answer_id.push("answer_div_4");

  element_div("answer_div_5","","body_main");
  tracker_answer_id.push("answer_div_5");
  element_br("answer_break_7", "answer_div_5");
  element_button("Next", "answer_button_next", "", "answer_div_5");

}

function buildResults(results, switch_type) {
  console.log("Building results page elements");

  element_div("results_div_1",results.correct + " / " + results.total,"body_main");
  element_br("results_break_1", "results_div_1");
  div = document.getElementById("results_div_1");
  var text_node = document.createTextNode(results.percentage + "% correct","body_main");
  div.appendChild(text_node);
  element_br("results_break_2", "results_div_1");
  tracker_results_id.push("results_div_1");

  element_div("results_div_2","","body_main");
  tracker_results_id.push("results_div_2");
  element_br("results_break_3", "results_div_2");
  element_button("Return to Menu", "results_button_return", "", "results_div_2");

}
