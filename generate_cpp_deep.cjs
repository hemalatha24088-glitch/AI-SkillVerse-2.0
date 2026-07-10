const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const topics = [
  {
    title: "1. The C++ Compilation Model & Memory Architecture",
    explanation: `Unlike interpreted languages (like Python or JavaScript), C++ is a compiled language. When you write C++ code, the CPU cannot understand it directly. 
    
**The 4-Step Build Process:**
1. **Preprocessing:** The compiler resolves all \`#include\` directives. It literally copies and pastes the contents of header files (like \`<iostream>\`) into your code.
2. **Compilation:** The compiler translates your human-readable C++ code into Assembly Language.
3. **Assembly:** The assembler translates the Assembly Language into pure Machine Code (Object files ending in \`.o\` or \`.obj\`).
4. **Linking:** The linker connects your object files with the C++ Standard Library to produce the final executable (\`.exe\`).

**Memory Architecture (The Stack vs. The Heap):**
- **The Stack:** Very fast memory used for local variables. It is small and automatically cleans itself up when a function finishes.
- **The Heap:** Massive memory pool used for dynamic data. You must manually request memory here (using \`new\`) and manually delete it (using \`delete\`).`,
    code: `// example.cpp
#include <iostream>

// This is a global variable, stored in the Data Segment, not the Stack/Heap
int global_counter = 0; 

int main() {
    // 'local_var' is stored on the Stack. It is fast but temporary.
    int local_var = 42; 
    
    // We are requesting memory on the Heap for an integer.
    // 'heap_ptr' itself is on the Stack, but it POINTS to the Heap memory.
    int* heap_ptr = new int(100); 
    
    std::cout << "Stack Value: " << local_var << "\\n";
    std::cout << "Heap Value: " << *heap_ptr << "\\n";
    
    // WE MUST CLEAN UP THE HEAP!
    delete heap_ptr; 
    
    return 0;
}`
  },
  {
    title: "2. Deep Dive: Variables, Data Types, & Qualifiers",
    explanation: `C++ gives you extreme granular control over data types to optimize memory usage.

**Integer Types:**
- \`short\` (2 bytes): -32,768 to 32,767
- \`int\` (4 bytes): -2 Billion to 2 Billion
- \`long long\` (8 bytes): Massive numbers

**Floating Point Types:**
- \`float\` (4 bytes): 7 decimal digits of precision (Requires 'f' suffix, e.g., 3.14f)
- \`double\` (8 bytes): 15 decimal digits of precision (The standard for decimals)

**Qualifiers:**
- \`unsigned\`: Disallows negative numbers, but doubles the positive maximum capacity.
- \`const\`: Makes the variable completely immutable.
- \`constexpr\`: Like const, but forces the compiler to evaluate the value AT COMPILE TIME, making the program run faster.`,
    code: `#include <iostream>
using namespace std;

int main() {
    // Standard types
    int standard_int = -2147483648; 
    
    // Unsigned allows only positive, doubling the max limit to 4.2 Billion
    unsigned int positive_only = 4000000000; 
    
    // Const makes it read-only
    const double GRAVITY = 9.81;
    
    // Constexpr is evaluated during compilation for maximum speed
    constexpr int SECONDS_IN_HOUR = 60 * 60;
    
    // 'auto' tells the compiler to guess the type (it will guess double)
    auto price = 19.99; 
    
    cout << "Gravity is: " << GRAVITY << "\\n";
    cout << "Seconds in hour: " << SECONDS_IN_HOUR << "\\n";
    
    return 0;
}`
  },
  {
    title: "3. Advanced Pointers & Pointer Arithmetic",
    explanation: `A pointer is just a variable that holds a memory address. 
    
**Why use pointers?**
1. **Performance:** Passing a massive 1GB object to a function copies it by default. Passing a pointer to that object copies a tiny 8-byte address.
2. **Dynamic Memory:** You cannot use the Heap without pointers.
3. **Hardware Access:** In embedded systems, you use pointers to directly flip bits on physical hardware components.

**Pointer Arithmetic:**
Because arrays are stored contiguously in memory, you can perform math on pointers to navigate through them. If an \`int\` is 4 bytes, doing \`ptr + 1\` actually moves the address forward by exactly 4 bytes to hit the next integer!`,
    code: `#include <iostream>
using namespace std;

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    
    // The name of an array acts exactly like a pointer to its first element!
    int* ptr = arr; 
    
    cout << "Address of arr[0]: " << ptr << "\\n";
    cout << "Value at arr[0]: " << *ptr << "\\n\\n"; // Dereference gets '10'
    
    // Pointer Arithmetic
    ptr++; // Moves the pointer to the NEXT integer in memory
    
    cout << "Address of arr[1]: " << ptr << "\\n";
    cout << "Value at arr[1]: " << *ptr << "\\n\\n"; // Dereference gets '20'
    
    // We can jump ahead completely
    ptr = ptr + 2; 
    cout << "Value at arr[3]: " << *ptr << "\\n"; // Gets '40'
    
    return 0;
}`
  },
  {
    title: "4. Pass-By-Value vs. Pass-By-Reference",
    explanation: `When passing variables to functions, C++ gives you three options:

1. **Pass-By-Value:** Makes a complete clone of the variable. Safe, but extremely slow for large objects (like vectors or strings). The original variable is completely untouched.
2. **Pass-By-Reference (&):** Passes the actual original variable into the function using an alias. Extremely fast, and allows the function to modify the original variable.
3. **Pass-By-Const-Reference (const &):** The ultimate optimization. It passes the original variable (fast, no copying), but locks it so the function CANNOT modify it (safe).`,
    code: `#include <iostream>
#include <string>
using namespace std;

// 1. Pass-By-Value (Copies the string. Slow and memory intensive)
void modifyValue(string text) {
    text = "Hacked!"; // Only modifies the local copy
}

// 2. Pass-By-Reference (Passes the original. Fast and allows modification)
void modifyReference(string& text) {
    text = "Hacked!"; // Modifies the original string!
}

// 3. Pass-By-Const-Reference (Passes the original, but read-only. Fast and Safe)
void readOnly(const string& text) {
    cout << "Reading securely: " << text << "\\n";
    // text = "Hacked!"; // ERROR! Compiler prevents modification.
}

int main() {
    string myPassword = "SecretPassword123";
    
    modifyValue(myPassword);
    cout << "After Pass-By-Value: " << myPassword << "\\n"; // Unchanged
    
    readOnly(myPassword); // Fast and secure reading
    
    modifyReference(myPassword);
    cout << "After Pass-By-Reference: " << myPassword << "\\n"; // Altered to "Hacked!"
    
    return 0;
}`
  },
  {
    title: "5. Object-Oriented Programming (Classes & The Big Three)",
    explanation: `Classes are blueprints for creating objects. C++ requires strict memory management inside classes.

**Constructors & Destructors:**
- **Constructor:** Runs automatically when the object is created to set up data.
- **Destructor (~):** Runs automatically when the object goes out of scope. Used to \`delete\` any dynamic memory the object allocated.

**The "Rule of Three":**
If your class allocates dynamic memory on the Heap using pointers, you MUST implement three things to prevent crashes:
1. A Destructor (to free memory).
2. A Copy Constructor (to safely clone objects).
3. A Copy Assignment Operator (to safely set one object equal to another).`,
    code: `#include <iostream>
using namespace std;

class Database {
private:
    int* data; // Pointer pointing to Heap memory
    
public:
    // 1. Constructor
    Database(int value) {
        data = new int(value); // Allocates Heap memory
        cout << "Database created with value " << *data << "\\n";
    }
    
    // 2. Destructor
    ~Database() {
        delete data; // CRITICAL: Frees the Heap memory!
        cout << "Database destroyed, memory freed.\\n";
    }
    
    // Method
    void updateData(int newValue) {
        *data = newValue;
    }
    
    void printData() const {
        cout << "Data: " << *data << "\\n";
    }
};

int main() {
    { // Create an artificial scope block
        Database db(100);
        db.updateData(500);
        db.printData();
    } // As soon as we hit this bracket, 'db' goes out of scope. The Destructor runs AUTOMATICALLY!
    
    cout << "Program finished.\\n";
    return 0;
}`
  },
  {
    title: "6. Polymorphism & Virtual Tables (vtable)",
    explanation: `Polymorphism means "many forms". It allows you to call a method on a Parent class, and have it automatically route to the correct Child class's overridden method.

**How it works under the hood:**
When you mark a method as \`virtual\`, C++ creates a hidden "vtable" (Virtual Table) for the class. This table is essentially a hidden array of function pointers. When you call the method at runtime, C++ looks up the vtable to figure out exactly which child's method it should execute. This is called "Dynamic Dispatch".`,
    code: `#include <iostream>
using namespace std;

// Base Class
class Enemy {
public:
    // 'virtual' enables Polymorphism. It tells the compiler to use the vtable.
    virtual void attack() {
        cout << "Enemy attacks for 10 damage.\\n";
    }
    
    // Virtual destructor is REQUIRED when using virtual functions to prevent memory leaks!
    virtual ~Enemy() {} 
};

// Derived Class 1
class Orc : public Enemy {
public:
    // 'override' ensures we are actually overriding a parent method
    void attack() override {
        cout << "Orc SMASHES for 50 damage!\\n";
    }
};

// Derived Class 2
class Archer : public Enemy {
public:
    void attack() override {
        cout << "Archer shoots an arrow for 15 damage!\\n";
    }
};

int main() {
    // We can store different child classes in a Parent pointer!
    Enemy* currentEnemy = new Orc();
    
    // Because of 'virtual', this calls the ORC's attack, not the generic Enemy attack!
    currentEnemy->attack(); 
    delete currentEnemy;
    
    currentEnemy = new Archer();
    currentEnemy->attack(); // Calls the ARCHER's attack
    delete currentEnemy;
    
    return 0;
}`
  },
  {
    title: "7. The Standard Template Library (STL) - Vectors & Maps",
    explanation: `The STL is a massive collection of template classes and algorithms. 

**std::vector (Dynamic Array):**
Unlike standard arrays, vectors can grow. Under the hood, a vector allocates a block of contiguous memory. When it fills up, it automatically allocates a NEW, larger block of memory, copies everything over, and deletes the old block. This is called "Reallocation".

**std::map (Dictionary/Hash Table):**
Maps store Key-Value pairs. Under the hood, \`std::map\` is implemented as a Red-Black Tree (O(log n) lookup time). If you need O(1) instantaneous lookup time, use \`std::unordered_map\` (implemented as a Hash Table).`,
    code: `#include <iostream>
#include <vector>
#include <map>
using namespace std;

int main() {
    // --- VECTORS ---
    cout << "--- VECTORS ---\\n";
    vector<int> numbers;
    
    cout << "Capacity: " << numbers.capacity() << "\\n"; // 0
    numbers.push_back(10);
    numbers.push_back(20);
    numbers.push_back(30);
    cout << "Capacity after adding 3 items: " << numbers.capacity() << "\\n"; 
    // Capacity might be 4! Vectors double in size when they run out of room.
    
    for (int num : numbers) {
        cout << num << " ";
    }
    cout << "\\n\\n";
    
    // --- MAPS ---
    cout << "--- MAPS ---\\n";
    map<string, int> ageDatabase;
    
    ageDatabase["Alice"] = 25; // Insertion
    ageDatabase["Bob"] = 30;
    
    // Searching safely
    if (ageDatabase.find("Charlie") == ageDatabase.end()) {
        cout << "Charlie is not in the database.\\n";
    }
    
    for (const auto& pair : ageDatabase) {
        cout << pair.first << " is " << pair.second << " years old.\\n";
    }
    
    return 0;
}`
  },
  {
    title: "8. Modern C++: Smart Pointers (No more Memory Leaks!)",
    explanation: `Manual memory management using \`new\` and \`delete\` causes massive bugs. What if the program crashes before it reaches the \`delete\` statement? The memory is leaked forever.

**C++11 introduced Smart Pointers (\`<memory>\` library):**
1. **\`std::unique_ptr\`**: Owns the memory exclusively. When the unique_ptr goes out of scope, it AUTOMATICALLY deletes the memory. It has zero performance overhead compared to raw pointers.
2. **\`std::shared_ptr\`**: Owns memory shared among multiple pointers. It keeps a "Reference Count". When the count drops to 0, it automatically deletes the memory.`,
    code: `#include <iostream>
#include <memory>
using namespace std;

class Player {
public:
    Player() { cout << "Player spawned.\\n"; }
    ~Player() { cout << "Player destroyed.\\n"; }
    void shoot() { cout << "Pew pew!\\n"; }
};

int main() {
    cout << "Entering scope...\\n";
    {
        // make_unique safely allocates Heap memory and wraps it in a Smart Pointer
        unique_ptr<Player> p1 = make_unique<Player>();
        
        p1->shoot();
        
        // unique_ptr CANNOT be copied! The following line would cause an error:
        // unique_ptr<Player> p2 = p1; 
        
        // You MUST 'move' ownership if you want to transfer it:
        unique_ptr<Player> p3 = std::move(p1); 
        
    } // We hit the end of the scope block. 
      // The smart pointer is automatically destroyed, triggering the Player destructor!
      
    cout << "Left scope. No memory leaks!\\n";
    
    return 0;
}`
  }
];

let mdContent = "# C++: The Ultimate Master Guide (Deep Dive)\n\n";
mdContent += "This guide provides extensive, detailed explanations and under-the-hood analysis for the most critical C++ concepts. It is designed for developers who want to understand exactly how C++ interacts with memory and hardware.\n\n---\n\n";

topics.forEach(topic => {
  mdContent += "## " + topic.title + "\n\n";
  mdContent += topic.explanation + "\n\n";
  mdContent += "**Code Implementation:**\n";
  mdContent += "```cpp\n" + topic.code + "\n```\n\n---\n\n";
});

mdContent += "*Generated by AI SkillVerse Learning Platform*";

const mdPath = path.join(__dirname, 'Cpp_Ultimate_Master_Guide.md');
fs.writeFileSync(mdPath, mdContent);

console.log("Written Markdown to " + mdPath);

try {
  console.log("Converting to PDF...");
  execSync('npx -y md-to-pdf "' + mdPath + '"', { stdio: 'inherit' });
  console.log("PDF generation successful!");
} catch (err) {
  console.error("Failed to generate PDF.", err.message);
}
