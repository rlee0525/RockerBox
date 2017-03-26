// Problem:
// You are given a prefix expression. Write a program to evaluate it.
// Your program should accept as its first argument a path to a filename.
// The file contains one prefix expression per line.
//
// INPUT SAMPLE:
//
// 1
// * + 2 3 4
//
// Your program has to read this and insert it into any data structure you like.
// Traverse that data structure and evaluate the prefix expression.
// Each token is delimited by a whitespace.
// You may assume that the only valid operators appearing in test data are
// '+','*' and '/'(floating-point division).
// Please include unit tests that demonstrate how your code works.
//
// Please zip the contents of your solution named: `prefix-[lastname].zip`
//
// OUTPUT SAMPLE:
//
// Print to stdout, the output of the prefix expression, one per line. E.g.
//
// 1
// 20
//
// Constraints:
// The evaluation result will always be an integer >= 0.
// The number of the test cases is <= 40.

const evaluatePrefix = filePath => {
  let fs = require('fs');
  let lines = fs.readFileSync(filePath).toString().trim().split("\n");

  let results = [];

  lines.forEach(line => {
    results.push(calculatePrefix(line))
  });

  return results.join("\n");
}

const calculatePrefix = string => {
  let operators = { "+": true, "*": true, "/": true };
  let newString = string.split(" ");
  let stack = [];

  for (var i = newString.length - 1; i >= 0; i--) {
    if (operators[newString[i]] == true) {
      let leftOperand = stack.pop();
      let rightOperand = stack.pop();

      switch (newString[i]) {
        case "+":
          stack.push(leftOperand + rightOperand);
          continue;
        case "*":
          stack.push(leftOperand * rightOperand);
          continue;
        case "/":
          stack.push(leftOperand / rightOperand);
          continue;
        default:
          console.log("Invalid input");
      }
    } else {
      stack.push(parseInt(newString[i]));
    }
  }

  return stack[0];
}

// Testing

console.log(evaluatePrefix('./test_files/file1.txt'));
console.log(evaluatePrefix('./test_files/file2.txt'));
console.log(evaluatePrefix('./test_files/file3.txt'));
