# Python: Zero to Pro Guide

Welcome to Python! This guide is designed to take you from absolute zero knowledge all the way to advanced professional concepts. It is written in simple, friendly English. If you study this material, you will have a rock-solid foundation to become a pro.

---

## 1. Welcome to Python! (Zero Knowledge Start)
Imagine you want to tell your computer to do a specific task, like calculating your monthly budget. Computers only understand 1s and 0s. Python is a "translator". It allows you to write instructions in plain, friendly English, and Python translates it into 1s and 0s for the computer to execute.

Python is incredibly popular because it reads almost like a normal English book. 

> **💡 Pro Tip:** Why learn Python?
> 1. **Beginner Friendly:** The easiest language to read and write.
> 2. **Powerful:** Used by Google, Netflix, and NASA.
> 3. **Versatile:** Used for Web Development, AI, and Automation.

```python
# In Python, the hashtag symbol (#) means this is a "comment".
# The computer ignores comments. They are just notes for you to read!

# The print() function tells Python to display text on the screen.
print("Hello, World!") 
```

---

## 2. Variables & Data Types (Storing Information)
Think of your computer's memory as a giant warehouse filled with empty cardboard boxes. A **Variable** is just a name tag you stick on a box so you can find it later.

Unlike other languages, Python is "smart". You don't have to tell Python what kind of data is going into the box. Just put the data in, and Python figures it out!

```python
age = 25              # Integer (whole number)
temperature = 98.6    # Float (decimal number)
name = "Alice"        # String (text, wrapped in quotes)
is_raining = False    # Boolean (True or False)
```

**Type Casting (Changing Box Types)**
Sometimes you need to change the data type. Imagine a user types their age on a website. It comes in as text (`"30"`). You can't do math with text! You must convert it (Cast it) to a number:
```python
user_input = "30"
actual_age = int(user_input)
print(actual_age + 5) # Prints 35!
```

---

## 3. Operators (Doing Math and Logic)
Operators are symbols that perform operations on variables and values.

**Arithmetic Operators:**
```python
x = 10
y = 3

print(x + y)  # 13 (Addition)
print(x / y)  # 3.333 (Normal Division)
print(x // y) # 3  (Floor Division - chops off the decimal part)
print(x % y)  # 1  (Modulo - gives the REMAINDER of division. 10 / 3 is 9, remainder 1)
print(x ** y) # 1000 (Exponentiation - 10 to the power of 3)
```

**Logical Operators:**
```python
has_ticket = True
is_vip = False

print(has_ticket and is_vip) # False (BOTH must be true)
print(has_ticket or is_vip)  # True  (AT LEAST ONE must be true)
print(not has_ticket)        # False (Reverses the truth)
```

---

## 4. Strings in Depth (Working with Text)
A String is a sequence of characters wrapped in quotes. 

**String Slicing (Cutting Text):**
Python starts counting at 0!
```python
text = "Python"
print(text[0])   # P (First letter)
print(text[-1])  # n (Negative numbers count from the END!)

# Slicing: text[start : end] (does NOT include the end index)
print(text[0:2]) # "Py"
```

**f-Strings (The Best Way to Format Text):**
```python
name = "Alice"
age = 25
# Put an 'f' before the quotes to inject variables directly!
print(f"My name is {name} and I am {age} years old.")
```

---

## 5. Control Flow (Making Decisions)
By default, Python reads code from top to bottom. Control Flow allows you to skip code based on conditions.

> **CRITICAL:** Python uses Indentation (Spaces) to group code. Always use 4 spaces inside an `if` statement!

```python
temperature = 75

if temperature > 80:
    print("It is a hot day!")
elif temperature > 60:
    print("It is a nice day.")
else:
    print("It is cold.")
```

---

## 6. Loops (Repeating Actions)
Loops allow you to run the same block of code multiple times.

**The 'for' Loop (When you know how many times to repeat):**
```python
for i in range(5):
    print(f"Sending email #{i}")
```

**The 'while' Loop (When you just want it to run AS LONG AS a condition is true):**
```python
battery = 100
while battery > 0:
    print(f"Battery at {battery}%.")
    battery -= 20 
```

---

## 7. Lists (Storing Collections)
A List is a collection of items stored in a specific order.

```python
fruits = ["apple", "banana", "cherry"]

fruits.append("orange")    # Adds to the very end
fruits.insert(1, "mango")  # Squeezes "mango" into index 1
fruits.remove("banana")    # Removes "banana"

print(len(fruits))         # Tells you how many items are in the list
```

---

## 8. Tuples (Locked Lists)
A Tuple is exactly like a List, but it is **IMMUTABLE**. Once you create it, you can never change it.

```python
dimensions = (1920, 1080)
# dimensions[0] = 800  <-- ERROR! Tuples cannot be changed!

# Tuple Unpacking: Split a tuple instantly
width, height = dimensions
```

---

## 9. Dictionaries (Key-Value Pairs)
Imagine a real-world dictionary: you look up a word (Key) to find its definition (Value).

```python
student = {
    "name": "John",
    "age": 22
}

print(student["name"])     # "John"
student["gpa"] = 3.8       # Adds a new key-value pair
```

---

## 10. Sets (Unique Items Only)
A Set is a collection where EVERY ITEM MUST BE UNIQUE.

```python
numbers = {1, 2, 2, 3, 3}
print(numbers) # {1, 2, 3} (Duplicates vanished!)

# Intersection (Who is in BOTH groups?)
group_a = {"Alice", "Bob"}
group_b = {"Bob", "Charlie"}
print(group_a.intersection(group_b)) # {"Bob"}
```

---

## 11. Functions (Reusable Code Blocks)
A function is a block of code that only runs when you call it. Think of it like a coffee machine: you put beans in (arguments), and it spits coffee out (return value).

```python
def calculate_area(length, width):
    area = length * width
    return area

print(calculate_area(10, 5)) # 50
```

---

## 12. *args and **kwargs (Unlimited Arguments)
What if you want a function that can add 2 numbers, or 100 numbers together?

```python
# The * gathers all arguments into a Tuple
def add_everything(*numbers):
    total = 0
    for num in numbers:
        total += num
    return total

print(add_everything(1, 2, 3, 4, 5)) # 15
```

---

## 13. Comprehensions (The Pythonic Superpower)
Write an entire `for` loop on a single line!

```python
numbers = [1, 2, 3, 4, 5, 6]

# Goal: Square only the EVEN numbers
squares_pro = [n * n for n in numbers if n % 2 == 0]
print(squares_pro) # [4, 16, 36]
```

---

## 14. Error Handling (Try / Except)
Don't let your program crash. Handle errors gracefully!

```python
try:
    result = 100 / 0
except ZeroDivisionError:
    print("Error: You cannot divide by zero!")
finally:
    print("This ALWAYS runs, even if it crashed.")
```

---

## 15. File Handling & Context Managers
The `with` statement automatically closes files for you, even if your code crashes.

```python
with open("notes.txt", "w") as file:
    file.write("Python is fun.")
    # No file.close() needed! It is perfectly safe.
```

---

## 16. Object-Oriented Programming (Classes)
Think of a **Class** as a blueprint for a house. The physical houses built from the blueprint are **Objects**.

```python
class Car:
    # __init__ sets up the object being built ('self')
    def __init__(self, make, model):
        self.make = make
        self.model = model

    def start_engine(self):
        print(f"The {self.make} {self.model} starts!")

my_car = Car("Toyota", "Camry")
my_car.start_engine()
```

---

## 17. Inheritance & Polymorphism
Inheritance allows a new class to copy attributes/methods from an existing class.

```python
class Animal:
    def eat(self):
        print("Eating...")

class Dog(Animal):
    def bark(self):
        print("Woof!")

my_dog = Dog()
my_dog.eat()  # Inherited from Animal!
```

---

## 18. Dunder Methods (Magic Methods)
`__init__` and `__str__` are special methods Python calls automatically.

```python
class Book:
    def __init__(self, title):
        self.title = title

    # __str__ controls what happens when you print() the object
    def __str__(self):
        return f"Book: {self.title}"

b = Book("Harry Potter")
print(b) # "Book: Harry Potter"
```

---

## 19. Advanced: Iterators and Generators
If you process 10 million rows of data in a List, your computer will crash. A **Generator** yields ONE row at a time, using zero memory!

```python
def infinite_counter():
    count = 1
    while True:
        # 'yield' PAUSES the function instead of killing it
        yield count 
        count += 1

counter = infinite_counter()
print(next(counter)) # 1
print(next(counter)) # 2
```

---

## 20. Advanced: Decorators (@)
A Decorator is a function that wraps another function to add extra functionality to it (like a timer).

```python
import time

def timer_decorator(func):
    def wrapper():
        start = time.time()
        func() 
        end = time.time()
        print(f"That took {end - start} seconds.")
    return wrapper

@timer_decorator
def slow_task():
    time.sleep(1)
    print("Task finished!")

slow_task()
```

---

## 21. Modules and Packages
Split your code into multiple files. Any `.py` file is a module!

```python
# Import a specific function from another file
from math_tools import add

print(add(5, 5))
```

---

## 22. Python Best Practices (PEP 8)
Write code that looks professional.

```python
# Variables: snake_case
user_age = 25

# Classes: PascalCase
class BankAccount:
    pass

# Constants: UPPER_SNAKE_CASE
MAX_CONNECTIONS = 100
```
