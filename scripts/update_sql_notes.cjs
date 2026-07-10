const fs = require('fs');
const path = require('path');

const sqlNotes = `export const sqlNotesData = [
  {
    id: "fundamentals",
    title: "A. Database Fundamentals",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: INTRODUCTION TO DATABASES\\nA Database is an organized collection of data. A DBMS (Database Management System) is the software used to manage it. An RDBMS (Relational DBMS) stores data in structured tables (rows and columns) and enforces relationships between them (e.g., MySQL, PostgreSQL, Oracle).\\n\\nSUBTOPIC 2: ARCHITECTURE & MODELS\\nDatabases generally follow a Client-Server Architecture (1-tier, 2-tier, or 3-tier). Data models define how data is connected: Relational (tables), Hierarchical (tree-like), Network (graph-like), and Object-Oriented."
      }
    ]
  },
  {
    id: "commands",
    title: "B. SQL Commands & Data Types",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SQL COMMAND CATEGORIES\\n- DDL (Data Definition Language): Defines structure. (CREATE, ALTER, DROP, TRUNCATE, RENAME)\\n- DML (Data Manipulation Language): Modifies data. (INSERT, UPDATE, DELETE)\\n- DQL (Data Query Language): Retrieves data. (SELECT)\\n- DCL (Data Control Language): Permissions. (GRANT, REVOKE)\\n- TCL (Transaction Control Language): Manages changes. (COMMIT, ROLLBACK, SAVEPOINT)"
      },
      {
        type: "code",
        title: "DDL & DML Examples",
        code: \`-- DDL: Create a new table
CREATE TABLE Employees (
    EmpID INT PRIMARY KEY,
    Name VARCHAR(50),
    Salary DECIMAL(10, 2)
);

-- DML: Insert and Update data
INSERT INTO Employees (EmpID, Name, Salary) 
VALUES (1, 'Alice', 75000.00);

UPDATE Employees 
SET Salary = 80000.00 
WHERE EmpID = 1;\`
      }
    ]
  },
  {
    id: "filtering",
    title: "C. Filtering, Sorting & Operators",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SELECT & DISTINCT\\nThe SELECT statement fetches data. DISTINCT ensures only unique values are returned.\\n\\nSUBTOPIC 2: FILTERING (WHERE) & SORTING (ORDER BY)\\nThe WHERE clause restricts results based on conditions. You can use Arithmetic (+, -, *, /), Comparison (=, <>, >, <), and Logical Operators (AND, OR, NOT). LIMIT/TOP restricts the number of rows returned.\\n\\nSUBTOPIC 3: ADVANCED OPERATORS\\n- BETWEEN: Selects within a range.\\n- IN: Matches any value in a list.\\n- LIKE: Pattern matching using wildcards (% for zero/more chars, _ for exactly one char).\\n- IS NULL: Checks for missing data."
      },
      {
        type: "code",
        title: "Advanced Filtering Example",
        code: \`-- Find all active IT employees earning between 60k and 100k, ordered by highest salary
SELECT EmpID, Name, Salary, Department
FROM Employees
WHERE Department IN ('IT', 'Engineering')
  AND Salary BETWEEN 60000 AND 100000
  AND Name LIKE 'A%' -- Name starts with 'A'
ORDER BY Salary DESC
LIMIT 5;\`
      }
    ]
  },
  {
    id: "functions",
    title: "D. Functions & Grouping",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: AGGREGATE FUNCTIONS & GROUP BY\\nAggregates summarize data: COUNT(), SUM(), AVG(), MIN(), MAX(). The GROUP BY clause groups rows that have the same values into summary rows. The HAVING clause is used instead of WHERE to filter these grouped records.\\n\\nSUBTOPIC 2: SCALAR FUNCTIONS & CASE\\nString, Numeric, and Date/Time functions modify single values (e.g., UPPER(), ROUND(), GETDATE()). The CASE expression acts like an IF-THEN-ELSE statement directly inside SQL."
      },
      {
        type: "code",
        title: "GROUP BY, HAVING, and CASE",
        code: \`-- Find departments with an average salary over 70,000
SELECT Department, AVG(Salary) AS AverageSalary, COUNT(*) AS TotalEmployees
FROM Employees
GROUP BY Department
HAVING AVG(Salary) > 70000;

-- Using CASE to categorize salaries
SELECT Name, Salary,
  CASE
    WHEN Salary > 100000 THEN 'High Earner'
    WHEN Salary BETWEEN 50000 AND 100000 THEN 'Mid Earner'
    ELSE 'Low Earner'
  END AS SalaryCategory
FROM Employees;\`
      }
    ]
  },
  {
    id: "keys",
    title: "E. Constraints & Database Keys",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: CONSTRAINTS\\nRules enforced on data columns to ensure reliability.\\n- NOT NULL: Cannot be empty.\\n- UNIQUE: All values must be different.\\n- CHECK: Values must satisfy a condition (e.g., Age >= 18).\\n- DEFAULT: Sets a default value.\\n\\nSUBTOPIC 2: DATABASE KEYS\\n- Primary Key: Uniquely identifies a row. (Not Null + Unique).\\n- Foreign Key: Links to the Primary Key of another table, enforcing Referential Integrity.\\n- Candidate/Super/Composite/Alternate Keys: Various ways to uniquely identify records, often using multiple columns together."
      }
    ]
  },
  {
    id: "joins",
    title: "F. Joins & Relationships",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SQL JOINS\\nJoins combine rows from two or more tables based on a related column.\\n- INNER JOIN: Returns records with matching values in both tables.\\n- LEFT JOIN: Returns ALL records from the left table, and matched records from the right.\\n- RIGHT JOIN: Returns ALL records from the right table.\\n- FULL OUTER JOIN: Returns all records when there is a match in either left or right.\\n- CROSS JOIN: Returns the Cartesian product (every row multiplied by every row).\\n- SELF JOIN: A regular join, but the table is joined with itself."
      },
      {
        type: "code",
        title: "INNER vs LEFT JOIN",
        code: \`-- INNER JOIN: Only get employees who HAVE a department assigned
SELECT Employees.Name, Departments.DeptName
FROM Employees
INNER JOIN Departments ON Employees.DeptID = Departments.ID;

-- LEFT JOIN: Get ALL employees, even if they don't have a department assigned yet
SELECT Employees.Name, Departments.DeptName
FROM Employees
LEFT JOIN Departments ON Employees.DeptID = Departments.ID;\`
      }
    ]
  },
  {
    id: "subqueries",
    title: "G. Subqueries & Set Operations",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: SUBQUERIES\\nA query nested inside another query.\\n- Nested Subqueries: Execute once and pass the result to the outer query.\\n- Correlated Subqueries: Execute repeatedly, once for each row evaluated by the outer query.\\n\\nSUBTOPIC 2: SET OPERATIONS\\nCombine the result sets of two or more SELECT statements.\\n- UNION: Combines distinct results.\\n- UNION ALL: Combines results, keeping duplicates.\\n- INTERSECT: Returns only rows found in BOTH queries.\\n- EXCEPT / MINUS: Returns rows from the first query that are NOT in the second query."
      }
    ]
  },
  {
    id: "advancedsql",
    title: "H. Advanced SQL",
    icon: "Code2",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: VIEWS, PROCEDURES & TRIGGERS\\n- Views: Virtual tables based on a query. Used for security and simplification.\\n- Stored Procedures: Precompiled, reusable SQL code blocks that accept parameters.\\n- Triggers: Code that executes automatically in response to certain events (INSERT/UPDATE/DELETE).\\n\\nSUBTOPIC 2: CTEs & WINDOW FUNCTIONS\\n- Common Table Expressions (CTE): Temporary result sets using the 'WITH' keyword. Recursive CTEs are used to query hierarchical data (like org charts).\\n- Window Functions: Perform calculations across a set of rows related to the current row, WITHOUT collapsing them like GROUP BY does (e.g., ROW_NUMBER(), RANK(), LEAD(), LAG())."
      },
      {
        type: "code",
        title: "CTEs & Window Functions",
        code: \`-- Common Table Expression (CTE)
WITH HighEarners AS (
    SELECT EmpID, Name, Salary FROM Employees WHERE Salary > 90000
)
SELECT * FROM HighEarners;

-- Window Function: Rank employees by salary within their department
SELECT Name, Department, Salary,
       RANK() OVER(PARTITION BY Department ORDER BY Salary DESC) as DeptRank
FROM Employees;\`
      }
    ]
  },
  {
    id: "normalization",
    title: "I. Database Design & Normalization",
    icon: "Database",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: ER DIAGRAMS & SCHEMA DESIGN\\nEntity-Relationship (ER) Models visually map out how data is structured. Schema design involves choosing correct data types, keys, and relationships (One-to-One, One-to-Many, Many-to-Many).\\n\\nSUBTOPIC 2: NORMALIZATION\\nThe process of organizing data to reduce redundancy and improve integrity.\\n- 1NF: Atomic values (no repeating groups).\\n- 2NF: 1NF + No partial dependencies.\\n- 3NF: 2NF + No transitive dependencies.\\n- BCNF / 4NF / 5NF: Advanced normalization for highly complex edge cases.\\nDenormalization is intentionally adding redundancy back to improve read performance."
      }
    ]
  },
  {
    id: "transactions",
    title: "J. Transactions, Concurrency & Security",
    icon: "Cpu",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: ACID PROPERTIES\\nTransactions must be Atomic (All or Nothing), Consistent, Isolated, and Durable.\\n\\nSUBTOPIC 2: CONCURRENCY CONTROL & LOCKS\\nWhen multiple users edit data simultaneously, the DB uses Locks (Shared, Exclusive) to prevent corruption. Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) dictate how strictly locks are applied. Deadlocks occur when two transactions infinitely wait for each other's locks.\\n\\nSUBTOPIC 3: SECURITY\\nManaged via Users & Roles, encrypting data, and implementing solid Backup/Restore policies."
      }
    ]
  },
  {
    id: "performance",
    title: "K. Performance, Indexes & Architecture",
    icon: "Layers",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: INDEXES & QUERY OPTIMIZATION\\nIndexes dramatically speed up data retrieval at the cost of slower writes (INSERT/UPDATE).\\n- Clustered Index: Physically sorts the data on the disk (only 1 allowed per table).\\n- Non-Clustered Index: A separate lookup structure with pointers to the data.\\nQuery Optimization involves reading Execution Plans to find bottlenecks and missing indexes.\\n\\nSUBTOPIC 2: SCALING\\n- Partitioning: Splitting massive tables into smaller, logical pieces on the same server.\\n- Replication: Copying the database to multiple servers (Master-Slave).\\n- Sharding: Physically splitting data across completely different servers."
      }
    ]
  },
  {
    id: "nosql",
    title: "L. NoSQL, Data Warehousing & Modern DBs",
    icon: "Terminal",
    content: [
      {
        type: "paragraph",
        text: "SUBTOPIC 1: DATA WAREHOUSING & ETL\\nOLTP (Online Transaction Processing) handles day-to-day inserts. OLAP (Online Analytical Processing) handles massive historical data analysis. The ETL (Extract, Transform, Load) process moves data from OLTP to OLAP Warehouses.\\n\\nSUBTOPIC 2: NOSQL & DISTRIBUTED DATABASES\\nNoSQL discards strict tables for massive horizontal scaling.\\n- MongoDB: Document store (JSON).\\n- Redis: In-memory Key-Value store (insanely fast caching).\\n- Cassandra: Wide-column store.\\n- Firebase: Real-time DB.\\n\\nSUBTOPIC 3: CAP THEOREM & BASE\\nIn distributed systems, CAP Theorem states you can only choose 2 out of 3: Consistency, Availability, Partition Tolerance. NoSQL usually chooses AP and follows BASE properties (Basically Available, Soft state, Eventual consistency) rather than strict ACID."
      }
    ]
  }
];`;

fs.writeFileSync(path.join(__dirname, 'src', 'data', 'sql_notes.js'), sqlNotes);
console.log("Created sql_notes.js successfully!");
