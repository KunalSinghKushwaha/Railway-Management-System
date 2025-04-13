import  {Sequelize}  from "sequelize";
import dotenv from "dotenv";
dotenv.config();



console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? " Loaded" : " Not Loaded");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_DIALECT:", process.env.DB_DIALECT);


const sequelize = new Sequelize(
  process.env.DB_NAME,       
  process.env.DB_USER,        
  process.env.DB_PASSWORD  ,  
  {  
    host: process.env.DB_HOST,   
    dialect: "postgres", 
    port: process.env.DB_PORT || 5432, 
    
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Database Connected Successfully!");
  } catch (error) {
    console.error(" Database Connection Failed:", error.message);
  }
};

export { sequelize,connectDB };
export const query = (sql, options) => sequelize.query(sql, options);

