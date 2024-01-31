const mysql = require('mysql2/promise');

const config = {
    host: 'schooldb.cl8qkmmocwe7.eu-west-3.rds.amazonaws.com',
    port: 3306,
    database: 'schooldb',
    user: 'admin',
    password: 'School!!',
    connectTimeout: 60000,
};

// // Connect to the metrics_dev database
// const metricsConnection = mysql.createConnection(config);

// metricsConnection.connect()
//     .then(() => {
//         console.log(`Connected to the ${config.database} database!`);
//         // Execute the SQL statements to create the tables
//         const createTablesQuery = `
//             -- Table: manners
//             CREATE TABLE IF NOT EXISTS manners (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//             );
//             -- Table: manner_marks
//             CREATE TABLE IF NOT EXISTS manner_marks (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//             );
//             -- Table: subjects
//             CREATE TABLE IF NOT EXISTS subjects (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//             );
//             -- Table: subject_marks
//             CREATE TABLE IF NOT EXISTS subject_marks (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//             );
//             -- Table: assessments
//             CREATE TABLE IF NOT EXISTS assessments (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(200),
//             );
//             -- Table: subject_assessments
//             CREATE TABLE IF NOT EXISTS assessments (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 assessment_id INT,
//                 subject_id INT,
//                 FOREIGN KEY (assessment_id) REFERENCES assessments(id)
//                 FOREIGN KEY (subject_id) REFERENCES subjects(id)
//             );
//             -- Table: teachers
//             CREATE TABLE IF NOT EXISTS teachers (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//                 password INT,
//                 admin INT,
//             );
//             -- Table: students
//             CREATE TABLE IF NOT EXISTS students (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 name VARCHAR(45),
//                 grade_id INT,
//                 FOREIGN KEY (grade_id) REFERENCES grades(id),
//             );
//             -- Table: grade
//             CREATE TABLE IF NOT EXISTS grade (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 num INT,
//                 year INT,
//             );
//             -- Table: period
//             CREATE TABLE IF NOT EXISTS usage_per_site (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 year INT,
//             );
//             -- Table: student_per_manners
//             CREATE TABLE IF NOT EXISTS student_per_manners (
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 student_id INT,
//                 manner_id INT,
//                 mark_id INT,
//                 period_id INT,
//                 FOREIGN KEY (student_id) REFERENCES students(id)
//                 FOREIGN KEY (manner_id) REFERENCES manners(id)
//                 FOREIGN KEY (mark_id) REFERENCES manner_marks(id)
//                 FOREIGN KEY (period_id) REFERENCES period(id)
//             );
//             -- Table: student_per_subjects
//             CREATE TABLE IF NOT EXISTS student_per_subjects(
//                 id INT AUTO_INCREMENT PRIMARY KEY,
//                 student_id INT,
//                 subject_id INT,
//                 mark_id INT,
//                 period_id INT,
//                 assessment_id INT,
//                 behavior INT,
//                 listening INT,
//                 home_work INT,
//                 FOREIGN KEY (student_id) REFERENCES students(id)
//                 FOREIGN KEY (subject_id) REFERENCES subjects(id)
//                 FOREIGN KEY (mark_id) REFERENCES subject_marks(id)
//                 FOREIGN KEY (period_id) REFERENCES period(id)
//                 FOREIGN KEY (assessment_id) REFERENCES subject_assessmens(id)
//             );
//         `;
//         return metricsConnection.query(createTablesQuery);
//     })
//     .then(() => {
//         console.log('Tables created successfully!');
//     })
//     .catch((error) => {
//         console.error('Error creating tables:', error);
//     })
//     .finally(() => {
//         metricsConnection.end(); // Close the connection to the metrics_dev database
//         console.log(`Disconnected from the ${config.database} database!`);
//     });
// Create a pool of connections
const pool = mysql.createPool(config);

// Acquire a connection from the pool
pool.getConnection()
    .then(async (connection) => {
        console.log(`Connected to the ${config.database} database!`);

        try {
            // Execute the SQL statements to create the tables
            const createTablesQuery = `
                -- Your SQL statements here
            `;

            await connection.query(createTablesQuery);
            console.log('Tables created successfully!');
        } catch (error) {
            console.error('Error creating tables:', error);
        } finally {
            // Release the connection back to the pool
            connection.release();
            console.log(`Disconnected from the ${config.database} database!`);
        }
    })
    .catch((error) => {
        console.error('Error connecting to the database:', error);
    })
    .finally(() => {
        // Close the connection pool
        pool.end();
    });