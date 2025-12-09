// import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: process.env.NEXT_PUBLIC_DB_HOST || 'localhost',
//   user: process.env.NEXT_PUBLIC_DB_USER || 'root',
//   password: process.env.NEXT_PUBLIC_DB_PASSWORD || '',
//   database: process.env.NEXT_PUBLIC_DB_DATABASE,
//   port: process.env.NEXT_PUBLIC_DB_PORT ? parseInt(process.env.NEXT_PUBLIC_DB_PORT) : 3306,
// });

// export default pool;

// import mysql from 'mysql2/promise';
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//  
// });

// export default pool;

import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 20,
  queueLimit: 0,
});

export default pool;
