require('dotenv').config()
module.exports={  
    "development": {
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": "Disney",
      "host": "localhost",
      "dialect": "postgres",
      "port":5432
    }
    
  }