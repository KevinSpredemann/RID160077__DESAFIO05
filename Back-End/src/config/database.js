const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("library_db.sqlite", (err) => {
  if (err) {
    console.error("Error connecting to the library database:", err.message);
  } else console.log("Connected to the library database.");
});

export default db;