import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js'; // Ensure the .js extension
import sequelize from './config/database.js'; // Ensure the .js extension

const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync(); // Sync the database when the server starts
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
});
