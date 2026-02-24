# duckdb

Typesafe DuckDB FFI wrapper for Deno.

## Quick Start

```typescript
import { open, connect, query } from "duckdb";

// Open a database (defaults to in-memory)
using db = open();

// Connect to the database
using conn = connect(db);

// Run queries
const [result] = query(conn, "SELECT * FROM range(10) AS t(i)");

// Iterate over rows
for (const row of result.rows()) {
  console.log(row.get("i"));
}
```

## Installation

No installation required - import directly from Deno:

```typescript
import { open, connect, query } from "jsr:@aspect/duckdb";
```

## Usage

### Opening a Database

```typescript
// In-memory database (default)
using db = open();

// File-based database
using db = open("my.db");
```

### Running Queries

```typescript
using db = open();
using conn = connect(db);

// Simple query
const [result] = query(conn, "SELECT 1 AS num, 'hello' AS str");
const row = result.first();
console.log(row?.get("num"));   // 1
console.log(row?.get("str"));   // "hello"

// Get all rows
const [result] = query(conn, "SELECT * FROM range(5) AS t(x)");
const rows = result.toArray();
```

### Query Chaining

```typescript
const [result] = query(conn, "SELECT * FROM range(100) AS t(x)");

const filtered = result
  .filter(row => (row.get("x") as number) > 50)
  .limit(10)
  .map(row => ({ value: row.get("x") }))
  .toArray();
```

### Prepared Statements

```typescript
const [stmt] = prepare(conn, "SELECT * FROM range(?) AS t(x) WHERE x > ?");

// Execute with parameters
const [result] = executePrepared(stmt, [5, 2]);
```

### Type Safety

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// With proper typing
const [result] = query(conn, "SELECT id, name, email FROM users");
const users = result.map(row => ({
  id: row.get<number>("id")!,
  name: row.get<string>("name")!,
  email: row.get<string>("email")!,
})).toArray();
```

## API

### Database

- `open(path?: string)` - Open a database, returns `DatabaseHandle`
- `close(db)` - Close a database

### Connection

- `connect(db)` - Create a connection, returns `ConnectionHandle`
- `disconnect(conn)` - Close a connection
- `query(conn, sql)` - Execute a query, returns `DataResult`
- `prepare(conn, sql)` - Prepare a statement, returns `PreparedStatementHandle`

### DataResult

- `.rows()` - Lazy row iterator
- `.toArray()` - Materialize all rows
- `.first()` - Get first row
- `.map(fn)` - Transform rows
- `.filter(fn)` - Filter rows
- `.limit(n)` - Limit rows
- `.offset(n)` - Skip rows
- `.columns()` - Get column names
- `.types()` - Get column types
- `.destroy()` - Free memory

### ResultRow

- `.get(key)` - Get column value by name
- `.has(key)` - Check if column exists
- `.keys()` - Get column names
- `.toObject()` - Convert to plain object

## Requirements

- Deno 1.37+
- DuckDB native library (auto-downloaded on first use)

## Development

```bash
# Download DuckDB native library
deno task download

# Generate FFI bindings from C headers
deno task generate

# Run tests
deno task test

# Full build
deno task build
```
