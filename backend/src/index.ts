import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import sequelize from './config/database.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3100;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.sync(); // Sync the database when the server starts
    console.log('Database synced successfully.');
    const tables = await sequelize.getQueryInterface().showAllSchemas();
    console.log('Current database tables:', tables);
  } catch (error) {
    console.error('Failed to sync database:', error);
  }
});
