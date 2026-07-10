const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const outputDir = path.join(__dirname, 'public', 'pdfs', 'python');
if (!fs.existsSync(outputDir)) { fs.mkdirSync(outputDir, { recursive: true }); }

const topicsData = [
  {
    file: "01_intro",
    title: "1. Welcome to Python!",
    summary: "Python is a high-level, interpreted programming language designed to be easy to read and simple to implement.",
    structure: "print(data_to_display)",
    code: "print('Hello, World!')\nprint(100)",
    explanation: "- Line 1: Uses the built-in print() function. The text 'Hello, World!' is a string, so it must be wrapped in quotes. It outputs the text to the console.\n- Line 2: Prints the number 100. Numbers do not need quotes.",
    problems: "1. Write a script that prints your first and last name on separate lines.\n2. Print a simple shape (like a triangle) using multiple print statements."
  },
  {
    file: "02_variables",
    title: "2. Variables & Data Types",
    summary: "Variables are named storage locations in memory used to hold data. Python is dynamically typed, meaning it automatically figures out the data type.",
    structure: "variable_name = value",
    code: "age = 25\nprice = 19.99\nname = 'Alice'\nis_active = True",
    explanation: "- Line 1: Creates an Integer (whole number) variable named 'age'.\n- Line 2: Creates a Float (decimal) variable named 'price'.\n- Line 3: Creates a String (text) variable named 'name'.\n- Line 4: Creates a Boolean (True/False) variable named 'is_active'. Notice that 'True' is capitalized.",
    problems: "1. Create variables for your favorite color, your age, and whether you like coffee (boolean). Print them all.\n2. Reassign the age variable to be a string ('twenty') and print it to prove Python is dynamically typed."
  },
  {
    file: "03_operators",
    title: "3. Operators",
    summary: "Operators are special symbols that carry out arithmetic or logical computation.",
    structure: "result = value1 operator value2",
    code: "x = 10\ny = 3\nprint(x // y) # Floor division\nprint(x % y)  # Modulo\nprint(x > 5 and y < 5) # Logical AND",
    explanation: "- Line 3: Floor division (//) divides 10 by 3 and chops off the decimal, resulting in 3.\n- Line 4: Modulo (%) returns the remainder of 10 divided by 3, which is 1.\n- Line 5: The 'and' operator checks if BOTH conditions are true. Since 10 > 5 and 3 < 5, it prints True.",
    problems: "1. Calculate and print the area of a rectangle with width 15 and height 7.\n2. Write an expression that checks if a number is even by using the modulo operator (%)."
  },
  {
    file: "04_strings",
    title: "4. Strings in Depth",
    summary: "Strings are sequences of characters. In Python, they are immutable and can be manipulated using slicing and formatting.",
    structure: "f'text {variable}' OR string[start:end]",
    code: "word = 'Python'\nprint(word[0:2])\n\nage = 30\nprint(f'I am {age} years old.')",
    explanation: "- Line 2: Slices the string from index 0 up to (but not including) index 2. This prints 'Py'.\n- Line 5: Uses an f-string (formatted string literal) to inject the 'age' variable directly into the text.",
    problems: "1. Create a string 'Hello World' and slice it to print just 'World'.\n2. Use an f-string to print a sentence containing three different variables (name, city, hobby)."
  },
  {
    file: "05_controlflow",
    title: "5. Control Flow",
    summary: "Control flow allows your program to make decisions and execute specific blocks of code based on conditions.",
    structure: "if condition:\n    # code block\nelif condition:\n    # code block\nelse:\n    # code block",
    code: "score = 85\nif score >= 90:\n    print('Grade: A')\nelif score >= 80:\n    print('Grade: B')\nelse:\n    print('Grade: C')",
    explanation: "- Line 2: Evaluates if score is 90 or above. It is not, so it skips to the elif.\n- Line 4: Evaluates if score is 80 or above. Since 85 >= 80 is True, it executes the indented block underneath it.\n- Line 5: Prints 'Grade: B'. The else block is completely ignored.",
    problems: "1. Write a script that checks a temperature variable and prints 'Wear a coat' if it's below 50, otherwise 'T-shirt time'.\n2. Create a nested if-statement that checks if a user is an adult (>= 18) and, if so, whether they are a senior (>= 65)."
  },
  {
    file: "06_loops",
    title: "6. Loops",
    summary: "Loops allow you to repeat a block of code multiple times, either for a set number of times (for) or until a condition changes (while).",
    structure: "for item in sequence:\n    # code\n\nwhile condition:\n    # code",
    code: "for i in range(3):\n    print(f'Count: {i}')\n\nbattery = 10\nwhile battery > 0:\n    battery -= 5",
    explanation: "- Line 1: 'range(3)' generates numbers 0, 1, 2. The loop runs 3 times.\n- Line 2: Prints the current value of i.\n- Line 5: A while loop that runs as long as battery is greater than 0.\n- Line 6: Subtracts 5 from battery each loop. It runs twice before stopping.",
    problems: "1. Write a for loop that prints all even numbers from 2 to 10.\n2. Write a while loop that simulates a countdown timer from 5 to 0, printing 'Blastoff!' at 0."
  },
  {
    file: "07_lists",
    title: "7. Lists",
    summary: "Lists are ordered, mutable (changeable) collections of items.",
    structure: "my_list = [item1, item2]\nmy_list.append(new_item)",
    code: "fruits = ['apple', 'banana']\nfruits.append('cherry')\nfruits[0] = 'mango'\nprint(fruits)",
    explanation: "- Line 1: Creates a list with two string elements.\n- Line 2: Uses the append() method to add 'cherry' to the very end of the list.\n- Line 3: Modifies the list by replacing the item at index 0 ('apple') with 'mango'.\n- Line 4: Prints the final list: ['mango', 'banana', 'cherry'].",
    problems: "1. Create a list of 5 numbers, remove the last number using pop(), and print the list.\n2. Sort a list of random names in alphabetical order using the .sort() method."
  },
  {
    file: "08_tuples",
    title: "8. Tuples",
    summary: "Tuples are ordered collections of items that are IMMUTABLE (they cannot be changed after creation).",
    structure: "my_tuple = (item1, item2)",
    code: "dimensions = (1920, 1080)\nwidth, height = dimensions\nprint(f'Width: {width}')",
    explanation: "- Line 1: Creates a tuple using parentheses. If you try to do dimensions[0] = 800, Python will crash with an error.\n- Line 2: Demonstrates 'Tuple Unpacking'. It instantly splits the tuple's values into two separate variables: width and height.",
    problems: "1. Create a tuple containing your birth year, month, and day. Unpack it into three variables.\n2. Try to change the first item of your tuple. Observe the TypeError!"
  },
  {
    file: "09_dictionaries",
    title: "9. Dictionaries",
    summary: "Dictionaries store data in Key-Value pairs. They are unordered and mutable.",
    structure: "my_dict = {'key': 'value'}\nmy_dict['new_key'] = 'new_value'",
    code: "user = {'name': 'John', 'age': 30}\nuser['email'] = 'john@test.com'\nprint(user.get('phone', 'No phone'))",
    explanation: "- Line 1: Creates a dictionary with two key-value pairs using curly braces.\n- Line 2: Adds a new key 'email' and assigns it a value.\n- Line 3: Uses the .get() method to safely look for the key 'phone'. Since it doesn't exist, it avoids crashing and returns the default value 'No phone'.",
    problems: "1. Create a dictionary representing a car (make, model, year). Update the year to 2024.\n2. Write a loop that iterates through the car dictionary using .items() and prints 'Key: Value'."
  },
  {
    file: "10_sets",
    title: "10. Sets",
    summary: "Sets are unordered collections of UNIQUE elements. They automatically discard duplicates.",
    structure: "my_set = {item1, item2}",
    code: "numbers = {1, 2, 2, 3, 3}\nprint(numbers)\n\na = {1, 2}\nb = {2, 3}\nprint(a.intersection(b))",
    explanation: "- Line 1: Creates a set. Notice it uses curly braces like a dictionary, but has no key-value pairs.\n- Line 2: Prints {1, 2, 3}. The duplicates were instantly destroyed.\n- Line 6: Uses set math (intersection) to find elements that exist in BOTH set 'a' and set 'b'. It prints {2}.",
    problems: "1. Create a list with duplicates, convert it to a set to remove them, then convert it back to a list.\n2. Create two sets of friends. Use the .union() method to find all unique friends."
  },
  {
    file: "11_functions",
    title: "11. Functions",
    summary: "Functions are reusable blocks of code that only run when called. They take inputs (arguments) and return outputs.",
    structure: "def function_name(parameters):\n    # logic\n    return result",
    code: "def add_numbers(a, b=5):\n    return a + b\n\nresult = add_numbers(10)\nprint(result)",
    explanation: "- Line 1: Defines a function. 'a' is a required parameter. 'b' is an optional parameter with a default value of 5.\n- Line 2: The 'return' keyword sends the calculated result back to the caller.\n- Line 4: Calls the function, passing 10 for 'a'. Since 'b' is not provided, it defaults to 5. Result is 15.",
    problems: "1. Write a function that takes a string and returns it in all uppercase.\n2. Write a function that calculates the area of a circle, requiring a radius parameter and defaulting pi to 3.14."
  },
  {
    file: "12_args_kwargs",
    title: "12. *args and **kwargs",
    summary: "These allow a function to accept any number of positional (*args) or keyword (**kwargs) arguments.",
    structure: "def func(*args, **kwargs):",
    code: "def total_sum(*numbers):\n    return sum(numbers)\n\nprint(total_sum(1, 2, 3, 4))",
    explanation: "- Line 1: The asterisk (*) before 'numbers' tells Python to pack all given positional arguments into a Tuple called 'numbers'.\n- Line 2: Uses the built-in sum() function to add all numbers in the tuple.\n- Line 4: We can pass as many arguments as we want!",
    problems: "1. Write a function using **kwargs that accepts user details (name, age, city) and prints them nicely.\n2. Write a function that uses *args to multiply an unlimited amount of numbers together."
  },
  {
    file: "13_comprehensions",
    title: "13. Comprehensions",
    summary: "Comprehensions provide a concise, readable way to create lists, dictionaries, or sets in a single line.",
    structure: "[expression for item in iterable if condition]",
    code: "nums = [1, 2, 3, 4, 5]\nsquares = [x*x for x in nums if x % 2 == 0]\nprint(squares)",
    explanation: "- Line 2: This is a List Comprehension. It reads as: 'Give me x*x, for every x in nums, ONLY IF x is even'.\n- It acts as a massive time-saver, replacing a bulky 4-line for-loop and if-statement.\n- Line 3: Prints [4, 16], which are the squares of 2 and 4.",
    problems: "1. Use a list comprehension to create a list of all odd numbers between 1 and 20.\n2. Create a dictionary comprehension that maps numbers 1-5 to their cubes (e.g., {1: 1, 2: 8})."
  },
  {
    file: "14_errors",
    title: "14. Error Handling",
    summary: "Error handling prevents your program from crashing by 'catching' exceptions gracefully.",
    structure: "try:\n    # risky code\nexcept ErrorType:\n    # fallback code",
    code: "try:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')\nfinally:\n    print('Execution complete.')",
    explanation: "- Line 1-2: Python attempts the risky code (dividing by zero).\n- Line 3-4: Since line 2 causes a ZeroDivisionError, Python instantly jumps here instead of crashing the program.\n- Line 5-6: The 'finally' block ALWAYS runs, whether an error happened or not. Great for cleanup tasks.",
    problems: "1. Write a try/except block that catches a ValueError when trying to convert int('hello').\n2. Ask the user for a number. Use try/except to keep asking until they provide a valid integer."
  },
  {
    file: "15_fileio",
    title: "15. File Handling",
    summary: "File handling allows you to read and write permanent data to the hard drive. Using context managers ('with') ensures safety.",
    structure: "with open('filename', 'mode') as file:\n    file.write(data)",
    code: "with open('log.txt', 'w') as f:\n    f.write('System started.\\n')\n\nwith open('log.txt', 'r') as f:\n    print(f.read())",
    explanation: "- Line 1: Opens (or creates) 'log.txt' in Write ('w') mode. The 'with' keyword acts as a Context Manager—it automatically closes the file when the block ends!\n- Line 2: Writes text to the file.\n- Line 4: Opens the file in Read ('r') mode.\n- Line 5: Reads the entire file contents and prints it.",
    problems: "1. Write a script that appends ('a' mode) your name to a text file.\n2. Read a text file and print it line-by-line using a for-loop on the file object."
  },
  {
    file: "16_oop_basics",
    title: "16. OOP I: Classes",
    summary: "Object-Oriented Programming models real-world entities. A Class is a blueprint; an Object is a physical instance built from it.",
    structure: "class Name:\n    def __init__(self):\n        self.attr = value",
    code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        print(f'{self.name} says Woof!')\n\nd1 = Dog('Buddy')\nd1.bark()",
    explanation: "- Line 1: Defines a class (blueprint) named Dog.\n- Line 2: The __init__ method is the Constructor. It sets up the object. 'self' refers to the specific physical dog being created.\n- Line 4: A function inside a class is called a Method.\n- Line 7-8: We instantiate an object (d1) and call its method.",
    problems: "1. Create a 'Car' class with make and model attributes, and a 'drive' method.\n2. Create two different Car objects and make them both drive."
  },
  {
    file: "17_oop_inheritance",
    title: "17. OOP II: Inheritance",
    summary: "Inheritance allows a new 'Child' class to copy all attributes and methods of an existing 'Parent' class, saving code.",
    structure: "class Child(Parent):\n    # new code",
    code: "class Animal:\n    def eat(self): print('Eating')\n\nclass Cat(Animal):\n    def meow(self): print('Meow')\n\nc = Cat()\nc.eat()\nc.meow()",
    explanation: "- Line 1-2: Creates a Parent class with a generic 'eat' method.\n- Line 4-5: Creates a Child class 'Cat' that inherits from 'Animal'. It gets the 'eat' method for free!\n- Line 8: Proves inheritance works: the Cat can eat().\n- Line 9: The Cat can also use its own unique meow() method.",
    problems: "1. Create a 'Vehicle' parent class with a 'start_engine' method. Create a 'Motorcycle' child class that inherits it.\n2. Override the 'start_engine' method inside the child class to print a different sound (Polymorphism)."
  },
  {
    file: "18_oop_dunder",
    title: "18. OOP III: Dunder Methods",
    summary: "Dunder (Double Under) methods are special built-in methods (like __init__) that Python calls automatically behind the scenes.",
    structure: "def __str__(self):\n    return string",
    code: "class Book:\n    def __init__(self, title):\n        self.title = title\n    def __str__(self):\n        return f'Book: {self.title}'\n\nb = Book('1984')\nprint(b)",
    explanation: "- Line 2: The standard __init__ dunder method to set up the object.\n- Line 4: The __str__ dunder method dictates what happens when someone tries to convert the object to a string (like when calling print()).\n- Line 8: Because of __str__, it prints nicely as 'Book: 1984' instead of an ugly memory address.",
    problems: "1. Create a User class with a __str__ method that returns the user's name and ID.\n2. Implement the __len__ dunder method in a class so that calling len(object) returns a custom integer."
  },
  {
    file: "19_generators",
    title: "19. Advanced: Generators",
    summary: "Generators yield one item at a time instead of returning a massive list all at once. This saves massive amounts of memory.",
    structure: "def gen():\n    yield value",
    code: "def counter():\n    yield 1\n    yield 2\n\nc = counter()\nprint(next(c))\nprint(next(c))",
    explanation: "- Line 2-3: The 'yield' keyword is like 'return', but it PAUSES the function instead of killing it.\n- Line 5: We create the generator object.\n- Line 6: We call next() to unpause it. It runs until it hits the first yield, spits out 1, and pauses.\n- Line 7: We call next() again. It resumes from where it left off, spits out 2, and pauses.",
    problems: "1. Write a generator function that yields infinite even numbers (using a while True loop).\n2. Use a for-loop to iterate over your generator (make sure to break out of it before it crashes your PC!)."
  },
  {
    file: "20_decorators",
    title: "20. Advanced: Decorators",
    summary: "Decorators wrap another function to extend its behavior without modifying the original function's code. Used heavily in web frameworks.",
    structure: "@decorator_name\ndef func():",
    code: "def announcer(func):\n    def wrapper():\n        print('Starting...')\n        func()\n        print('Done!')\n    return wrapper\n\n@announcer\ndef task():\n    print('Working hard')\n\ntask()",
    explanation: "- Line 1-6: We define the decorator. It creates a 'wrapper' function that executes code before and after the original function (`func()`).\n- Line 8: We apply the decorator using the @ symbol.\n- Line 12: When we call task(), we are actually calling the wrapper(). It prints 'Starting...', then 'Working hard', then 'Done!'.",
    problems: "1. Create a decorator that converts the returned string of a function to all uppercase.\n2. Create a timer decorator that calculates how long a function takes to run using the 'time' module."
  },
  {
    file: "21_modules",
    title: "21. Modules and Packages",
    summary: "Modules allow you to split code across multiple files. Any .py file is a module.",
    structure: "import module_name\nfrom module_name import func",
    code: "import math\nfrom datetime import datetime\n\nprint(math.sqrt(16))\nprint(datetime.now().year)",
    explanation: "- Line 1: Imports the entire built-in 'math' module. We must prefix its functions with 'math.'\n- Line 2: Imports only the 'datetime' class from the 'datetime' module, allowing us to use it directly without a prefix.\n- Line 4: Calculates the square root of 16.\n- Line 5: Fetches the current year.",
    problems: "1. Import the 'random' module and use it to print a random integer between 1 and 10.\n2. Create your own file named 'tools.py' with a function, then import it into a different script and run it."
  },
  {
    file: "22_bestpractices",
    title: "22. Python Best Practices",
    summary: "PEP 8 is the official Python style guide. Writing code that works is step one; writing professional code is step two.",
    structure: "snake_case for variables\nPascalCase for classes",
    code: "# BAD CODE:\nx = 10\ndef makeCalc(): pass\nclass my_class: pass\n\n# GOOD PEP8 CODE:\nmax_speed = 10\ndef calculate_total(): pass\nclass NetworkManager: pass",
    explanation: "- Variables and Functions: Should ALWAYS use snake_case (all lowercase words separated by underscores).\n- Classes: Should ALWAYS use PascalCase (capitalize the first letter of every word, no underscores).\n- Constants: Should use UPPER_SNAKE_CASE.\n- These rules ensure your code is readable by any Python developer in the world.",
    problems: "1. Refactor this bad code to PEP 8: `class dataHandler: def Process_DATA(): userAge = 5`\n2. Research how to use the 'pylint' or 'flake8' tools to automatically check your code for PEP 8 compliance."
  }
];

const getPdfMarkdown = (topic) => {
  return "# Deep Dive: " + topic.title + "\n\n" +
  "## Concept Summary\n" + topic.summary + "\n\n" +
  "## Coding Structure\n```python\n" + topic.structure + "\n```\n\n" +
  "## Example Code\n```python\n" + topic.code + "\n```\n\n" +
  "## Code Explanation\n" + topic.explanation + "\n\n" +
  "## Practice Problems\n" + topic.problems.replace(/1\\. /g, '**1.** ').replace(/2\\. /g, '**2.** ') + "\n\n" +
  "---\n*Generated by AI SkillVerse Learning Platform*\n";
};

console.log("Generating 22 highly-detailed Markdown files...");

topicsData.forEach(topic => {
  const mdPath = path.join(outputDir, topic.file + ".md");
  fs.writeFileSync(mdPath, getPdfMarkdown(topic));
  
  console.log("Converting " + topic.file + ".md to PDF...");
  try {
    execSync('npx -y md-to-pdf "' + mdPath + '"', { stdio: 'ignore' });
  } catch (err) {
    console.error("Failed to convert " + topic.file + ".md", err.message);
  }
  
  if (fs.existsSync(mdPath)) {
    fs.unlinkSync(mdPath);
  }
});

console.log("All 22 structured PDFs generated successfully!");
