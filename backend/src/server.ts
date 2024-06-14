import express from 'express';
import bodyParser from 'body-parser';
import router from './routes/index.js';
import sequelize from './config/database.js';

const app = express();

app.use(bodyParser.json());
app.use('/api', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
      await sequelize.sync(); // Sync the database when the server starts
      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Failed to sync database:', error);
    }
  });
