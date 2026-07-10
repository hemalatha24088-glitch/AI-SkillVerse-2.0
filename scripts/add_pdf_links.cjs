const fs = require('fs');

let code = fs.readFileSync('src/data/python_notes.js', 'utf8');

const files = [
  "01_intro", "02_variables", "03_operators", "04_strings", "05_controlflow",
  "06_loops", "07_lists", "08_tuples", "09_dictionaries", "10_sets",
  "11_functions", "12_args_kwargs", "13_comprehensions", "14_errors",
  "15_fileio", "16_oop_basics", "17_oop_inheritance", "18_oop_dunder",
  "19_generators", "20_decorators", "21_modules", "22_bestpractices"
];

let i = 0;
code = code.replace(/icon: ".*?",/g, (match) => {
  if (i < files.length) {
    const replacement = `${match}\n    pdfLink: "/pdfs/python/${files[i]}.pdf",`;
    i++;
    return replacement;
  }
  return match;
});

fs.writeFileSync('src/data/python_notes.js', code);
console.log("Updated python_notes.js with pdfLinks!");
