import mongoose from 'mongoose';

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

export const initializeDbConnection = async () => {
  mongoose.set('strictQuery', false);

  // Connect to the correct environment database
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(prodConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
      console.log('Database connected. Production mode.');
  });
} else {
  mongoose.connect(devConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
  });

  mongoose.connection.on('connected', () => {
      console.log('Database connected. Development mode.');
  });
}

};



