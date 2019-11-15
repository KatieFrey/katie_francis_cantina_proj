const jsonObj = require("./jsonObj");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on("line", function(line) {
  console.log(helper(line, jsonObj, []));
});

//Recursive helper function, outputs an array of views
function helper(line, obj, output = []) {
  let keyName = parseSelector(line);
  let parsedLine =
    line[0] === "." || line[0] === "#" ? line.slice(1, line.length) : line;

  if (Array.isArray(obj[keyName])) {
    for (let i = 0; i < obj[keyName].length; i++) {
      if (obj[keyName][i] === parsedLine) {
        output.push(obj);
      }
    }
  }
  if (obj[keyName] === parsedLine) {
    console.log("Parsed line: ", parsedLine);
    output.push(obj);
  }
  for (let key in obj) {
    if (key === "control" || key === "contentView") {
      helper(line, obj[key], output);
    }
    if (key === "subviews") {
      for (let i = 0; i < obj[key].length; i++) {
        helper(line, obj[key][i], output);
      }
    }
  }

  return output;
}

//Defines the line as a class, className, or identifier
function parseSelector(line) {
  let output;

  if (line[0] === ".") {
    output = "classNames";
  } else if (line[0] === "#") {
    output = "identifier";
  } else {
    output = "class";
  }
  return output;
}

//*** Extra Credit ***
// function parseLine(line) {
//   let output;
//   if (line.split(".").length > 1) {
//     output = line.split(".");
//   }
//   if (line.split("#").length > 1) {
//     output = line.split("#");
//   }

//   return output;

//}
