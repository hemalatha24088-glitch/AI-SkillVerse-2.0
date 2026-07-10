export const cNotesData = [
  {
    id: "intro",
    title: "1. Introduction to C",
    icon: "BookOpen",
    content: [
      {
        type: "paragraph",
        text: "C is one of the oldest and most powerful programming languages in the world. Created in the early 1970s by Dennis Ritchie at Bell Labs, C became the foundation for nearly every modern language — C++, Java, Python, and many more are all influenced by C."
      },
      {
        type: "tip",
        text: "C is like learning to drive a manual (stick-shift) car. It's harder at first, but once you master it, you truly understand how a car works. High-level languages (Python, Java) are automatic cars — easier to use but you're less in control."
      },
      {
        type: "paragraph",
        text: "Why Learn C?\n• Speed: C programs run extremely fast — close to machine code\n• Control: You manage memory yourself — full control over the computer\n• Foundation: Operating systems, databases, and compilers are written in C\n• Embedded Systems: Microcontrollers and hardware use C"
      },
      {
        type: "code",
        title: "Your First C Program",
        code: `#include <stdio.h> // Include the standard input/output library

int main(void) { // Every C program starts from main()
    // 'int' means this function returns a number
    // 'void' means it takes no parameters
    printf("Hello, World!\\n"); // Print text to the screen
    return 0; // Return 0 to the OS (means: success!)
}`
      },
      {
        type: "code",
        title: "Compiling & Running",
        code: `# Save your file as hello.c, then in the terminal:
gcc hello.c -o hello # Compile: creates 'hello' executable
./hello # Run it
# Output: Hello, World!

# With helpful warnings enabled (recommended always):
gcc -Wall -Wextra -std=c11 hello.c -o hello`
      }
    ]
  },
  {
    id: "datatypes",
    title: "2. Data Types & Variables",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A variable is a named box in your computer's memory where you store a value. A data type tells the computer what kind of value goes in the box — a number, a letter, a decimal, etc."
      },
      {
        type: "tip",
        text: "Think of variables like labeled jars. An 'int jar' can hold whole numbers. A 'float jar' holds decimals. A 'char jar' holds a single letter. You must use the right jar for the right thing!"
      },
      {
        type: "code",
        title: "Declaring and Using Variables",
        code: `// DECLARATION: telling the computer "I need a box of this type"
int age; // Box created but EMPTY (dangerous — undefined value!)

// INITIALIZATION: giving the box a value
int age = 25; // Declare AND initialize (do this always!)

// EXAMPLES
char grade = 'A'; // Single quotes for characters
int score = 95;
float gpa = 3.85f; // 'f' suffix for float literals
double salary = 75000.50; // double is more precise than float
long pop = 1400000000L; // 'L' suffix for long

// PRINTING VARIABLES
printf("Age: %d\\n", age); // %d for integers
printf("GPA: %.2f\\n", gpa); // %.2f for float, 2 decimal places
printf("Grade: %c\\n", grade); // %c for characters
printf("Salary: %.2lf\\n", salary); // %lf for double`
      },
      {
        type: "code",
        title: "Constants — Values That Never Change",
        code: `// Method 1: const keyword (PREFERRED — type-safe)
const double PI = 3.14159265;
const int MAX_STUDENTS = 100;

// Method 2: #define preprocessor macro
#define GRAVITY 9.81
#define APP_NAME "MyApp"`
      },
      {
        type: "warning",
        text: "Never modify a const variable. The compiler will give you an error. This is a feature — it protects important values."
      }
    ]
  },
  {
    id: "operators",
    title: "3. Operators & Expressions",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Operators are symbols that perform operations on values. Think of them like actions — add, compare, decide."
      },
      {
        type: "code",
        title: "Arithmetic Operators",
        code: `int a = 17, b = 5;
printf("%d\\n", a + b); // 22 — Addition
printf("%d\\n", a - b); // 12 — Subtraction
printf("%d\\n", a * b); // 85 — Multiplication
printf("%d\\n", a / b); // 3 — Division (INTEGER division — drops decimal!)
printf("%d\\n", a % b); // 2 — Modulo (remainder after division)

// IMPORTANT: Integer division drops the decimal part
int result = 7 / 2; // result = 3, NOT 3.5!
double result2 = 7.0 / 2; // result2 = 3.5 (use .0 to force decimal division)`
      },
      {
        type: "warning",
        text: "7 / 2 gives 3 in C, not 3.5! To get 3.5, write 7.0 / 2 or (double)7 / 2. This trips up almost every beginner."
      },
      {
        type: "code",
        title: "Increment, Decrement & Logical Operators",
        code: `int x = 5;
x++; // POST-increment: use x first, then add 1
++x; // PRE-increment: add 1 first, then use x

int age = 20, score = 85;
// && means AND — BOTH must be true
if (age >= 18 && score >= 60) {
    printf("Eligible!\\n");
}

// || means OR — AT LEAST ONE must be true
if (age < 5 || age > 65) {
    printf("Special ticket price\\n");
}`
      },
      {
        type: "tip",
        text: "The ternary operator is like asking a question and picking one of two answers: int max = (a > b) ? a : b; (Is 'a' greater than 'b'? Yes -> a. No -> b.)"
      }
    ]
  },
  {
    id: "controlflow",
    title: "4. Control Flow",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "Control flow lets your program make decisions and repeat actions. Without it, every program would just run top-to-bottom once and stop."
      },
      {
        type: "code",
        title: "Decision Making (if / else if / else / switch)",
        code: `int score = 75;
if (score >= 90) {
    printf("Grade: A\\n");
} else if (score >= 80) {
    printf("Grade: B\\n");
} else {
    printf("Grade: C or below\\n");
}

int day = 3;
switch (day) {
    case 1: printf("Monday\\n"); break;
    case 2: printf("Tuesday\\n"); break;
    // IMPORTANT: break stops here, otherwise falls to next case!
    default: printf("Other day\\n");
}`
      },
      {
        type: "code",
        title: "Loops (while / do-while / for)",
        code: `// while Loop (Condition checked BEFORE)
int i = 1;
while (i <= 5) {
    printf("%d ", i);
    i++; // MUST increment or you get an infinite loop!
}

// do-while Loop (Runs AT LEAST ONCE)
int choice;
do {
    printf("Menu: 1) Play 2) Quit\\nYour choice: ");
    scanf("%d", &choice);
} while (choice != 1 && choice != 2);

// for Loop (Repeat a Set Number of Times)
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}`
      }
    ]
  },
  {
    id: "functions",
    title: "5. Functions",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "A function is a named block of code that does one specific job. You write it once, then call it as many times as you need. Functions make programs organized, readable, and reusable."
      },
      {
        type: "tip",
        text: "Functions are like recipes. A 'make_coffee()' recipe always makes coffee when you follow it. You don't rewrite the recipe each time — you just say 'make coffee please!'"
      },
      {
        type: "code",
        title: "Creating and Calling a Function",
        code: `// STEP 1: Declaration (prototype)
int add(int a, int b); // Returns int, takes two ints

// STEP 2: Call the function
int main(void) {
    int result = add(3, 7); 
    printf("3 + 7 = %d\\n", result);
    return 0;
}

// STEP 3: Definition
int add(int a, int b) { 
    return a + b; 
}`
      },
      {
        type: "code",
        title: "Pass by Value vs Pass by Reference",
        code: `// PASS BY VALUE: function gets a COPY
void double_it(int x) { x = x * 2; }

// PASS BY REFERENCE: function gets the ADDRESS
void double_ref(int *x) { *x = *x * 2; }

int main(void) {
    int n = 5;
    double_it(n); // n is still 5
    double_ref(&n); // n is now 10!
    return 0;
}`
      }
    ]
  },
  {
    id: "arrays",
    title: "6. Arrays",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "An array is a collection of variables of the same type, stored together in memory, accessed by an index number starting from 0."
      },
      {
        type: "code",
        title: "Creating and Using Arrays",
        code: `// Declaration with initialization
int scores[5] = {90, 85, 78, 92, 88};

// Accessing elements — index starts at 0!
printf("%d\\n", scores[0]); // 90 — FIRST element
printf("%d\\n", scores[4]); // 88 — LAST element

// Modifying elements
scores[2] = 95; 

// Looping through array
for (int i = 0; i < 5; i++) {
    printf("scores[%d] = %d\\n", i, scores[i]);
}`
      },
      {
        type: "warning",
        text: "Array indices go from 0 to (size-1). If you have int arr[5], the last valid index is arr[4]. Accessing arr[5] is out of bounds — undefined behavior and a common source of crashes!"
      }
    ]
  },
  {
    id: "strings",
    title: "7. Strings",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "In C, a string is simply an array of characters that ends with a special null character '\\0'. This null terminator tells C where the string ends."
      },
      {
        type: "code",
        title: "Creating and Modifying Strings",
        code: `// Method 1: Character array
char name[] = "Alice"; // C adds \\0 at the end automatically

// Method 2: Specify size
char city[50] = "New York";

// String pointer (READ-ONLY — cannot modify!)
const char *greeting = "Hello"; 
// char *s = "Hello"; s[0] = 'h'; // CRASH! Modifying string literal

#include <string.h>
// strcpy — copy a string into another
char result[100];
strcpy(result, name); 
// strcat — concatenate (join) two strings
strcat(result, " is here");`
      },
      {
        type: "warning",
        text: "Never use gets() — it was removed in C11 because it's dangerous. Always use fgets() instead. Always specify the buffer size!"
      }
    ]
  },
  {
    id: "pointers",
    title: "8. Pointers — The Heart of C",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "A pointer is a variable that stores a memory address — the location of another variable in memory. Pointers are what make C powerful (and tricky). Once you truly understand them, C becomes much clearer."
      },
      {
        type: "tip",
        text: "Think of it this way: Imagine memory as a huge city of numbered houses. A normal variable is a house with a value inside. A pointer is a piece of paper with a house ADDRESS written on it. The pointer doesn't hold the actual value — it holds WHERE to find the value."
      },
      {
        type: "code",
        title: "Pointer Basics — & and *",
        code: `int age = 25; // A normal integer variable
int *p; // A POINTER to an integer (stores an address)

p = &age; // & means "address of" — p now holds address of age

// *p = 25 (* means "go to that address and get the value")
printf("Value at p (*p): %d\\n", *p); // 25

// Modify age through the pointer
*p = 30; // Go to address in p, put 30 there
printf("age is now: %d\\n", age); // 30 — age was changed!`
      },
      {
        type: "code",
        title: "Pointer Arithmetic",
        code: `int arr[] = {100, 200, 300};
int *p = arr; // points to arr[0]

// Each ++ moves forward by sizeof(int) = 4 bytes
printf("%d\\n", *p); // 100
p++;
printf("%d\\n", *p); // 200`
      },
      {
        type: "warning",
        text: "Dereferencing a NULL pointer (writing *p when p is NULL) causes an immediate program crash (Segmentation Fault). Always check if a pointer is NULL before using it!"
      }
    ]
  },
  {
    id: "memory",
    title: "9. Dynamic Memory Allocation",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "So far, all our variables were fixed in size at compile time. Dynamic memory lets you request memory while the program is running — you can allocate exactly as much as you need, when you need it."
      },
      {
        type: "tip",
        text: "Static arrays are like booking a fixed hotel room size in advance. Dynamic memory is like a hotel that can give you any size room you ask for, right when you arrive. But YOU must check out (free) the room when done — or the hotel runs out of rooms (memory leak)!"
      },
      {
        type: "code",
        title: "malloc, calloc, realloc & free",
        code: `#include <stdlib.h>

// malloc: allocates raw, UNINITIALIZED memory
int *arr = (int*) malloc(10 * sizeof(int));

// calloc: like malloc but fills memory with zeros
int *scores = (int*) calloc(5, sizeof(int));

// realloc: grows or shrinks an allocation
arr = (int*) realloc(arr, 20 * sizeof(int));

if (!arr) { exit(1); } // ALWAYS check for NULL!

// When done, FREE the memory!
free(arr);
arr = NULL; // Good habit: set to NULL after freeing`
      }
    ]
  },
  {
    id: "structures",
    title: "10. Structures & Unions",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "A struct (structure) lets you group related variables of different types together under one name. Instead of having separate variables for a person's name, age, and salary, you can package them into one 'Person' structure."
      },
      {
        type: "code",
        title: "Defining and Using a Struct",
        code: `struct Student {
    char name[50];
    int age;
    double gpa;
};

// Create a struct variable
struct Student s1;
s1.age = 20;
strcpy(s1.name, "Alice");

// Access fields with . (dot operator)
printf("Name: %s\\n", s1.name);

// Pointer to Struct — The Arrow Operator
struct Student *ptr = &s1;
printf("Name: %s\\n", ptr->name); // Use -> instead of .`
      }
    ]
  },
  {
    id: "fileio",
    title: "11. File I/O",
    icon: "FileText",
    content: [
      {
        type: "paragraph",
        text: "Programs often need to save data permanently or read data from files. C's file I/O functions let you read from and write to files on disk."
      },
      {
        type: "code",
        title: "Reading and Writing Files",
        code: `#include <stdio.h>

// Writing to a file
FILE *fp = fopen("data.txt", "w");
if (!fp) { perror("fopen"); return 1; }
fprintf(fp, "Name: Alice, Age: %d\\n", 20);
fclose(fp); // ALWAYS close when done!

// Reading from a file
FILE *in = fopen("data.txt", "r");
char line[256];
while (fgets(line, sizeof(line), in) != NULL) {
    printf("%s", line);
}
fclose(in);`
      }
    ]
  },
  {
    id: "preprocessor",
    title: "12. Preprocessor",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "The preprocessor runs before the compiler. It processes special lines that start with #. Think of it as a text-processing step that prepares your code before the actual compilation begins."
      },
      {
        type: "code",
        title: "Constants, Macros, and Conditional Compilation",
        code: `#define PI 3.14159265
#define MAX(a, b) ((a) > (b) ? (a) : (b)) // Use parenthesis!

// Conditional Compilation
#define DEBUG_MODE

#ifdef DEBUG_MODE
  #define LOG(msg) printf("[DEBUG] %s\\n", (msg))
#else
  #define LOG(msg) // Empty in release
#endif`
      },
      {
        type: "warning",
        text: "Macros do simple text substitution. SQUARE(1+2) becomes ((1+2)*(1+2)) = 9, which is correct. But without the parentheses, SQUARE_BAD(1+2) -> 1+2*1+2 = 5, which is WRONG! Always wrap macro parameters in ()."
      }
    ]
  },
  {
    id: "datastructures",
    title: "13. Data Structures",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "Data structures are ways to organize and store data so you can use it efficiently. C gives you the building blocks to create these from scratch using structs and pointers."
      },
      {
        type: "code",
        title: "Linked List — Chain of Nodes",
        code: `typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Insert at beginning
void push(Node **head, int value) {
    Node *new = (Node*) malloc(sizeof(Node));
    new->data = value;
    new->next = *head;
    *head = new;
}`
      }
    ]
  },
  {
    id: "bestpractices",
    title: "14. Best Practices & Common Pitfalls",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "Writing correct C code is not just about making it compile — it's about making it safe, readable, and maintainable. Here are the most important habits every C programmer should develop."
      },
      {
        type: "code",
        title: "Memory Management Rules",
        code: `// Rule 1: Every malloc() must have exactly one free()
int *p = malloc(10 * sizeof(int));
free(p);
p = NULL; // Rule 2: NULL the pointer after freeing

// Rule 3: Never free() something twice (Double Free = Crash)
// Rule 4: Don't use memory after freeing (Use After Free = Undefined Behavior)`
      },
      {
        type: "code",
        title: "Compile and Debug Like a Pro",
        code: `# Always compile with warnings:
gcc -Wall -Wextra -std=c11 -g -o program program.c

# Run with AddressSanitizer to catch memory errors:
gcc -fsanitize=address,undefined -g -o program program.c
./program

# Use Valgrind for memory leak detection:
valgrind --leak-check=full ./program`
      }
    ]
  }
];
