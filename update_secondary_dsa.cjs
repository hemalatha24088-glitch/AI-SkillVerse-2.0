const fs = require('fs');
const path = require('path');

const secondaryDsaNotes = `export const secondaryDsaNotesData = [
  {
    id: "linkedlists",
    title: "A. Linked Lists",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SINGLY LINKED LIST\\nUnlike arrays, linked lists do not store elements contiguously. Each element (a Node) stores data and a pointer to the NEXT node. This allows for O(1) insertion/deletion at the head, but O(N) random access.\\n\\nSUBTOPIC 2: DOUBLY & CIRCULAR LINKED LISTS\\n- Doubly Linked List: Each node has a pointer to the NEXT node AND the PREVIOUS node, allowing backward traversal.\\n- Circular Linked List: The last node points back to the head, creating an infinite loop."
      },
      {
        type: "code",
        title: "Singly Linked List Implementation",
        code: \`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) { data = val; next = nullptr; }
};

int main() {
    Node* head = new Node(10);
    head->next = new Node(20);
    head->next->next = new Node(30);
    
    // Traversal
    Node* temp = head;
    while(temp != nullptr) {
        cout << temp->data << " -> ";
        temp = temp->next;
    }
    cout << "NULL";
    return 0;
}\`
      }
    ]
  },
  {
    id: "stack",
    title: "B. Stack",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: STACK IMPLEMENTATION\\nA Stack follows LIFO (Last In, First Out). Think of a stack of plates; you can only add or remove from the top. Operations: push(), pop(), top() are all O(1).\\n\\nSUBTOPIC 2: EXPRESSION EVALUATION & NEXT GREATER ELEMENT\\nStacks are perfect for evaluating mathematical expressions (like Postfix/Prefix) and balancing parentheses. The 'Next Greater Element' is a famous problem solved efficiently in O(N) using a Monotonic Stack (a stack that strictly increases or decreases)."
      },
      {
        type: "code",
        title: "Next Greater Element (Monotonic Stack)",
        code: \`#include <vector>
#include <stack>
using namespace std;

vector<int> nextGreaterElement(vector<int>& arr) {
    int n = arr.size();
    vector<int> result(n, -1);
    stack<int> s; // Stores INDICES
    
    for (int i = 0; i < n; i++) {
        // While stack is not empty and current element is greater than element at stack top
        while (!s.empty() && arr[i] > arr[s.top()]) {
            result[s.top()] = arr[i];
            s.pop();
        }
        s.push(i);
    }
    return result;
}\`
      }
    ]
  },
  {
    id: "queue",
    title: "C. Queue",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: QUEUE & CIRCULAR QUEUE\\nA Queue follows FIFO (First In, First Out), like a line at a ticket counter. A Circular Queue wraps around to the beginning of the array to save space when elements are dequeued.\\n\\nSUBTOPIC 2: DEQUE & PRIORITY QUEUE\\n- Deque (Double Ended Queue): Allows insertion and deletion at BOTH ends.\\n- Priority Queue: Elements are removed based on priority (highest or lowest value) rather than insertion order. Implemented using Heaps."
      }
    ]
  },
  {
    id: "trees",
    title: "D. Trees",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: BINARY TREE & TRAVERSALS\\nA Binary Tree is a hierarchical structure where each node has at most two children (Left and Right). Traversals include:\\n- Pre-order (Root, Left, Right)\\n- In-order (Left, Root, Right) -> Prints sorted in a BST!\\n- Post-order (Left, Right, Root)\\n\\nSUBTOPIC 2: BINARY SEARCH TREE (BST) & AVL TREES\\nA BST ensures the left child is smaller and right child is larger than the root. This allows O(log N) searching. An AVL Tree is a Self-Balancing BST that prevents the tree from becoming a skewed line (O(N) worst case).\\n\\nSUBTOPIC 3: ADVANCED TREE CONCEPTS\\n- Lowest Common Ancestor (LCA): Finding the deepest shared parent of two nodes.\\n- Diameter of Tree: The longest path between ANY two nodes in the tree."
      },
      {
        type: "code",
        title: "In-Order Traversal & LCA",
        code: \`struct TreeNode {
    int val;
    TreeNode *left, *right;
};

// 1. In-order Traversal (Recursive)
void inorder(TreeNode* root) {
    if (!root) return;
    inorder(root->left);
    cout << root->val << " ";
    inorder(root->right);
}

// 2. Lowest Common Ancestor (BST)
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (root->val > p->val && root->val > q->val) 
        return lowestCommonAncestor(root->left, p, q);
    if (root->val < p->val && root->val < q->val) 
        return lowestCommonAncestor(root->right, p, q);
    return root; // Split point!
}\`
      }
    ]
  },
  {
    id: "heap",
    title: "E. Heap",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: MIN HEAP & MAX HEAP\\nA Heap is a complete binary tree. In a Max Heap, the parent is ALWAYS greater than its children (Root is the maximum). In a Min Heap, the parent is ALWAYS smaller (Root is the minimum).\\n\\nSUBTOPIC 2: HEAP SORT & PRIORITY QUEUE\\nC++ provides \`priority_queue\` which acts as a Max Heap by default. Inserting/Deleting takes O(log N), while fetching the max/min takes O(1). Heap Sort uses this property to sort arrays in O(N log N) time."
      }
    ]
  },
  {
    id: "trie",
    title: "F. Trie",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: TRIE BASICS\\nA Trie (Prefix Tree) is a specialized tree used to store massive amounts of strings. Searching for a word like 'APPLE' takes O(L) time, where L is the length of the word, entirely independent of how many millions of words are in the dictionary!\\n\\nSUBTOPIC 2: WORD SEARCH\\nTries are heavily used in Auto-complete systems, Spell Checkers, and Boggle-style Word Search games."
      }
    ]
  },
  {
    id: "graphs",
    title: "G. Graphs",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: REPRESENTATION & BFS/DFS\\nGraphs represent connections (like cities and roads). They are represented using Adjacency Matrices or Adjacency Lists. \\n- BFS (Breadth-First Search) uses a Queue to explore layer by layer (best for Shortest Path).\\n- DFS (Depth-First Search) uses a Stack (or recursion) to explore as deep as possible.\\n\\nSUBTOPIC 2: ADVANCED GRAPH ALGORITHMS\\n- Connected Components: Finding islands of disconnected graphs.\\n- Cycle Detection: Ensuring a graph has no infinite loops.\\n- Bipartite Graph: Can the graph be colored with just 2 colors without touching?\\n- Topological Sorting: Ordering tasks based on dependencies (e.g., Course Prerequisites)."
      },
      {
        type: "code",
        title: "Breadth-First Search (BFS)",
        code: \`#include <vector>
#include <queue>
using namespace std;

void bfs(int startNode, vector<vector<int>>& adjList) {
    vector<bool> visited(adjList.size(), false);
    queue<int> q;
    
    q.push(startNode);
    visited[startNode] = true;
    
    while (!q.empty()) {
        int node = q.front();
        q.pop();
        
        cout << node << " ";
        
        // Visit neighbors
        for (int neighbor : adjList[node]) {
            if (!visited[neighbor]) {
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
}\`
      }
    ]
  },
  {
    id: "sorting",
    title: "H. Sorting Algorithms (N log N)",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: MERGE SORT\\nA Divide & Conquer algorithm. It splits the array in half continuously until every element is separated, then merges them back together in sorted order. Time Complexity: O(N log N). Space Complexity: O(N).\\n\\nSUBTOPIC 2: QUICK SORT\\nPicks a 'Pivot' element and partitions the array so everything smaller is on the left and everything larger is on the right, then recurses. Extremely fast in practice, but worst-case time is O(N^2)."
      }
    ]
  },
  {
    id: "divideconquer",
    title: "I. Divide & Conquer",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: DIVIDE AND CONQUER PROBLEMS\\nThe paradigm behind Merge Sort and Binary Search. The core steps are:\\n1. DIVIDE the problem into smaller sub-problems.\\n2. CONQUER the sub-problems recursively.\\n3. COMBINE the results to form the final answer."
      }
    ]
  },
  {
    id: "greedy",
    title: "J. Greedy Algorithms",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: THE GREEDY APPROACH\\nGreedy algorithms make the locally optimal choice at each step with the hope of finding a global optimum. They don't look back.\\n\\nSUBTOPIC 2: CLASSIC GREEDY PROBLEMS\\n- Activity Selection / Job Scheduling: Sort by end time and greedily pick non-overlapping tasks.\\n- Fractional Knapsack: Sort items by value-to-weight ratio and take as much of the highest ratio as possible.\\n- Huffman Coding: Used for data compression (ZIP files) by assigning shorter binary codes to more frequent characters."
      }
    ]
  },
  {
    id: "backtracking",
    title: "K. Backtracking",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: THE BACKTRACKING PARADIGM\\nBacktracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally. If a path fails, you 'backtrack' (undo the move) and try another path.\\n\\nSUBTOPIC 2: CLASSIC PROBLEMS\\n- N-Queens: Place N queens on a chessboard so none attack each other.\\n- Sudoku Solver: Try placing 1-9; if it breaks rules, backtrack.\\n- Rat in a Maze: Find a path from Start to Finish.\\n- Permutations & Combinations: Generating all possible combinations of an array."
      },
      {
        type: "code",
        title: "Generating Permutations (Backtracking)",
        code: \`#include <vector>
using namespace std;

void backtrack(vector<int>& nums, vector<vector<int>>& result, int start) {
    if (start == nums.size()) {
        result.push_back(nums); // Found a valid permutation
        return;
    }
    
    for (int i = start; i < nums.size(); i++) {
        swap(nums[start], nums[i]); // Choose
        backtrack(nums, result, start + 1); // Explore
        swap(nums[start], nums[i]); // Un-choose (BACKTRACK!)
    }
}

vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> result;
    backtrack(nums, result, 0);
    return result;
}\`
      }
    ]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'secondary_dsa_notes.js'), secondaryDsaNotes);
console.log("Created secondary_dsa_notes.js successfully!");
