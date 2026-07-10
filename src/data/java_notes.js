export const javaNotesData = [
  {
    id: "intro",
    title: "1. Introduction to Java & JVM Architecture",
    icon: "BookOpen",
    content: [
      {
        type: "paragraph",
        text: "Java is one of the most popular programming languages in the world, primarily used for building large-scale enterprise applications, Android apps, and web backends. The biggest selling point of Java is its motto: 'Write Once, Run Anywhere' (WORA)."
      },
      {
        type: "paragraph",
        text: "But how does it run anywhere? When you write C or C++, the compiler translates your code directly into machine code for your specific operating system (Windows, Mac, Linux). If you compile it on Windows, it won't run on a Mac.\n\nJava does something clever. When you compile Java, it doesn't translate it to machine code. It translates it to 'Bytecode'. This bytecode is like a universal language. You then install a program called the JVM (Java Virtual Machine) on your Windows, Mac, or Linux computer. The JVM reads the bytecode and translates it into the local machine code on the fly!"
      },
      {
        type: "tip",
        text: "The Big Three: \n1. JVM (Java Virtual Machine): The engine that runs your code.\n2. JRE (Java Runtime Environment): JVM + the standard libraries needed to run a finished app.\n3. JDK (Java Development Kit): JRE + the tools you need to write code (like the compiler, 'javac')."
      },
      {
        type: "code",
        title: "Your First Java Program",
        code: `public class Main {
    // The main method is the entry point of every Java program.
    // Without this exact line, Java won't know where to start running your code.
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}`
      }
    ]
  },
  {
    id: "datatypes",
    title: "2. Variables & Data Types",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Think of your computer's memory like a massive warehouse full of empty boxes. A variable is simply a label you stick on one of those boxes so you can find it later. \n\nHowever, Java is a 'statically typed' language. This means before you can put anything in a box, you must declare exactly what TYPE of data that box is allowed to hold. You can't put a word into a box meant for numbers."
      },
      {
        type: "code",
        title: "Primitive Data Types (The Basic Building Blocks)",
        code: `// --- WHOLE NUMBERS ---
byte b = 100;        // Tiny box: 1 byte (-128 to 127)
short s = 10000;     // Small box: 2 bytes
int i = 100000;      // Standard box: 4 bytes (Default choice for numbers)
long l = 100000000L; // Huge box: 8 bytes (Always add 'L' at the end)

// --- DECIMAL NUMBERS ---
float f = 10.5f;     // 4 bytes (Always add 'f' at the end)
double d = 20.99;    // 8 bytes (Default choice for decimals, more precise)

// --- OTHER ---
char c = 'A';        // Single character (Always use single quotes '')
boolean isTrue = true; // True or False only`
      },
      {
        type: "paragraph",
        text: "Reference Data Types are more complex. Instead of holding the actual value, the box holds a 'reference' (a map or address) pointing to where the complex data is stored in memory. The most common reference type is a String."
      },
      {
        type: "code",
        title: "Reference Data Type Example",
        code: `String name = "Alice"; 
// Notice the capital 'S'. Strings are Objects, not primitives!
// Always use double quotes "" for Strings.`
      }
    ]
  },
  {
    id: "operators",
    title: "3. Operators",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Operators are symbols that tell the compiler to perform specific mathematical or logical tasks. They are the verbs of your code."
      },
      {
        type: "code",
        title: "Common Operators",
        code: `int a = 10, b = 5;

// --- Arithmetic ---
System.out.println(a + b); // 15
System.out.println(a / b); // 2
System.out.println(10 % 3); // 1 (Modulo: gives you the remainder of division)

// --- Relational (Asking a Yes/No question) ---
System.out.println(a == b); // false (Is a equal to b?)
System.out.println(a != b); // true (Is a NOT equal to b?)
System.out.println(a > b);  // true (Is a greater than b?)

// --- Logical (Combining Yes/No questions) ---
boolean isRaining = true, hasUmbrella = false;
System.out.println(isRaining && hasUmbrella); // false (AND: BOTH must be true)
System.out.println(isRaining || hasUmbrella); // true (OR: AT LEAST ONE must be true)
System.out.println(!isRaining); // false (NOT: flips true to false)`
      }
    ]
  },
  {
    id: "controlflow",
    title: "4. Control Flow (Making Decisions & Looping)",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "By default, Java reads your code from top to bottom, one line at a time. Control flow allows you to change that path—skipping lines, making choices, or repeating lines."
      },
      {
        type: "code",
        title: "If-Else and Switch",
        code: `int score = 85;

// If-Else checks conditions sequentially.
if (score >= 90) {
    System.out.println("Grade: A");
} else if (score >= 80) {
    System.out.println("Grade: B"); // This will run!
} else {
    System.out.println("Grade: C"); // Catch-all if nothing else is true
}

// Switch is better when checking a single variable against many specific values.
int day = 2;
switch(day) {
    case 1: System.out.println("Monday"); break; // 'break' stops it from running the next case!
    case 2: System.out.println("Tuesday"); break;
    default: System.out.println("Weekend");
}`
      },
      {
        type: "paragraph",
        text: "Loops allow you to run the exact same block of code multiple times without rewriting it."
      },
      {
        type: "code",
        title: "Loops",
        code: `// For loop: Use when you know EXACTLY how many times to repeat.
// (Start at 0; Keep going as long as i < 3; Increase i by 1 each time)
for(int i = 0; i < 3; i++) {
    System.out.println("Hello"); // Prints 3 times
}

// While loop: Use when you don't know how many times it will run (e.g., waiting for user input).
int battery = 100;
while(battery > 0) {
    // Keep playing game
    battery -= 10; 
}`
      }
    ]
  },
  {
    id: "methods",
    title: "5. Methods",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "A method (often called a function in other languages) is a block of code that only runs when it is called. You can pass data into them (parameters) and they can give data back to you (return values). \n\nThink of a method like a coffee machine. You put coffee beans and water in (parameters), the machine does its internal processing, and it returns a cup of coffee (return value)."
      },
      {
        type: "code",
        title: "Defining and Calling Methods",
        code: `public class Calculator {
    
    // public: Anyone can use this method
    // static: We don't need to create an object to use it
    // int: It promises to give us back an integer
    public static int addNumbers(int num1, int num2) {
        int sum = num1 + num2;
        return sum; // This is the cup of coffee being returned
    }

    public static void main(String[] args) {
        // We 'call' the method and save the result
        int finalResult = addNumbers(10, 20); 
        System.out.println(finalResult); // 30
    }
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
        text: "Imagine you want to store the grades of 100 students. Creating 100 separate variables (grade1, grade2, grade3...) would be a nightmare. An array is a single variable that holds a list of items of the SAME type."
      },
      {
        type: "warning",
        text: "Important: Arrays in Java have a FIXED size. When you create an array of size 5, it can never grow to size 6. If you need it to grow, you have to create a brand new bigger array and copy the old items over."
      },
      {
        type: "code",
        title: "Using Arrays",
        code: `// Option 1: Create an empty array with 5 slots (filled with default 0s)
int[] grades = new int[5];
grades[0] = 95; // Arrays always start at index 0!
grades[1] = 88;

// Option 2: Create and fill it immediately
String[] names = {"Alice", "Bob", "Charlie"};

// Looping through an array
for(int i = 0; i < names.length; i++) {
    System.out.println("Student: " + names[i]);
}`
      }
    ]
  },
  {
    id: "strings",
    title: "7. Strings in Java",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "Strings hold text. But there is a massive secret about Java Strings: They are IMMUTABLE. This means once a String is created in memory, it can NEVER be changed."
      },
      {
        type: "tip",
        text: "Wait, if I write `String name = \"Ali\"; name = name + \"ce\";`, didn't I change it? \n\nNo! Java actually created a completely new String \"Alice\" in memory, pointed your variable to it, and threw the old \"Ali\" string into the trash (Garbage Collector). Doing this inside a loop with thousands of iterations will freeze your program because it creates thousands of trashed objects!"
      },
      {
        type: "code",
        title: "String vs StringBuilder",
        code: `// Standard String (Good for simple text that doesn't change often)
String greeting = "Hello";

// Useful String methods:
System.out.println(greeting.length()); // 5
System.out.println(greeting.toUpperCase()); // "HELLO"
System.out.println(greeting.equals("hello")); // false (case sensitive!)

// StringBuilder (Good when you need to modify text frequently, like in a loop)
// It modifies the exact same object in memory, making it incredibly fast.
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World"); 
System.out.println(sb.toString()); // "Hello World"`
      }
    ]
  },
  {
    id: "oop1",
    title: "8. Object-Oriented Programming (Classes & Objects)",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "OOP is a way to structure your code around real-world objects instead of just lists of functions. \n\nThink of a Class as a blueprint. An architect draws a blueprint for a house (the Class). The blueprint isn't a real house. But builders use that blueprint to build 10 physical houses. Those physical houses are the Objects."
      },
      {
        type: "code",
        title: "Creating a Blueprint and Building Objects",
        code: `// The Blueprint (Class)
class Car {
    String color; // Attribute (State)
    int speed;    // Attribute (State)

    // Constructor: The special method called the moment a new object is built.
    // It sets up the initial state.
    public Car(String c, int s) {
        this.color = c; // 'this' means "the specific object we are building right now"
        this.speed = s;
    }

    // Method (Behavior)
    void honk() {
        System.out.println("Beep! I am " + this.color);
    }
}

public class Main {
    public static void main(String[] args) {
        // Using the 'new' keyword builds a physical object from the blueprint
        Car myFerrari = new Car("Red", 200); 
        Car myCivic = new Car("Blue", 120);

        myFerrari.honk(); // Prints: Beep! I am Red
        myCivic.honk();   // Prints: Beep! I am Blue
    }
}`
      }
    ]
  },
  {
    id: "oop2",
    title: "9. OOP Concepts (Inheritance & Polymorphism)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Inheritance allows a new class to copy (inherit) all the attributes and methods of an existing class. It prevents you from writing the same code twice. \n\nPolymorphism means 'many forms'. It allows you to treat a child object exactly like its parent object, but it will still behave like the child!"
      },
      {
        type: "code",
        title: "Inheritance (extends)",
        code: `class Animal {
    void eat() {
        System.out.println("Munch munch...");
    }
    void makeSound() {
        System.out.println("Generic animal sound");
    }
}

// Dog INHERITS everything from Animal using 'extends'
class Dog extends Animal {
    // Overriding: The Dog replaces the parent's generic sound with its own specific sound.
    @Override
    void makeSound() {
        System.out.println("Bark!");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat(); // Works perfectly! Inherited from Animal.
        
        // POLYMORPHISM IN ACTION:
        // We label the box as 'Animal', but put a 'Dog' inside.
        Animal secretDog = new Dog(); 
        secretDog.makeSound(); // Prints "Bark!" because it's secretly a Dog at runtime!
    }
}`
      }
    ]
  },
  {
    id: "abstraction",
    title: "10. Abstraction & Interfaces",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "Abstraction is about hiding the complex background details and only showing the user what they need to see. \n\nWhen you press the gas pedal in a car, you don't need to know how the fuel injectors work. You just know \"press pedal = go faster\". That's an Interface."
      },
      {
        type: "code",
        title: "Interfaces",
        code: `// An Interface is a strict contract. It only has empty methods (no bodies).
// Anyone who signs this contract MUST implement these methods.
interface Drivable {
    void startEngine();
    void accelerate();
}

// A class signs the contract using 'implements'
class Tesla implements Drivable {
    // We are FORCED to write the code for these methods
    @Override
    public void startEngine() {
        System.out.println("Silent electric startup...");
    }

    @Override
    public void accelerate() {
        System.out.println("0 to 60 in 2 seconds!");
    }
}`
      }
    ]
  },
  {
    id: "encapsulation",
    title: "11. Encapsulation",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "Encapsulation is a protective shield. Imagine a bank account. You don't want anyone to be able to directly change your balance by typing `myAccount.balance = 1000000;`. \n\nInstead, we make the balance `private` (hidden). The only way people can change the balance is by using public 'methods' like `deposit()` or `withdraw()`. This way, we can add rules inside those methods (e.g., checking if they have enough funds before withdrawing)."
      },
      {
        type: "code",
        title: "Getters and Setters",
        code: `class BankAccount {
    // Private: No other class can see or touch this variable directly
    private double balance = 0; 

    // Public Getter: Read-only access
    public double getBalance() {
        return balance;
    }

    // Public Setter: Controlled write access
    public void deposit(double amount) {
        if(amount > 0) { // Safety rule!
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid amount!");
        }
    }
}`
      }
    ]
  },
  {
    id: "staticfinal",
    title: "12. The 'static' and 'final' Keywords",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "`static` means 'Shared by the entire class'. Normally, every object gets its own copy of a variable. But if a variable is static, there is only ONE copy in memory, and all objects share it. You can access it without even creating an object! \n\n`final` means 'Cannot be changed'. It is used to create constants."
      },
      {
        type: "code",
        title: "Static and Final",
        code: `class MathRules {
    // final means PI is locked forever.
    // static means we can access it via MathRules.PI (no object needed).
    public static final double PI = 3.14159;

    public static int add(int a, int b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        // Notice we didn't write: MathRules m = new MathRules();
        System.out.println(MathRules.PI); 
        System.out.println(MathRules.add(5, 5));
    }
}`
      }
    ]
  },
  {
    id: "exceptions",
    title: "13. Exception Handling",
    icon: "AlertTriangle",
    content: [
      {
        type: "paragraph",
        text: "Sometimes things go wrong. A user uploads a broken file, or the internet disconnects. In Java, these errors are called Exceptions. If an Exception happens and you don't 'catch' it, your entire program will instantly crash. \n\nWe use a `try-catch` block to say: 'Try running this risky code. If it blows up, catch the error and run a backup plan instead of crashing.'"
      },
      {
        type: "code",
        title: "Try-Catch-Finally",
        code: `try {
    // Risky code
    int result = 10 / 0; // ArithmeticException! You can't divide by zero!
    System.out.println("This line will never print.");
    
} catch (ArithmeticException e) {
    // If it crashes, execution instantly jumps down here
    System.out.println("Error: You tried to divide by zero!");
    
} finally {
    // This block ALWAYS runs, whether it crashed or not.
    // Perfect for closing files or disconnecting from databases.
    System.out.println("Cleaning up resources...");
}`
      }
    ]
  },
  {
    id: "collections",
    title: "14. Collections Framework (Dynamic Arrays)",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "Remember how standard Arrays have a fixed size and can't grow? The Collections Framework solves this. It provides incredibly powerful data structures that grow automatically as you add items to them."
      },
      {
        type: "code",
        title: "List, Set, and Map",
        code: `import java.util.*;

// 1. LIST (ArrayList): Like a regular array, but grows automatically. Keeps items in order.
List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Alice"); // Lists allow duplicates!
System.out.println(names.get(1)); // Gets "Bob"

// 2. SET (HashSet): A bag of items where order doesn't matter, but NO DUPLICATES are allowed.
Set<Integer> uniqueNumbers = new HashSet<>();
uniqueNumbers.add(10);
uniqueNumbers.add(10); // Completely ignored!
System.out.println(uniqueNumbers.size()); // Size is 1

// 3. MAP (HashMap): A dictionary. Stores Key-Value pairs.
Map<String, String> phoneBook = new HashMap<>();
phoneBook.put("Alice", "555-1234");
System.out.println(phoneBook.get("Alice")); // Looks up the key, prints "555-1234"`
      }
    ]
  },
  {
    id: "generics",
    title: "15. Generics",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "Generics allow you to write a class or method once, and use it with any data type. The `<T>` acts as a placeholder for a real data type that will be provided later. \n\nWhen you wrote `List<String> list = new ArrayList<>()`, the `<String>` is a Generic! It forces the List to only accept Strings, providing safety."
      },
      {
        type: "code",
        title: "Building your own Generic Class",
        code: `// T stands for "Type". It will be replaced when we use the class.
class MagicBox<T> {
    private T secretItem;
    
    public void putInside(T item) { 
        this.secretItem = item; 
    }
    public T takeOut() { 
        return secretItem; 
    }
}

public class Main {
    public static void main(String[] args) {
        // Let's make a box for Strings
        MagicBox<String> wordBox = new MagicBox<>();
        wordBox.putInside("Hello");

        // Let's make a box for Integers
        MagicBox<Integer> numberBox = new MagicBox<>();
        numberBox.putInside(99);
    }
}`
      }
    ]
  },
  {
    id: "fileio",
    title: "16. File I/O (Input/Output)",
    icon: "FileText",
    content: [
      {
        type: "paragraph",
        text: "If you don't save your data to a file or database, it is deleted from memory the moment your program closes. File I/O lets you write data to text files on your hard drive."
      },
      {
        type: "code",
        title: "Try-With-Resources (Auto-Closing Files)",
        code: `import java.io.*;

public class Main {
    public static void main(String[] args) {
        
        // This is a "Try-With-Resources" block. 
        // It automatically closes the file when done, so we don't leak memory!
        try (FileWriter writer = new FileWriter("notes.txt")) {
            writer.write("Java is awesome!\\n");
            writer.write("Saving data permanently.");
            System.out.println("File written successfully!");
            
        } catch (IOException e) {
            System.out.println("An error occurred while writing.");
        }
        
    }
}`
      }
    ]
  },
  {
    id: "multithreading",
    title: "17. Multithreading",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "By default, your program does one thing at a time. If it downloads a large file, the whole program freezes until it finishes. Multithreading allows your program to split into multiple 'workers' (threads) that do multiple tasks at the exact same time."
      },
      {
        type: "code",
        title: "Creating a Background Thread",
        code: `// Create a job for the thread to do
class DownloadTask implements Runnable {
    public void run() {
        System.out.println("Downloading file in background...");
        // Imagine 10 seconds of downloading here
        System.out.println("Download complete!");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("Starting program.");

        // Hand the job to a new Thread and start it
        Thread worker = new Thread(new DownloadTask());
        worker.start(); // This runs in the background!

        // The main program keeps moving forward instantly
        System.out.println("Program continues while downloading...");
    }
}`
      }
    ]
  },
  {
    id: "java8",
    title: "18. Modern Java (Lambdas & Streams)",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "In Java 8, a massive update was released that brought 'Functional Programming' to Java. Instead of writing massive 'for' loops to search through data, you can use Streams and Lambdas to do it in one line of code."
      },
      {
        type: "code",
        title: "Streams API",
        code: `import java.util.*;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Amanda", "Charlie");

        // Goal: Find all names starting with 'A', convert to UPPERCASE, and save to a new list.
        
        // The old way (For Loop):
        // (Takes 6+ lines of code)
        
        // The Modern Java Way (Streams):
        List<String> aNames = names.stream()
            .filter(name -> name.startsWith("A")) // Lambda: Keep if name starts with A
            .map(name -> name.toUpperCase())      // Lambda: Convert to uppercase
            .collect(Collectors.toList());        // Save back into a List

        System.out.println(aNames); // Prints: [ALICE, AMANDA]
    }
}`
      }
    ]
  },
  {
    id: "bestpractices",
    title: "19. Best Practices",
    icon: "CheckCircle2",
    content: [
      {
        type: "paragraph",
        text: "Professional code is not just code that works. It is code that is easy for OTHER developers to read and maintain."
      },
      {
        type: "code",
        title: "Java Coding Standards",
        code: `// 1. NAMING CONVENTIONS
class CustomerAccount {} // Classes MUST be PascalCase (Capitalize every word)
int accountNumber = 0;   // Variables MUST be camelCase (First word lowercase)
void calculateTotal() {} // Methods MUST be camelCase

// 2. CONSTANTS
// Constants should be static final, and UPPER_SNAKE_CASE
public static final int MAX_USERS = 100;

// 3. ENCAPSULATION
// Never make class variables public. Always make them private and use Getters/Setters.

// 4. PROGRAM TO INTERFACES
// Don't do this: 
ArrayList<String> list = new ArrayList<>();
// Do this: 
List<String> list = new ArrayList<>(); // Use the interface type!

// 5. STRINGS IN LOOPS
// If you are modifying a String inside a loop, ALWAYS use StringBuilder.`
      }
    ]
  }
];
