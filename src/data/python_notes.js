export const pythonNotesData = [
  {
    id: "intro",
    title: "1. Welcome to Python! (Zero Knowledge Start)",
    icon: "BookOpen",
    content: [
      {
        type: "paragraph",
        text: "Imagine you want to tell your computer to do a specific task, like calculating your monthly budget or building a website. Computers only understand 1s and 0s (machine code). Python is a 'translator'. It allows you to write instructions in plain, friendly English, and Python translates it into 1s and 0s for the computer to execute."
      },
      {
        type: "paragraph",
        text: "Python is incredibly popular because it reads almost like a normal English book. You don't need to worry about complex syntax (like semicolons or curly braces) that other languages force you to use."
      },
      {
        type: "tip",
        text: "Why learn Python?\n1. It's Beginner Friendly: The easiest language to read and write.\n2. It's Powerful: Used by Google, Netflix, and NASA.\n3. It's Versatile: Used for Web Development, Data Science, Artificial Intelligence, and Automation."
      },
      {
        type: "code",
        title: "Your Very First Python Program",
        code: `# In Python, the hashtag symbol (#) means this is a "comment".
# The computer ignores comments. They are just notes for you to read!

# The print() function tells Python to display text on the screen.
print("Hello, World!") 

# Output:
# Hello, World!`
      }
    ]
  },
  {
    id: "variables",
    title: "2. Variables & Data Types (Storing Information)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Think of your computer's memory as a giant warehouse filled with empty cardboard boxes. A **Variable** is just a name tag you stick on a box so you can find it later."
      },
      {
        type: "paragraph",
        text: "Unlike other languages, Python is 'smart'. You don't have to tell Python what kind of data is going into the box. Just put the data in, and Python figures it out!"
      },
      {
        type: "code",
        title: "Creating Variables",
        code: `age = 25              # Python knows this is an Integer (whole number)
temperature = 98.6    # Python knows this is a Float (decimal number)
name = "Alice"        # Python knows this is a String (text, wrapped in quotes)
is_raining = False    # Python knows this is a Boolean (True or False)`
      },
      {
        type: "tip",
        text: "Rules for naming variables:\n1. Must start with a letter or underscore (e.g., \`_age\` or \`age\`).\n2. Cannot start with a number (e.g., \`1name\` is bad).\n3. Cannot have spaces. Use underscores instead (e.g., \`first_name\`, NOT \`first name\`)."
      },
      {
        type: "code",
        title: "Type Casting (Changing Box Types)",
        code: `# Sometimes you need to change the data type.
# Imagine a user types their age on a website. It comes in as text:
user_input = "30"

# You can't do math with text! You must convert it (Cast it) to a number:
actual_age = int(user_input)

print(actual_age + 5) # Prints 35!`
      }
    ]
  },
  {
    id: "operators",
    title: "3. Operators (Doing Math and Logic)",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Operators are symbols that perform operations on variables and values."
      },
      {
        type: "code",
        title: "Arithmetic Operators",
        code: `x = 10
y = 3

print(x + y)  # 13 (Addition)
print(x - y)  # 7  (Subtraction)
print(x * y)  # 30 (Multiplication)
print(x / y)  # 3.333 (Normal Division - always gives a decimal)
print(x // y) # 3  (Floor Division - chops off the decimal part)
print(x % y)  # 1  (Modulo - gives the REMAINDER of division. 10 / 3 is 9, remainder 1)
print(x ** y) # 1000 (Exponentiation - 10 to the power of 3)`
      },
      {
        type: "code",
        title: "Logical Operators (Combining Questions)",
        code: `has_ticket = True
is_vip = False

# 'and' requires BOTH sides to be True
print(has_ticket and is_vip) # False

# 'or' requires AT LEAST ONE side to be True
print(has_ticket or is_vip)  # True

# 'not' reverses the truth
print(not has_ticket)        # False`
      }
    ]
  },
  {
    id: "strings",
    title: "4. Strings in Depth (Working with Text)",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "A String is a sequence of characters (letters, numbers, symbols) wrapped in quotes. You can use single quotes ('hello') or double quotes (\"hello\")."
      },
      {
        type: "code",
        title: "String Slicing (Cutting Text)",
        code: `text = "Python"
# Python starts counting at 0!
# P  y  t  h  o  n
# 0  1  2  3  4  5

print(text[0])   # P (First letter)
print(text[1])   # y (Second letter)
print(text[-1])  # n (Negative numbers count from the END!)

# Slicing: text[start : end] (does NOT include the end index)
print(text[0:2]) # "Py" (gets index 0 and 1)
print(text[2:])  # "thon" (gets everything from index 2 to the end)`
      },
      {
        type: "code",
        title: "f-Strings (The Best Way to Format Text)",
        code: `name = "Alice"
age = 25

# Old, messy way:
print("My name is " + name + " and I am " + str(age) + " years old.")

# The beautiful f-string way (put an 'f' before the quotes):
print(f"My name is {name} and I am {age} years old.")`
      },
      {
        type: "warning",
        text: "Strings are Immutable! This means once created, you cannot change a single letter inside them. \`text[0] = 'J'\` will cause an error! You must create a brand new string."
      }
    ]
  },
  {
    id: "controlflow",
    title: "5. Control Flow (Making Decisions)",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "By default, Python reads your code from top to bottom. Control Flow allows you to make decisions and skip code based on conditions."
      },
      {
        type: "warning",
        text: "CRITICAL: Python uses Indentation (Spaces) to group code. If you forget to indent, Python will crash with an IndentationError. Always use 4 spaces (or 1 Tab)."
      },
      {
        type: "code",
        title: "if, elif, and else",
        code: `temperature = 75

if temperature > 80:
    # Notice the 4 spaces before print! This means it belongs to the 'if'
    print("It is a hot day!")
    print("Drink plenty of water.")
elif temperature > 60:
    # elif stands for 'else if'
    print("It is a nice day.")
else:
    print("It is cold.")
    
print("This prints no matter what, because it is not indented!")`
      }
    ]
  },
  {
    id: "loops",
    title: "6. Loops (Repeating Actions)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "Loops allow you to run the same block of code multiple times without copy-pasting."
      },
      {
        type: "code",
        title: "The 'for' Loop",
        code: `# Use a 'for' loop when you know exactly how many times to repeat.
# range(5) generates numbers 0, 1, 2, 3, 4
for i in range(5):
    print(f"Sending email #{i}")

# Looping over a text string
for letter in "Apple":
    print(letter)`
      },
      {
        type: "code",
        title: "The 'while' Loop",
        code: `# Use a 'while' loop when you don't know when it will end, 
# you just want it to run AS LONG AS a condition is True.

battery = 100
while battery > 0:
    print(f"Battery at {battery}%. Playing game...")
    battery -= 20 # Same as: battery = battery - 20
    
print("Phone died!")`
      },
      {
        type: "tip",
        text: "Break and Continue:\n- \`break\`: Instantly destroys the loop and stops it completely.\n- \`continue\`: Skips the rest of the current loop iteration, and jumps to the next one."
      }
    ]
  },
  {
    id: "lists",
    title: "7. Lists (Storing Collections)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A List is a collection of items stored in a specific order. Imagine a physical shopping list written on paper. You can add items, remove items, or reorder them."
      },
      {
        type: "code",
        title: "List Operations",
        code: `fruits = ["apple", "banana", "cherry"]

# 1. Accessing items (Index starts at 0)
print(fruits[0]) # "apple"

# 2. Adding items
fruits.append("orange")    # Adds to the very end
fruits.insert(1, "mango")  # Squeezes "mango" into index 1

# 3. Removing items
fruits.remove("banana")    # Removes the first "banana" it finds
popped_fruit = fruits.pop() # Removes and returns the LAST item

# 4. Sorting
numbers = [5, 2, 9, 1]
numbers.sort()  # Changes list to [1, 2, 5, 9]

print(len(fruits)) # 'len()' tells you how many items are in the list`
      }
    ]
  },
  {
    id: "tuples",
    title: "8. Tuples (Locked Lists)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A Tuple is exactly like a List, but with one massive difference: It is IMMUTABLE. Once you create it, you can never add, remove, or change items inside it. You use parentheses \`()\` instead of square brackets \`[]\`."
      },
      {
        type: "code",
        title: "Tuples and Unpacking",
        code: `# Creating a tuple
dimensions = (1920, 1080)

print(dimensions[0]) # 1920
# dimensions[0] = 800  <-- ERROR! Tuples cannot be changed!

# Tuple Unpacking (A beautiful Python feature)
# You can split a tuple into multiple variables instantly:
width, height = dimensions

print(f"Width: {width}, Height: {height}")`
      },
      {
        type: "tip",
        text: "Why use Tuples instead of Lists? Tuples are slightly faster, and they provide safety. If you have data that should NEVER change (like days of the week, or screen dimensions), use a tuple so you don't accidentally ruin it later in your code."
      }
    ]
  },
  {
    id: "dictionaries",
    title: "9. Dictionaries (Key-Value Pairs)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A Dictionary is a collection of Key-Value pairs. Imagine a real-world dictionary: you look up a word (the Key) to find its definition (the Value)."
      },
      {
        type: "code",
        title: "Dictionary Operations",
        code: `# Use curly braces {} for dictionaries
student = {
    "name": "John",
    "age": 22,
    "major": "Computer Science"
}

# 1. Accessing values (You ask for the Key, it gives you the Value)
print(student["name"]) # "John"

# The .get() method is safer! If the key doesn't exist, it returns 'None' instead of crashing.
print(student.get("gpa")) # None

# 2. Adding or updating
student["gpa"] = 3.8    # Adds a new key-value pair
student["age"] = 23     # Updates the existing age

# 3. Removing
del student["major"]

# 4. Looping through a dictionary
for key, value in student.items():
    print(f"The {key} is {value}")`
      }
    ]
  },
  {
    id: "sets",
    title: "10. Sets (Unique Items Only)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A Set is a collection of items where EVERY ITEM MUST BE UNIQUE. Sets are completely unordered, meaning they don't have an index (you can't do \`my_set[0]\`)."
      },
      {
        type: "code",
        title: "Sets and Set Math",
        code: `# Creating a Set (Notice the curly braces, but no Key-Value pairs!)
numbers = {1, 2, 2, 2, 3, 4, 4}

print(numbers) # Output: {1, 2, 3, 4} (Duplicates vanished!)

# Set Math (Just like high school math!)
math_students = {"Alice", "Bob", "Charlie"}
science_students = {"Bob", "David", "Alice"}

# Intersection (Who is in BOTH classes?)
print(math_students.intersection(science_students)) # {"Alice", "Bob"}

# Union (Combine everyone, no duplicates)
print(math_students.union(science_students)) # {"Alice", "Bob", "Charlie", "David"}`
      }
    ]
  },
  {
    id: "functions",
    title: "11. Functions (Reusable Code Blocks)",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "A function is a block of code that only runs when you call it. You can pass data into it, and it can return data back to you. \n\nThink of a function like a coffee machine. You put beans and water in (arguments), the machine does its internal processing, and it spits a cup of coffee out (return value)."
      },
      {
        type: "code",
        title: "Defining and Using Functions",
        code: `# Use the 'def' keyword to define a function
def calculate_area(length, width):
    area = length * width
    return area  # Gives the result back to whoever called it

# Calling the function
room_area = calculate_area(10, 5)
print(room_area) # 50`
      },
      {
        type: "code",
        title: "Default Arguments and Keyword Arguments",
        code: `# You can provide default values so the user doesn't have to provide them!
def greet(name, msg="Good morning"):
    print(f"{msg}, {name}!")

greet("Alice")               # Good morning, Alice!
greet("Bob", "Good evening") # Good evening, Bob! (Overrides the default)

# Keyword Arguments: You can specify exactly which argument you are passing
greet(msg="Hello", name="Charlie")`
      }
    ]
  },
  {
    id: "args_kwargs",
    title: "12. *args and **kwargs (Unlimited Arguments)",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Sometimes you don't know how many items a user will pass into your function. What if you want a function that can add 2 numbers, or 10 numbers, or 100 numbers together?"
      },
      {
        type: "code",
        title: "Using *args (List of unknown arguments)",
        code: `# The * tells Python: "Gather all the arguments into a Tuple called 'numbers'"
def add_everything(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(add_everything(1, 2))       # 3
print(add_everything(10, 20, 30)) # 60`
      },
      {
        type: "code",
        title: "Using **kwargs (Dictionary of unknown arguments)",
        code: `# The ** tells Python: "Gather all Keyword arguments into a Dictionary"
def print_user_info(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_user_info(name="Alice", age=25, city="New York")`
      }
    ]
  },
  {
    id: "comprehensions",
    title: "13. Comprehensions (The Pythonic Superpower)",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "Comprehensions are a way to write an entire \`for\` loop and \`if\` statement on a single, highly readable line of code. It is the signature feature of Python."
      },
      {
        type: "code",
        title: "List Comprehensions",
        code: `# GOAL: We have a list of numbers. We want a new list with only the EVEN numbers squared.

numbers = [1, 2, 3, 4, 5, 6]

# The Old, Clunky Way (Takes 4 lines):
squares = []
for n in numbers:
    if n % 2 == 0:
        squares.append(n * n)

# The Pythonic Way (1 beautiful line):
# Format: [ expression  for item in list  if condition ]
squares_pro = [n * n for n in numbers if n % 2 == 0]

print(squares_pro) # [4, 16, 36]`
      }
    ]
  },
  {
    id: "errors",
    title: "14. Error Handling (Try / Except)",
    icon: "AlertTriangle",
    content: [
      {
        type: "paragraph",
        text: "When Python encounters an error (like trying to divide by zero, or opening a file that doesn't exist), it 'Throws an Exception'. If you don't catch it, your entire program crashes instantly."
      },
      {
        type: "code",
        title: "Catching Errors Gracefully",
        code: `try:
    # 1. Python tries to run this risky code
    age = int(input("Enter your age: "))
    result = 100 / age
    print(f"Magic number is {result}")
    
except ValueError:
    # 2. If they typed "hello" instead of a number, it jumps here!
    print("Error: Please enter a valid number!")
    
except ZeroDivisionError:
    # 3. If they typed "0", it jumps here!
    print("Error: You cannot divide by zero!")
    
finally:
    # 4. This ALWAYS runs, even if it crashed. Perfect for closing files.
    print("Thank you for using the program.")`
      }
    ]
  },
  {
    id: "fileio",
    title: "15. File Handling & Context Managers",
    icon: "FileText",
    content: [
      {
        type: "paragraph",
        text: "To save data permanently, you write it to a file. The golden rule of file handling is: If you open a file, you MUST close it. If you forget, the file might get corrupted."
      },
      {
        type: "code",
        title: "The 'with' Statement (Context Manager)",
        code: `# The 'with' statement is a Context Manager. 
# It automatically closes the file for you the second the block ends, 
# EVEN IF your code crashes in the middle! It is perfectly safe.

# WRITING to a file ("w" mode overwrites the file, "a" mode appends to it)
with open("notes.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Python is fun.")
    # No file.close() needed!

# READING from a file ("r" mode)
with open("notes.txt", "r") as file:
    content = file.read()
    print(content)`
      }
    ]
  },
  {
    id: "oop_basics",
    title: "16. Object-Oriented Programming I (Classes)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "OOP is a way to model your code after real-world objects. \n\nThink of a **Class** as a blueprint. An architect draws a blueprint for a house. The blueprint itself is not a physical house. But builders use that blueprint to build 10 physical houses. Those physical houses are the **Objects** (or Instances)."
      },
      {
        type: "code",
        title: "Creating a Class and Objects",
        code: `class Car:
    # The __init__ method is the Constructor. It sets up the object.
    # 'self' refers to the specific physical car being built right now.
    def __init__(self, make, model, color):
        self.make = make      # Attribute (State)
        self.model = model    # Attribute (State)
        self.color = color    # Attribute (State)

    # A function inside a class is called a "Method"
    def start_engine(self):
        print(f"The {self.color} {self.make} {self.model}'s engine is roaring!")

# Building Objects from the Blueprint
car1 = Car("Toyota", "Camry", "Blue")
car2 = Car("Ford", "Mustang", "Red")

car1.start_engine() # The Blue Toyota Camry's engine is roaring!
car2.start_engine() # The Red Ford Mustang's engine is roaring!`
      }
    ]
  },
  {
    id: "oop_inheritance",
    title: "17. OOP II: Inheritance & Polymorphism",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "Inheritance allows a new class to copy all the attributes and methods of an existing class. It saves you from writing the same code twice."
      },
      {
        type: "code",
        title: "Inheritance Example",
        code: `# PARENT CLASS
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} is eating.")

# CHILD CLASS (Inherits from Animal)
class Dog(Animal):
    def bark(self):
        print(f"{self.name} says Woof!")

my_dog = Dog("Buddy")
my_dog.eat()  # It inherited 'eat' from Animal!
my_dog.bark() # It has its own unique method too.`
      },
      {
        type: "paragraph",
        text: "**Polymorphism** means 'many forms'. It allows a child class to override (replace) a method from the parent class with its own specific implementation."
      }
    ]
  },
  {
    id: "oop_dunder",
    title: "18. OOP III: Dunder Methods (Magic Methods)",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Notice how \`__init__\` has double underscores? These are called 'Dunder' (Double Under) methods. They are special built-in methods that Python calls automatically behind the scenes."
      },
      {
        type: "code",
        title: "The __str__ Dunder Method",
        code: `class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    # __str__ controls what happens when you print() the object
    def __str__(self):
        return f"'{self.title}' written by {self.author}"

my_book = Book("Harry Potter", "J.K. Rowling")

# Without __str__, this prints a ugly memory address: <__main__.Book object at 0x103a>
# With __str__, it prints beautifully:
print(my_book) # 'Harry Potter' written by J.K. Rowling`
      }
    ]
  },
  {
    id: "generators",
    title: "19. Advanced: Iterators and Generators",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "Imagine you are asked to read a book with 10 million pages. If you try to hold all 10 million pages in your hands at once (a List), your arms will snap (your computer runs out of RAM and crashes).\n\nA **Generator** solves this. It gives you ONE page at a time, you read it, and then it throws it away and gives you the next. It uses almost zero memory!"
      },
      {
        type: "code",
        title: "The 'yield' Keyword",
        code: `def infinite_counter():
    count = 1
    while True:
        # 'yield' is like 'return', but it PAUSES the function instead of killing it.
        yield count 
        count += 1

# This generates numbers on-the-fly, forever, without crashing!
counter = infinite_counter()

print(next(counter)) # 1
print(next(counter)) # 2
print(next(counter)) # 3`
      }
    ]
  },
  {
    id: "decorators",
    title: "20. Advanced: Decorators (@)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "A Decorator is a function that takes another function, adds some extra functionality to it, and returns it. It 'decorates' the original function. You'll see them everywhere in Python web frameworks like Flask and Django."
      },
      {
        type: "code",
        title: "Building a Decorator",
        code: `import time

# 1. We build the decorator
def timer_decorator(func):
    def wrapper():
        start = time.time()
        
        func()  # We execute the original function here!
        
        end = time.time()
        print(f"That took {end - start} seconds.")
    return wrapper

# 2. We apply it using the @ symbol
@timer_decorator
def slow_task():
    print("Starting task...")
    time.sleep(1) # Pretend to do hard work for 1 second
    print("Task finished!")

# When we call it, the decorator wraps around it!
slow_task()`
      }
    ]
  },
  {
    id: "modules",
    title: "21. Modules and Packages",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Writing all your code in one massive file is a bad idea. Modules allow you to split your code into multiple files. Any \`.py\` file is a module!"
      },
      {
        type: "code",
        title: "Importing Modules",
        code: `# Imagine we have a file named 'math_tools.py' with an add() function.

# Option 1: Import the whole file
import math_tools
print(math_tools.add(5, 5))

# Option 2: Import just the specific function
from math_tools import add
print(add(5, 5))

# Option 3: Import and rename it (Alias)
import math_tools as mt
print(mt.add(5, 5))`
      },
      {
        type: "tip",
        text: "What does \`if __name__ == '__main__':\` mean? \n\nWhen you import a file, Python runs all the code in it immediately. If you have test code at the bottom of your file, it will run! Putting your code under \`if __name__ == '__main__':\` tells Python: 'ONLY run this block if I am running this specific file directly. DO NOT run this block if I am just being imported by someone else.'"
      }
    ]
  },
  {
    id: "bestpractices",
    title: "22. Python Best Practices (PEP 8)",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "PEP 8 is the official style guide for Python. Writing code that works is only step one. Step two is writing code that looks professional."
      },
      {
        type: "code",
        title: "Naming Conventions",
        code: `# Variables & Functions: snake_case (all lowercase, underscores)
user_age = 25
def calculate_total_price():
    pass

# Classes: PascalCase (Capitalize every word, no underscores)
class BankAccount:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100`
      },
      {
        type: "tip",
        text: "Always use meaningful variable names. \`x = 86400\` is terrible. \`seconds_in_a_day = 86400\` is professional."
      }
    ]
  }
];
