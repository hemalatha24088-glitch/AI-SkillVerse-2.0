const fs = require('fs');
const path = require('path');

const cppNotes = `export const cppNotesData = [
  {
    id: "intro",
    title: "1. Introduction & Compilation",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "Unlike interpreted languages (like Python or JavaScript), C++ is a compiled language. When you write C++ code, the CPU cannot understand it directly. It must be translated into raw machine code (1s and 0s) before it can run. This makes C++ blazingly fast."
      },
      {
        type: "code",
        title: "A Basic C++ Program",
        code: \`#include <iostream> 

int main() {
    std::cout << "Hello, World!\\\\n"; 
    return 0;
}\`
      }
    ]
  },
  {
    id: "variables",
    title: "2. Variables & Data Types",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Because C++ is statically typed, you MUST tell the compiler exactly what type of data a variable will hold."
      },
      {
        type: "code",
        title: "Basic Data Types",
        code: \`int age = 25;               
double price = 19.99;       
char grade = 'A';           
bool is_active = true;      

#include <string>
std::string name = "John";  

const double PI = 3.14159;\`
      }
    ]
  },
  {
    id: "io",
    title: "3. Input & Output (cin and cout)",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "C++ uses a stream concept for I/O. \`cout\` stands for Character Output, and \`cin\` stands for Character Input."
      },
      {
        type: "code",
        title: "Streaming Data",
        code: \`#include <iostream>
using namespace std; 

int main() {
    string username;
    cout << "Enter your name: "; 
    cin >> username; 
    cout << "Hello " << username << endl;
    return 0;
}\`
      }
    ]
  },
  {
    id: "operators",
    title: "4. Operators",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Operators let you perform mathematical and logical calculations."
      },
      {
        type: "code",
        title: "Math and Logic",
        code: \`int a = 10;
int b = 3;

cout << a / b; // 3 (Integer division chops off the decimal!)
cout << a % b; // 1 (Modulo: Returns the remainder of division)\`
      }
    ]
  },
  {
    id: "controlflow",
    title: "5. Control Flow (If-Else & Switch)",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "Control flow dictates which blocks of code execute based on specific conditions. C++ uses curly braces \`{}\` to group blocks of code."
      },
      {
        type: "code",
        title: "If and Switch",
        code: \`int speed = 75;

if (speed > 80) {
    cout << "Reckless driving ticket!";
} else if (speed > 65) {
    cout << "Speeding ticket!";
} else {
    cout << "Safe driving.";
}\`
      }
    ]
  },
  {
    id: "loops",
    title: "6. Loops (For, While, Do-While)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "Loops allow you to run the same code multiple times automatically."
      },
      {
        type: "code",
        title: "The Three Loops",
        code: \`for (int i = 0; i < 5; i++) {
    cout << "Count: " << i << "\\\\n";
}

int hp = 100;
while (hp > 0) {
    hp -= 20;
}\`
      }
    ]
  },
  {
    id: "arrays",
    title: "7. Arrays",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "An array is a collection of variables of the SAME data type, stored right next to each other in memory. The size of a standard array is fixed and cannot grow."
      },
      {
        type: "code",
        title: "Standard Arrays",
        code: \`int scores[5] = {95, 82, 70, 100, 88};
cout << scores[0]; // Prints 95
scores[2] = 75; // Changes the 70 to a 75\`
      }
    ]
  },
  
  // --- HIGHLY DETAILED TOPICS 8-18 WITH EXPLICIT SUBTOPICS ---
  
  {
    id: "functions",
    title: "8. Functions Deep Dive",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: FUNCTION ANATOMY\\nFunctions break your program into small, reusable blocks. A function in C++ requires a strict Return Type (e.g., int, double). If it returns nothing, its type must be void.\\n\\nSUBTOPIC 2: FUNCTION PROTOTYPES\\nIn C++, the compiler reads code from top to bottom. If \`main()\` tries to use a function that hasn't been defined yet, it will crash. To solve this, we use Prototypes (declaring the function at the top, but writing the code at the bottom).\\n\\nSUBTOPIC 3: FUNCTION OVERLOADING\\nYou can have multiple functions with the EXACT SAME NAME, as long as they take different inputs. C++ automatically figures out which one to call based on the arguments you pass!"
      },
      {
        type: "code",
        title: "Prototypes & Overloading Implementation",
        code: \`#include <iostream>
using namespace std;

// Prototypes (Promises to the compiler)
int add(int a, int b); 
double add(double a, double b); 

int main() {
    cout << add(5, 10) << "\\\\n";      // Calls the integer version (15)
    cout << add(3.5, 2.1) << "\\\\n";   // Calls the double version (5.6)
    return 0;
}

// Actual Logic
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }\`
      }
    ]
  },
  {
    id: "pointers",
    title: "9. Pointers (The Core of C++)",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: MEMORY ADDRESSES\\nMemory is like a massive street of houses. Every house has an exact Address (like 0x7ffe4). A Pointer is simply a variable that stores one of these Addresses instead of a normal value.\\n\\nSUBTOPIC 2: THE '&' AND '*' OPERATORS\\n- The '&' (Address-Of) operator grabs the physical memory location of a variable.\\n- The '*' (Dereference) operator tells C++ to follow the address inside the pointer, and access the actual data stored at that location.\\n\\nSUBTOPIC 3: WHY USE POINTERS?\\nIf you have a massive 1GB 3D model, passing it normally copies all 1GB of data, slowing down the game. Passing a pointer just copies the 8-byte address of where the model lives!"
      },
      {
        type: "code",
        title: "Dereferencing and Manipulation",
        code: \`#include <iostream>
using namespace std;

int main() {
    int ammo = 30;

    // ptr now holds the ADDRESS of ammo
    int* ptr = &ammo; 

    cout << "Value of ammo: " << ammo << "\\\\n";      // 30
    cout << "Address of ammo: " << &ammo << "\\\\n";    // e.g., 0x5a9f
    cout << "Value of ptr: " << ptr << "\\\\n";         // 0x5a9f

    // We change the original variable THROUGH the pointer!
    *ptr = 15;
    cout << "New ammo value: " << ammo << "\\\\n";  // Now prints 15!
    return 0;
}\`
      }
    ]
  },
  {
    id: "references",
    title: "10. References (Pass-by-value vs Reference)",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: WHAT IS A REFERENCE?\\nPointers are powerful but their syntax can get messy. C++ introduced References (&) as a cleaner alternative. A reference is simply an alias (a permanent nickname) for an existing variable.\\n\\nSUBTOPIC 2: PASS-BY-VALUE\\nBy default, passing a variable to a function creates a complete clone. Modifying the clone does NOT change the original variable. This is safe but wastes memory for large objects.\\n\\nSUBTOPIC 3: PASS-BY-REFERENCE\\nBy adding an '&' to the function parameter, you pass the actual original variable. This is extremely fast and allows the function to directly modify the original data.\\n\\nSUBTOPIC 4: PASS-BY-CONST-REFERENCE\\nBy adding 'const &', you pass the original variable (fast) but lock it so the function CANNOT modify it (safe). This is the gold standard for reading large data."
      },
      {
        type: "code",
        title: "The Three Ways to Pass Data",
        code: \`#include <iostream>
#include <string>
using namespace std;

// 1. Pass-By-Value (Makes a clone)
void healClone(int health) { health = 100; }

// 2. Pass-By-Reference (Uses original memory)
void healReal(int& health) { health = 100; }

// 3. Pass-By-Const-Reference (Uses original, but read-only)
void readName(const string& name) {
    cout << "Player name: " << name << "\\\\n";
    // name = "Hacked"; // ERROR! The compiler will stop you.
}

int main() {
    int myHealth = 10;
    
    healClone(myHealth); // Health is still 10!
    healReal(myHealth);  // Health is now 100!
    
    return 0;
}\`
      }
    ]
  },
  {
    id: "dynamicmemory",
    title: "11. Dynamic Memory Management (new and delete)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: THE STACK VS THE HEAP\\nThere are two main areas of memory:\\n- The Stack: Small, fast, and automatically deletes variables when a function ends.\\n- The Heap: Massive (uses all RAM). Variables here stay alive forever until you manually delete them.\\n\\nSUBTOPIC 2: ALLOCATING MEMORY (new)\\nIf you need a massive array, you MUST use the Heap. You use the 'new' keyword to request memory from the Operating System. It returns a pointer to that memory.\\n\\nSUBTOPIC 3: FREEING MEMORY (delete) & LEAKS\\nYou must use 'delete' to return the memory when you are done. If you forget, the memory stays locked forever (a Memory Leak). If this happens in a game loop, it will consume all your RAM and crash your PC!"
      },
      {
        type: "code",
        title: "Managing the Heap",
        code: \`#include <iostream>
using namespace std;

int main() {
    // 1. Requesting memory on the Heap
    int* bossHealth = new int;
    
    *bossHealth = 10000;
    cout << "Boss has " << *bossHealth << " HP\\\\n";

    // 2. CRITICAL: You MUST free the memory!
    delete bossHealth; 
    
    // 3. Prevent Dangling Pointers
    bossHealth = nullptr;
    
    return 0;
}\`
      }
    ]
  },
  {
    id: "oop1",
    title: "12. OOP I: Classes, Objects & The Rule of Three",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: CLASSES AND OBJECTS\\nObject-Oriented Programming (OOP) groups data and functions into a single entity. A Class is the blueprint (e.g., 'Car'). An Object is the physical instance (e.g., 'My Red Toyota').\\n\\nSUBTOPIC 2: CONSTRUCTORS AND DESTRUCTORS\\n- Constructor: Runs automatically when an object is created to set up its starting data.\\n- Destructor (~): Runs automatically when an object dies (goes out of scope). This is where you put your 'delete' statements to clean up Heap memory!\\n\\nSUBTOPIC 3: THE RULE OF THREE\\nIf your class manages dynamic memory on the Heap, you must implement three things to prevent double-deletion crashes: A Destructor, a Copy Constructor, and a Copy Assignment Operator."
      },
      {
        type: "code",
        title: "Constructors and Destructors",
        code: \`#include <iostream>
#include <string>
using namespace std;

class Player {
public: 
    string name;
    int* score; // A pointer to heap memory

    // Constructor
    Player(string n) {
        name = n;
        score = new int(0); // Allocate on the heap
        cout << name << " spawned!\\\\n";
    }

    // Destructor (Notice the tilde)
    ~Player() {
        delete score; // Prevent memory leaks automatically!
        cout << name << " disconnected. Memory freed.\\\\n";
    }
};

int main() {
    { // Artificial scope block
        Player p1("Arthur"); 
    } // 'p1' dies here, triggering the Destructor automatically!
    return 0;
}\`
      }
    ]
  },
  {
    id: "oop2",
    title: "13. OOP II: Encapsulation (Hiding Data)",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: THE DANGER OF PUBLIC DATA\\nIf an object's variables are public, anyone can write \`player.health = -9999\`. This is a massive security and bug risk. You cannot trust outside code to modify your object safely.\\n\\nSUBTOPIC 2: PRIVATE AND GETTERS/SETTERS\\nEncapsulation solves this by making data 'private'. Outside code cannot touch it directly. Instead, you provide 'public' methods (Getters and Setters). The Setter method can contain IF statements to verify the data (e.g., \`if (amount > 0)\`) before actually modifying the private variable."
      },
      {
        type: "code",
        title: "Secure Bank Account",
        code: \`#include <iostream>
using namespace std;

class BankAccount {
private:
    double balance; // HIDDEN! Cannot be touched directly

public:
    BankAccount() { balance = 0.0; }

    // Setter (Controls EXACTLY HOW the data is modified)
    void deposit(double amount) {
        if (amount > 0) { // Security check!
            balance += amount;
        } else {
            cout << "Error: Cannot deposit negative money!\\\\n";
        }
    }

    // Getter (Allows secure viewing of data)
    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount myAcct;
    // myAcct.balance = 1000000; // ERROR! balance is private!
    
    myAcct.deposit(500);
    myAcct.deposit(-100); // Thwarted by our security check!
    
    cout << "Balance: $" << myAcct.getBalance() << "\\\\n"; // $500
    return 0;
}\`
      }
    ]
  },
  {
    id: "oop3",
    title: "14. OOP III: Inheritance",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: PARENT AND CHILD CLASSES\\nInheritance allows a new 'Child' class to copy all attributes and methods from an existing 'Parent' class. For example, a Warrior and a Mage both inherit health and movement from a generic Character class.\\n\\nSUBTOPIC 2: PROTECTED ACCESS\\nWhile 'private' data is completely hidden, 'protected' data is hidden from the outside world, but fully accessible to Child classes. This allows the Warrior to freely modify its inherited health variable."
      },
      {
        type: "code",
        title: "Code Reuse via Inheritance",
        code: \`#include <iostream>
using namespace std;

// 1. Base Class (Parent)
class Character {
protected: 
    int health = 100; // Accessible to children!
    
public:
    void takeDamage(int dmg) {
        health -= dmg;
        cout << "Took " << dmg << " damage. HP: " << health << "\\\\n";
    }
};

// 2. Derived Class (Child)
class Warrior : public Character {
public:
    void useShield() {
        cout << "Shield raised! Defense increased.\\\\n";
        health += 10; // Can access protected data!
    }
};

int main() {
    Warrior arthur;
    arthur.takeDamage(20); // Inherited from Character
    arthur.useShield();    // Unique to Warrior
    return 0;
}\`
      }
    ]
  },
  {
    id: "oop4",
    title: "15. OOP IV: Polymorphism & Virtual Functions",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: POLYMORPHISM ('MANY FORMS')\\nPolymorphism allows a Child class to override a Parent's method with its own custom implementation. It allows you to store many different Child objects inside an array of Parent pointers, and trigger the correct behavior for all of them using a single loop.\\n\\nSUBTOPIC 2: VIRTUAL TABLES (VTABLES)\\nTo enable this, you use the 'virtual' keyword. Under the hood, this creates a hidden Virtual Table (vtable). When you call a virtual function, C++ looks at the vtable during runtime (Dynamic Dispatch) to figure out if it should execute the Parent's version or the Child's version."
      },
      {
        type: "code",
        title: "Dynamic Dispatch in Action",
        code: \`#include <iostream>
using namespace std;

class Animal {
public:
    // 'virtual' enables the vtable lookup
    virtual void makeSound() { 
        cout << "Generic sound\\\\n";
    }
    virtual ~Animal() {} // Always use a virtual destructor!
};

class Dog : public Animal {
public:
    void makeSound() override {
        cout << "Woof! Woof!\\\\n";
    }
};

class Cat : public Animal {
public:
    void makeSound() override {
        cout << "Meow!\\\\n";
    }
};

int main() {
    // Array of PARENT pointers storing CHILD objects!
    Animal* pets[2];
    pets[0] = new Dog();
    pets[1] = new Cat();
    
    for(int i = 0; i < 2; i++) {
        // C++ uses the vtable to dynamically pick the correct sound!
        pets[i]->makeSound(); 
        delete pets[i];
    }
    return 0;
}\`
      }
    ]
  },
  {
    id: "stl",
    title: "16. The Standard Template Library (STL)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: WHAT IS THE STL?\\nThe STL is a massive collection of powerful, pre-built data structures (Containers) and algorithms. It saves you from writing complex arrays and linked lists from scratch.\\n\\nSUBTOPIC 2: STD::VECTOR (DYNAMIC ARRAY)\\nA vector is an array that can grow. Under the hood, it allocates a contiguous block of memory. When it fills up, it allocates a NEW, larger block, copies everything over, and deletes the old block. This is called 'Reallocation'.\\n\\nSUBTOPIC 3: STD::MAP (DICTIONARY)\\nA map stores Key-Value pairs. It is implemented as a Red-Black Tree, meaning it is perfectly balanced and extremely fast for lookups (O(log n) time)."
      },
      {
        type: "code",
        title: "Vectors and Maps",
        code: \`#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    // --- VECTORS ---
    vector<string> inventory;

    inventory.push_back("Sword");
    inventory.push_back("Shield");

    cout << "Inventory contains:\\\\n";
    for (const string& item : inventory) {
        cout << "- " << item << "\\\\n";
    }

    // --- MAPS ---
    map<string, int> highScores;
    highScores["Alice"] = 9500;
    highScores["Bob"] = 8200;
    
    // Fast O(log n) lookup
    cout << "\\\\nAlice's Score: " << highScores["Alice"] << "\\\\n";
    return 0;
}\`
      }
    ]
  },
  {
    id: "exceptions",
    title: "17. Exception Handling",
    icon: "AlertTriangle",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: PREVENTING FATAL CRASHES\\nExceptions prevent your program from crashing by 'catching' runtime errors gracefully. If an error occurs deeply nested inside a function, instead of crashing the app, it 'throws' an exception up to the main loop where it can be handled safely.\\n\\nSUBTOPIC 2: TRY, CATCH, THROW\\n- try: You wrap risky code inside a try block.\\n- throw: If your logic detects an error (like dividing by zero), you throw an exception object.\\n- catch: The program instantly abandons the try block and jumps to the catch block to run emergency fallback code."
      },
      {
        type: "code",
        title: "Handling Division by Zero",
        code: \`#include <iostream>
#include <stdexcept> 
using namespace std;

double divide(double a, double b) {
    if (b == 0) {
        // Manually 'throw' an error to stop execution instantly
        throw invalid_argument("Division by zero is mathematically impossible!");
    }
    return a / b;
}

int main() {
    try {
        cout << divide(10, 2) << "\\\\n"; // Works fine
        cout << divide(10, 0) << "\\\\n"; // THROWS AN ERROR!
        cout << "This line will NEVER print.";
    } 
    catch (const exception& e) {
        // Jumps here instead of crashing
        cout << "CRITICAL ERROR CAUGHT: " << e.what() << "\\\\n";
    }
    return 0;
}\`
      }
    ]
  },
  {
    id: "modern",
    title: "18. Modern C++ Features (Smart Pointers)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: THE DANGER OF RAW POINTERS\\nManual memory management using 'new' and 'delete' causes massive bugs. If a developer forgets to call delete, or if the program throws an Exception before it reaches delete, the memory is leaked forever.\\n\\nSUBTOPIC 2: STD::UNIQUE_PTR\\nModern C++ introduced 'Smart Pointers'. A unique_ptr wraps your heap memory inside a stack object. Because it lives on the stack, it is automatically destroyed when it goes out of scope, triggering it to delete the heap memory for you automatically!\\n\\nSUBTOPIC 3: STD::MOVE\\nA unique_ptr CANNOT be copied (this prevents double-deletion crashes). If you want to transfer ownership of the pointer to another function, you must use std::move."
      },
      {
        type: "code",
        title: "Zero-Leak Smart Pointers",
        code: \`#include <iostream>
#include <memory> 
using namespace std;

class Robot {
public:
    Robot() { cout << "Robot Built\\\\n"; }
    ~Robot() { cout << "Robot Destroyed\\\\n"; }
    void attack() { cout << "Laser fired!\\\\n"; }
};

int main() {
    { // Artificial scope block
    
        // 1. make_unique safely allocates Heap memory.
        // You do NOT use 'new' or 'delete' anywhere!
        unique_ptr<Robot> myBot = make_unique<Robot>();
        myBot->attack(); 
        
        // 2. unique_ptr CANNOT be copied.
        // unique_ptr<Robot> clone = myBot; // ERROR!
        
        // 3. You must 'move' ownership to transfer it:
        unique_ptr<Robot> newOwner = std::move(myBot);
        
    } // End of scope block. 'newOwner' is automatically destroyed here.
      // The Robot destructor fires instantly! No memory leaks!
      
    return 0;
}\`
      }
    ]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'cpp_notes.js'), cppNotes);
console.log("Updated cpp_notes.js successfully!");
