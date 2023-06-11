const sqlite3 = require('sqlite3').verbose();
const { readFileSync, unlinkSync, link, writeFileSync } = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'test.db');

// Connect to database
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
    if(err) return console.error(err.message);
});

// db.run(`
// CREATE TABLE user (
//     email VARCHAR(320) PRIMARY KEY,
//     name,
//     password)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// CREATE TABLE greenhouse (
//     id VARCHAR(36) PRIMARY KEY,
//     name,
//     photo)
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// CREATE TABLE user_greenhouse (
//     greenhouse_id VARCHAR(36),
//     user_email VARCHAR(320),
//     PRIMARY KEY (greenhouse_id, user_email),
//     FOREIGN KEY (user_email) REFERENCES user (email),
//     FOREIGN KEY (greenhouse_id) REFERENCES greenhouse (id))
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO user (email, name, password) VALUES 
// ('test@gmail.mx', 'Test User', 'a4ayc/80/OGda4BO/1o/V0etpOqiLx1JwB5S3beHW0s=')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO greenhouse (id, name, photo) VALUES
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'Invernadero de fresas', 'https://cdn.shopify.com/s/files/1/0069/5854/6980/products/Sigma20_557x376.jpg?v=1660818069')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

// db.run(`
// INSERT INTO user_greenhouse (greenhouse_id, user_email) VALUES 
// ('2ebf8606-a8f1-44a4-8315-063652ad70ec', 'test@gmail.mx')
// `, [], (err) => {
//     if(err) return console.error(err.message);
// });

db.all('select * from user_greenhouse', [], (err, data) => {
    console.log(data);
});


// db.run(``, [], (err) => {
//     if(err) return console.error(err.message);
// });






// Insert data

// sql = `INSERT INTO users (email, name, password) VALUES (?,?,?)`;
// db.run(sql, ['a@gmail.com', 'pepe', '12345pass'], (err) => {
//     if(err) return console.error(err.message);
// });

// db.all(`SELECT * FROM users`, [], (err, rows) => {
//     if(err) return console.error(err.message);
//     console.log(rows);
// });
// db.run(`DROP TABLE users`);