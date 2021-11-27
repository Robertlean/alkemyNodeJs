require('dotenv').config()
module.exports={  
    "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": "Disney",
    "host": process.env.HOST,
    "dialect": "postgres",
    "port":5432
    }
    
  }