# C++: Zero to Pro Guide

C++ is a powerful, high-performance programming language. It is an extension of the C programming language that adds Object-Oriented Programming (OOP) and a massive library of pre-built tools (the STL). It is used to build operating systems, game engines (like Unreal Engine), and high-frequency trading platforms.

---

## 1. Structure of a C++ Program
Every C++ program needs a `main()` function to run.

```cpp
#include <iostream> // Includes the input/output stream library
using namespace std; // Allows us to use cout without typing std::cout

int main() {
    cout << "Hello, World!" << endl; // Prints text to the screen
    return 0; // Tells the OS the program ran successfully
}
```

---

## 2. Variables & Data Types
C++ is statically typed. You MUST tell the computer what type of data a variable will hold before you can use it.

```cpp
int age = 25;              // Integer (whole numbers)
double price = 19.99;      // Double (decimal numbers)
char grade = 'A';          // Character (single quotes)
string name = "Alice";     // String (text, double quotes)
bool isStudent = true;     // Boolean (true/false)

// Constants cannot be changed once set
const double PI = 3.14159; 
```

---

## 3. User Input & Output (cin and cout)
We use `cout` (character output) with the `<<` insertion operator to print, and `cin` (character input) with the `>>` extraction operator to get input.

```cpp
string username;
cout << "Enter your name: ";
cin >> username; // Waits for the user to type and press Enter
cout << "Welcome, " << username << "!" << endl;
```

---

## 4. Control Flow (If-Else & Switch)
C++ uses curly braces `{}` to group blocks of code.

```cpp
int score = 85;

if (score >= 90) {
    cout << "Grade: A";
} else if (score >= 80) {
    cout << "Grade: B";
} else {
    cout << "Grade: C";
}

// Switch statements are great for specific values
char menuChoice = 'b';
switch (menuChoice) {
    case 'a': cout << "Option A"; break;
    case 'b': cout << "Option B"; break;
    default:  cout << "Invalid Option";
}
```

---

## 5. Loops
Loops repeat code. `for` loops are used when you know exactly how many times to repeat. `while` loops are used when you don't.

```cpp
// For Loop: (Initialization; Condition; Update)
for (int i = 0; i < 5; i++) {
    cout << i << " "; // Prints 0 1 2 3 4
}

// While Loop
int battery = 100;
while (battery > 0) {
    battery -= 20;
}
```

---

## 6. Arrays
An array is a collection of variables of the SAME type, stored in contiguous memory.

```cpp
int numbers[5] = {10, 20, 30, 40, 50}; // An array holding 5 integers

// Accessing arrays (Index starts at 0)
cout << numbers[0]; // Prints 10

// Modifying arrays
numbers[1] = 99; // Changes the second item from 20 to 99
```

---

## 7. Functions
Functions break your code into reusable blocks. You must declare the return type of the function before its name.

```cpp
// Function that takes two ints and returns an int
int addNumbers(int a, int b) {
    return a + b;
}

// 'void' means the function returns absolutely nothing
void greet() {
    cout << "Hello there!" << endl;
}

int main() {
    int sum = addNumbers(5, 10);
    greet();
}
```

---

## 8. Pointers & References (The Power of C++)
This is what makes C++ so fast. A pointer stores the actual **Memory Address** of another variable.

```cpp
int score = 100;
int* ptr = &score; // The '&' gets the memory address of score

cout << score; // Prints 100
cout << &score; // Prints a hex memory address (e.g., 0x7ffe4)
cout << ptr;    // Prints the same hex memory address
cout << *ptr;   // The '*' dereferences the pointer to get the value: 100

// Modifying through a pointer instantly affects the original variable!
*ptr = 200;
cout << score; // Now prints 200
```

---

## 9. Object-Oriented Programming (OOP)
OOP models real-world entities using Classes and Objects.
- **Class:** The blueprint (e.g., Car)
- **Object:** The physical thing built from the blueprint (e.g., A red Toyota)

```cpp
class Car {
private:
    // Private data cannot be accessed from outside the class (Encapsulation)
    int mileage;

public:
    string model;
    
    // Constructor (Runs automatically when an object is created)
    Car(string m) {
        model = m;
        mileage = 0;
    }

    // Public method
    void drive(int distance) {
        mileage += distance;
        cout << model << " drove " << distance << " miles." << endl;
    }
};

int main() {
    Car myCar("Mustang"); // Creates an Object
    myCar.drive(50);      // Calls a method
}
```

---

## 10. Memory Management (new and delete)
In C++, you must manually manage memory when creating dynamic objects on the Heap. If you forget to delete them, you cause a **Memory Leak**.

```cpp
// Dynamically allocating memory on the Heap
int* dynamicNum = new int;
*dynamicNum = 500;

cout << *dynamicNum;

// CRITICAL: You MUST free the memory when done!
delete dynamicNum; 
```
*Note: Modern C++ (C++11 and later) uses Smart Pointers (`std::unique_ptr`) to handle this automatically, eliminating memory leaks!*

---

## 11. The Standard Template Library (STL)
The STL is a massive library of powerful data structures (Containers) and algorithms. `std::vector` is a dynamic array that can grow and shrink automatically!

```cpp
#include <vector>

vector<int> scores; // Creates an empty vector

scores.push_back(100); // Adds 100 to the end
scores.push_back(95);  // Adds 95 to the end
scores.pop_back();     // Removes the last item (95)

cout << scores.size(); // Prints 1 (Since only 100 is left)
```

---

## 12. Exception Handling
Used to catch errors (like dividing by zero) so the program doesn't crash instantly.

```cpp
try {
    int age = -5;
    if (age < 0) {
        throw runtime_error("Age cannot be negative!");
    }
    cout << "Age is valid.";
} catch (const exception& e) {
    cout << "ERROR CAUGHT: " << e.what() << endl;
}
```

---
*Created beautifully for you by AI SkillVerse Learning Platform*
