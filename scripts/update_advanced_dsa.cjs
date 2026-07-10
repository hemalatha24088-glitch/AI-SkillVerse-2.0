const fs = require('fs');
const path = require('path');

const advancedDsaNotes = `export const advancedDsaNotesData = [
  {
    id: "dp",
    title: "A. Dynamic Programming",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: DP BASICS & 1D DP\\nDynamic Programming (DP) is an optimization over recursion. If we recursively calculate the same overlapping subproblems (like the Fibonacci sequence), we waste massive amounts of time. DP stores these results in an array ('Memoization' or 'Tabulation') so we only calculate them once.\\n\\nSUBTOPIC 2: 2D DP & DP ON STRINGS\\nUsed when the state depends on two variables (e.g., finding the Longest Common Subsequence between two strings). You build a 2D grid where each cell represents a sub-answer.\\n\\nSUBTOPIC 3: DP ON TREES & GRAPHS & BITMASK DP\\nAdvanced DP involves keeping state across tree traversals (like finding the maximum independent set of a tree), or using an integer's bits to represent sets of visited nodes (Bitmask DP) to solve problems like the Traveling Salesperson Problem."
      },
      {
        type: "code",
        title: "1D DP: Fibonacci (Tabulation)",
        code: \`#include <vector>
using namespace std;

int fibonacciDP(int n) {
    if (n <= 1) return n;
    
    // DP Array to store answers
    vector<int> dp(n + 1);
    dp[0] = 0;
    dp[1] = 1;
    
    // Build from the bottom up!
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}\`
      }
    ]
  },
  {
    id: "advancedgraphs",
    title: "B. Advanced Graph Algorithms",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SHORTEST PATHS\\n- Dijkstra's Algorithm: Finds the shortest path from a starting node to all other nodes. Does NOT work with negative weights. Uses a Priority Queue.\\n- Bellman-Ford: Finds shortest paths and CAN handle negative weights. Used to detect Negative Weight Cycles.\\n- Floyd-Warshall: Finds the shortest path between ALL pairs of nodes in O(V^3) time.\\n\\nSUBTOPIC 2: MINIMUM SPANNING TREES (MST)\\n- Prim's Algorithm & Kruskal's Algorithm: Both find the minimum cost to connect all nodes in a graph without cycles.\\n- Kruskal's uses the Disjoint Set Union (Union-Find) data structure to efficiently detect cycles while adding edges.\\n\\nSUBTOPIC 3: STRONGLY CONNECTED COMPONENTS (SCC)\\n- Tarjan's Algorithm & Kosaraju's Algorithm: Used in directed graphs to find groups of nodes where every node can reach every other node in that group.\\n\\nSUBTOPIC 4: FLOW & A* SEARCH\\n- Network Flow (Ford-Fulkerson): Finds the maximum amount of 'flow' (e.g., water, traffic) that can pass from a Source to a Sink.\\n- A* Search: Used heavily in AI and Pathfinding (Games). It optimizes Dijkstra's by using a 'Heuristic' to guess the distance to the target."
      },
      {
        type: "code",
        title: "Disjoint Set Union (Union-Find)",
        code: \`#include <vector>
using namespace std;

class DSU {
private:
    vector<int> parent, rank;
public:
    DSU(int n) {
        parent.resize(n);
        rank.resize(n, 0);
        for(int i = 0; i < n; i++) parent[i] = i;
    }
    
    // Path Compression: Flattens the tree for O(1) lookups
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]); 
    }
    
    // Union by Rank: Attaches smaller tree under larger tree
    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
};\`
      }
    ]
  },
  {
    id: "advancedtrees",
    title: "C. Advanced Trees",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SEGMENT TREE & FENWICK TREE\\nUsed for answering Range Queries (e.g., 'What is the sum of array elements from index 2 to 10?') while simultaneously allowing array updates. Both do this in O(log N) time.\\n- Segment Tree: Powerful, can handle Range Minimum/Maximum/Sum queries.\\n- Fenwick Tree (Binary Indexed Tree): Uses bitwise operations to achieve the same result with much less code and memory.\\n\\nSUBTOPIC 2: HEAVY-LIGHT DECOMPOSITION & BINARY LIFTING\\n- Heavy-Light Decomposition (HLD): Flattens a tree into an array so you can use a Segment Tree to answer queries on paths between any two nodes in a tree.\\n- Binary Lifting: A technique to find the Lowest Common Ancestor (LCA) or jump 'K' steps up a tree in O(log N) time."
      }
    ]
  },
  {
    id: "advancedstrings",
    title: "D. Advanced String Algorithms",
    icon: "MessageSquare",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: FAST PATTERN MATCHING\\n- KMP Algorithm: Finds a pattern string inside a massive text string in O(N+M) time by preventing the search from ever going backwards. It builds an LPS (Longest Prefix Suffix) array.\\n- Rabin-Karp: Uses a Rolling Hash to compare strings in O(1) time. Great for detecting plagiarism.\\n\\nSUBTOPIC 2: Z-ALGORITHM & MANACHER'S\\n- Z Algorithm: Finds all occurrences of a pattern in linear time.\\n- Manacher's Algorithm: Finds the Longest Palindromic Substring in purely O(N) time (a massive improvement over the standard O(N^2) DP approach).\\n\\nSUBTOPIC 3: SUFFIX ARRAYS & AUTOMATA\\n- Suffix Array / Suffix Tree: Data structures that store all suffixes of a string. Used heavily in bioinformatics (DNA sequence analysis) to find the longest repeated substrings.\\n- Aho-Corasick: The algorithm behind 'grep'. It searches for MULTIPLE patterns simultaneously in O(N) time."
      }
    ]
  },
  {
    id: "bitmanipulation",
    title: "E. Bit Manipulation",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: BITWISE OPERATORS & XOR TRICKS\\nOperating directly on the 1s and 0s of an integer is blazingly fast. \\n- XOR (^): A number XORed with itself is 0. A number XORed with 0 is itself. This is heavily used to find the 'single non-repeating element' in an array.\\n- Bitmasking: Using an integer (which has 32 bits) to represent a boolean array of 32 items (1 means true, 0 means false). Saves massive amounts of memory.\\n\\nSUBTOPIC 2: SUBSET GENERATION\\nYou can generate all subsets of an array of size N by counting from 0 to (2^N - 1) in binary, where each bit decides if an element is included."
      }
    ]
  },
  {
    id: "math",
    title: "F. Advanced Mathematics",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: MODULAR ARITHMETIC & FAST EXPONENTIATION\\nIn competitive programming, answers get massive and cause integer overflow. We use Modulo (usually 10^9 + 7). Fast Exponentiation calculates (A^B) in O(log B) time using bitwise shifts instead of multiplying B times.\\n\\nSUBTOPIC 2: NUMBER THEORY & COMBINATORICS\\n- Matrix Exponentiation: Can find the Nth Fibonacci number in O(log N) time!\\n- Combinatorics: Calculating nCr (combinations) using factorials and Modular Multiplicative Inverses.\\n- Chinese Remainder Theorem: Solves systems of congruences (e.g., 'Find a number X that leaves remainder 2 when divided by 3, and remainder 3 when divided by 5')."
      }
    ]
  },
  {
    id: "datastructures",
    title: "G. Advanced Data Structures",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: ADVANCED TREES\\n- Red-Black Tree: A highly complex self-balancing BST. It powers \`std::map\` and \`std::set\` in C++.\\n- B-Tree & B+ Tree: Massive trees optimized for disk reads. They power nearly all modern Databases (SQL).\\n\\nSUBTOPIC 2: PROBABILISTIC & STRING STRUCTURES\\n- Bloom Filter: A massive bit array that tells you if an item is DEFINITELY NOT in a set, or POSSIBLY in a set. Extremely fast, saves gigabytes of RAM. Used by web browsers to check malicious URLs.\\n- Rope: A binary tree used to represent massive strings (like text files in a Text Editor), allowing fast insertions and deletions anywhere."
      }
    ]
  },
  {
    id: "geometry",
    title: "H. Computational Geometry",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: CONVEX HULL & LINE SWEEP\\n- Convex Hull: Finds the smallest convex polygon that encloses a set of points (like stretching a rubber band around pegs on a board). Algorithms: Graham Scan or Jarvis March.\\n- Line Sweep Algorithm: Imagine a vertical line sweeping across a 2D plane to efficiently find intersections between hundreds of line segments.\\n\\nSUBTOPIC 2: CLOSEST PAIR OF POINTS\\nUses Divide and Conquer to find the two closest points in a 2D plane in O(N log N) time instead of checking every pair (O(N^2))."
      }
    ]
  },
  {
    id: "miscellaneous",
    title: "I. Miscellaneous",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: MEET IN THE MIDDLE & MO'S ALGORITHM\\n- Meet in the Middle: A search technique that cuts the search space in half (e.g., reducing O(2^40) to O(2^20)).\\n- Mo's Algorithm: Used to process offline range queries. It sorts the queries in a very specific order (Square Root Decomposition) to minimize the amount of work the computer does.\\n\\nSUBTOPIC 2: PERSISTENT DATA STRUCTURES\\nData structures that remember their previous states! A Persistent Segment Tree allows you to query what the array looked like after the 5th update, even if you are currently on the 100th update."
      }
    ]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'advanced_dsa_notes.js'), advancedDsaNotes);
console.log("Created advanced_dsa_notes.js successfully!");
