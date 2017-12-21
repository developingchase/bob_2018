//test and general data vars for quiz with utility functions

//data utility functions


function cheaters(dataset){
  var out = [];
  for (var i = 0; i < dataset.length; i++) {
    out.push(dataset[i].source);
  }
  out = out.sort();
  return out;
}

function sourceListGen(questionSet) {
  //develops a list of sources from the question set
  //question set needs to be presorted by source
  var out = [];

  //push first source
  compareValue = questionSet[0].source;
  out.push(compareValue);

  //iterate through array, push unique values
  for (var i = 0; i < questionSet.length; i++) {
    temp = questionSet[i].source;
    if(temp !== compareValue){
      out.push(temp);
      compareValue = temp;
    }
  }
  return out;
}


//not currently functional
function probablyUnnecessaryMergeSort(dataset) {
  var length = dataset.length;
  var midpoint = Math.floor(length * 0.5);
  var left = dataset.slice(0,midpoint);
  var right = dataset.slice(midpoint,length);

  if(length === 1){
    return dataset;
  }
  myMergeSort(probablyUnnecessaryMergeSort(left), probablyUnnecessaryMergeSort(right));
  return dataset;
}

function myMergeSort(left,right){
  var out = [];
  //while either block non-empty
  while (left.length || right.length){
    //both blocks non-empty
    if (left.length && right.length){
      // localeCompare might work, we'll see
      if(left[0].source < right[0].source){
        //left is smaller - goodbye
        out.push(left.shift());
      }
      else {
        out.push(right.shift());
        //right is smaller - goodbye
      }
    }

    //one side sorted, append rest of values
    else if (left.length) {
      //all of lefts remaining values appended onto end of out
        out.push(left.shift());
    }
    else {
      //all of rights remaining values appended onto end of out
      out.push(right.shift());
    }
  }
  return out;
}

//test vars



//unsorted
// var quote_testSet1 = [
//    new tupleQuestion("I'm a question! #3","I'm a source! #3","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("I'm a question! #1","I'm a source! #1","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("I'm a question! #5","I'm a duplicate source!","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("I'm a question! #2","I'm a source! #2","I don't show up on multiple choice!","Which makes me always wrong!"),
//    new tupleQuestion("I'm a question! #4","I'm a duplicate source!","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//   ];
// var quote_testSet1 = [
//    new tupleQuestion("A'm a question! #3","A","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("C'm a question! #1","B","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("D'm a question! #5","F","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//    new tupleQuestion("F'm a question! #2","E","I don't show up on multiple choice!","Which makes me always wrong!"),
//    new tupleQuestion("B'm a question! #4","C","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
//   ];
// var quote_testSet = probablyUnnecessaryMergeSort(quote_testSet1);

var questionSet_zero = [
   new tupleQuestion("---Debug Me---","---Debug Me---","---Debug Me---","---Debug Me---"),
   new tupleQuestion("I'm a question! #1","I'm a source! #1","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
   new tupleQuestion("I'm a question! #2","I'm a source! #2","I don't show up on multiple choice!","Which makes me always wrong!"),
   new tupleQuestion("I'm a question! #3","I'm a source! #3","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
   new tupleQuestion("I'm a question! #4","I'm a duplicate source!","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
   new tupleQuestion("I'm a question! #5","I'm a duplicate source!","Malone, Lee Gjertsen","The Last Boy at St. Edith's"),
  ];

  var all_sources = [
    "----",
    sourceListGen(questionSet_zero)
  ]


//list of datasets - serves as index
  var all_questionSets = [
    questionSet_zero,             // test questionSet
    questionSet_one,              // #1
    questionSet_two,              // #2
    questionSet_three,            // #3
    questionSet_four,             // #4
    questionSet_five,             // #5
    questionSet_six,              // #6
    questionSet_seven,            // #7
    questionSet_eight,            // #8
    questionSet_nine,             // #9
    questionSet_ten,              // #10
    questionSet_eleven,           // #11
    questionSet_twelve,           // #12
    questionSet_thirteen,         // #13
  ];


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


// //list of arrays of source options
//   var all_sources = [
//     "----",               //0 index placeholder
//     sourceListGen(questionSet_one),       //#1
//     sourceListGen(questionSet_two),       //#2
//     sourceListGen(questionSet_three),     //#3
//     sourceListGen(questionSet_four),      //#4
//     sourceListGen(questionSet_five),      //#5
//     sourceListGen(questionSet_six)        //#6
//     sourceListGen(questionSet_seven),     //#7
//     sourceListGen(questionSet_eight),     //#8
//     sourceListGen(questionSet_nine),      //#9
//     sourceListGen(questionSet_ten),       //#10
//     sourceListGen(questionSet_eleven),    //#11
//     sourceListGen(questionSet_twelve),    //#12
//     sourceListGen(questionSet_thirteen)   //#13
//   ];
