/**
 * =======================================================
 * 
 *  File: questions.js
 *  Description: Contains the defined questions for the 
 *      pop-quiz alongside answers and their orders.
 * 
 * =======================================================
 */


// # Define: Questions Array containing question/values & answers.
var questions = [
    {
        question_title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        question_choices: [
            {
                choice_text: "Javascript",
                choice_order: 0,
                choice_value: "javascript",
            },
            {
                choice_text: "Terminal /bash",
                choice_order: 1,
                choice_value: "terminal_bash",
            },
            {
                choice_text: "For loops",
                choice_order: 2,
                choice_value: "for_loops",
            },
            {
                choice_text: "Console.log",
                choice_order: 3,
                choice_value: "console.log",
            },
        ],
        question_answer: "console.log",
        question_order: 4
    },
    {
        question_title: "Commonly used data types DO NOT include:",
        question_choices: [
            {
                choice_text: "Strings",
                choice_order: 0,
                choice_value: "strings",
            },
            {
                choice_text: "Booleans",
                choice_order: 1,
                choice_value: "booleans",
            },
            {
                choice_text: "Alerts",
                choice_order: 2,
                choice_value: "alerts",
            },
            {
                choice_text: "Numbers",
                choice_order: 3,
                choice_value: "numbers",
            },
        ],
        question_answer: "alerts",
        question_order: 1
    },
    {
        question_title: "The condition in an if / else statement is enclosed within _____.",
        question_choices: [
            {
                choice_text: "Quotes",
                choice_order: 0,
                choice_value: "quotes",
            },
            {
                choice_text: "Curly Brackets",
                choice_order: 1,
                choice_value: "curly_brackets",
            },
            {
                choice_text: "Parentheses",
                choice_order: 2,
                choice_value: "parentheses",
            },
            {
                choice_text: "Square Brackets",
                choice_order: 3,
                choice_value: "square_brackets",
            },
        ],
        question_answer: "curly_brackets",
        question_order: 2
    },
    {
        question_title:"Arrays in JavaScript can be used to store _____'",
        question_choices: [
            {
                choice_text: "Numbers & strings",
                choice_order: 0,
                choice_value: "num_strings",
            },
            {
                choice_text: "Other arrays",
                choice_order: 1,
                choice_value: "other_arrays",
            },
            {
                choice_text: "Booleans",
                choice_order: 2,
                choice_value: "booleans",
            },
            {
                choice_text: "All of the above",
                choice_order: 3,
                choice_value: "all_above",
            },
        ],
        question_answer: "all_above",
        question_order: 0
    },
    {
        question_title: "String vales must be enclosed within _____ when being assigned to variables",
        question_choices: [
            {
                choice_text: "Commas",
                choice_order: 0,
                choice_value: "commas",
            },
            {
                choice_text: "Curly brackets",
                choice_order: 1,
                choice_value: "curly_brackets",
            },
            {
                choice_text: "Quotes",
                choice_order: 2,
                choice_value: "quotes",
            },
            {
                choice_text: "Parentheses",
                choice_order: 3,
                choice_value: "parentheses",
            },
        ],
        question_answer: "quotes",
        question_order: 3
    },
    
];