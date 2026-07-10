const fs = require('fs');
const path = require('path');

const primaryDsaNotes = `export const primaryDsaNotesData = [
  {
    id: "basics",
    title: "A. Basics & Complexity Analysis",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: TIME & SPACE COMPLEXITY\\nTime Complexity measures how the runtime of an algorithm grows as the input size (N) grows. We use Big-O notation for the worst-case scenario. Space Complexity measures how much extra memory the algorithm requires.\\n- O(1): Constant time (Instant)\\n- O(log N): Logarithmic time (Binary Search)\\n- O(N): Linear time (Simple loop)\\n- O(N^2): Quadratic time (Nested loops)\\n\\nSUBTOPIC 2: RECURSION\\nRecursion is when a function calls itself. Every recursive function MUST have a 'Base Case' to stop it from running infinitely and crashing the program with a Stack Overflow.\\n\\nSUBTOPIC 3: MATHEMATICAL ALGORITHMS\\nMathematical algorithms are heavily used in DSA. For example, finding the Greatest Common Divisor (GCD) using the Euclidean Algorithm, or finding prime numbers quickly using the Sieve of Eratosthenes."
      },
      {
        type: "code",
        title: "Recursion & Euclidean GCD",
        code: \`// 1. Recursion: Factorial (e.g., 5! = 5 * 4 * 3 * 2 * 1)
int factorial(int n) {
    if (n == 0) return 1; // BASE CASE: Stops the recursion
    return n * factorial(n - 1); // Recursive Call
}

// 2. Mathematical Algorithm: Euclidean GCD
// Finds the greatest number that divides both a and b without a remainder.
// Time Complexity: O(log(min(a, b)))
int gcd(int a, int b) {
    if (b == 0) return a; // Base case
    return gcd(b, a % b); // Recursive step
}\`
      }
    ]
  },
  {
    id: "arrays",
    title: "B. Arrays & Classic Techniques",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: 1D & 2D ARRAYS\\nArrays store elements contiguously in memory. A 2D array (Matrix) is an array of arrays, heavily used in grid-based problems.\\n\\nSUBTOPIC 2: PREFIX SUM & DIFFERENCE ARRAY\\nA Prefix Sum array allows you to instantly (O(1)) find the sum of any subarray after an initial O(N) setup. Difference arrays are used to quickly add values to ranges.\\n\\nSUBTOPIC 3: SLIDING WINDOW & TWO POINTERS\\nThese are optimization techniques. Two Pointers are usually used on sorted arrays to find pairs. Sliding Window is used to find subarrays (e.g., 'maximum sum of 3 consecutive elements') in O(N) instead of O(N^2).\\n\\nSUBTOPIC 4: KADANE'S & MOORE'S ALGORITHMS\\n- Kadane's Algorithm finds the Maximum Subarray Sum in O(N) time.\\n- Moore's Voting Algorithm finds the Majority Element (an element appearing more than N/2 times) in O(N) time and O(1) space."
      },
      {
        type: "code",
        title: "Kadane's Algorithm & Sliding Window",
        code: \`#include <vector>
#include <algorithm>
using namespace std;

// 1. Kadane's Algorithm (Max Subarray Sum)
int maxSubArraySum(vector<int>& nums) {
    int maxSum = nums[0];
    int currentSum = 0;
    
    for (int num : nums) {
        if (currentSum < 0) currentSum = 0; // Reset if negative
        currentSum += num;
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}

// 2. Sliding Window (Max sum of 'k' consecutive elements)
int maxSlidingWindowSum(vector<int>& arr, int k) {
    int maxSum = 0, windowSum = 0;
    
    // Setup the first window
    for (int i = 0; i < k; i++) windowSum += arr[i];
    maxSum = windowSum;
    
    // Slide the window forward
    for (int i = k; i < arr.size(); i++) {
        windowSum += arr[i] - arr[i - k]; // Add new element, remove oldest
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}\`
      }
    ]
  },
  {
    id: "strings",
    title: "C. Strings & Manipulation",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: STRING BASICS & CHARACTER ARRAYS\\nStrings are essentially arrays of characters. In C++, they are mutable (changeable). A character is stored as an ASCII integer under the hood (e.g., 'A' is 65, 'a' is 97).\\n\\nSUBTOPIC 2: MANIPULATION & PALINDROMES\\nA Palindrome reads the same forwards and backwards (e.g., 'racecar'). We use the Two Pointer technique to check for palindromes in O(N) time.\\n\\nSUBTOPIC 3: PATTERN MATCHING BASICS\\nPattern matching involves finding a small string inside a massive string. While basic nested loops take O(N*M) time, advanced algorithms like KMP (secondary DSA) do it in O(N) time."
      },
      {
        type: "code",
        title: "Two Pointers for Palindrome Check",
        code: \`#include <string>
using namespace std;

// Checks if a string is a palindrome in O(N) time and O(1) space
bool isPalindrome(string s) {
    int left = 0;
    int right = s.length() - 1;
    
    while (left < right) {
        // If characters don't match, it's not a palindrome!
        if (s[left] != s[right]) {
            return false; 
        }
        left++;
        right--;
    }
    return true; // We successfully checked the whole string
}\`
      }
    ]
  },
  {
    id: "searching",
    title: "D. Searching Algorithms",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: LINEAR SEARCH\\nIterating through every single element one by one until you find the target. Time Complexity: O(N).\\n\\nSUBTOPIC 2: BINARY SEARCH\\nA massively powerful algorithm. It requires the array to be SORTED. It checks the middle element; if the target is smaller, it completely discards the right half of the array! Time Complexity: O(log N).\\n\\nSUBTOPIC 3: BINARY SEARCH ON ANSWER\\nA master-level competitive programming technique. Instead of searching for an element in an array, you binary search the actual *answer* range (e.g., searching for the optimal speed to eat bananas before a deadline)."
      },
      {
        type: "code",
        title: "Binary Search",
        code: \`#include <vector>
using namespace std;

// Binary Search: O(log N) Time Complexity
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents integer overflow
        
        if (arr[mid] == target) return mid; // Found it!
        
        if (arr[mid] < target) {
            left = mid + 1; // Target must be in the right half
        } else {
            right = mid - 1; // Target must be in the left half
        }
    }
    return -1; // Target not found
}\`
      }
    ]
  },
  {
    id: "sorting",
    title: "E. Sorting Algorithms",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: O(N^2) ALGORITHMS\\n- Bubble Sort: Swaps adjacent elements repeatedly until sorted. Very slow.\\n- Selection Sort: Finds the absolute smallest element and puts it at the front, then repeats.\\n- Insertion Sort: Builds the sorted array one element at a time (like sorting playing cards in your hand).\\n\\nSUBTOPIC 2: NON-COMPARISON SORTS (O(N))\\nAlgorithms like Counting Sort, Radix Sort, and Bucket Sort do NOT compare elements against each other. They use frequency arrays (buckets) to sort massive amounts of data in O(N) time, but they require extra memory (Space Complexity)."
      },
      {
        type: "code",
        title: "Insertion Sort & Counting Sort",
        code: \`#include <vector>
using namespace std;

// 1. Insertion Sort: O(N^2) Time, O(1) Space
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        // Move elements greater than key one position ahead
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// 2. Counting Sort: O(N + K) Time, O(K) Space
// K is the maximum value in the array. Excellent for small ranges!
void countingSort(vector<int>& arr, int maxVal) {
    vector<int> count(maxVal + 1, 0);
    
    // Count frequencies
    for (int num : arr) count[num]++;
    
    // Overwrite original array
    int index = 0;
    for (int num = 0; num <= maxVal; num++) {
        while (count[num] > 0) {
            arr[index++] = num;
            count[num]--;
        }
    }
}\`
      }
    ]
  },
  {
    id: "hashing",
    title: "F. Hashing & Frequency Counting",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: HASH TABLES & HASH MAPS\\nHashing allows for O(1) (instantaneous) lookup, insertion, and deletion. A HashMap (or \`unordered_map\` in C++) stores Key-Value pairs. It uses a mathematical hash function to instantly calculate exactly where data lives in memory.\\n\\nSUBTOPIC 2: HASH SETS\\nA HashSet (\`unordered_set\` in C++) only stores unique Keys, no values. It is perfect for checking if an element exists without duplicates.\\n\\nSUBTOPIC 3: FREQUENCY COUNTING\\nOne of the most common DSA patterns. You use a HashMap to count how many times an element appears in an array, turning an O(N^2) brute-force search into an O(N) pass."
      },
      {
        type: "code",
        title: "Frequency Counting with HashMaps",
        code: \`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

// Finds the first number that appears exactly twice
int firstDuplicate(vector<int>& nums) {
    unordered_map<int, int> frequency; // Key: Number, Value: Count
    
    for (int num : nums) {
        frequency[num]++; // Increase the count for this number
        
        // If we've seen it exactly twice, return it!
        if (frequency[num] == 2) {
            return num;
        }
    }
    return -1; // No duplicates found
}\`
      }
    ]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'primary_dsa_notes.js'), primaryDsaNotes);
console.log("Created primary_dsa_notes.js successfully!");
