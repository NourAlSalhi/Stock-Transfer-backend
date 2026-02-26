import app from './app';
import { sequelize } from './config/database';
import './db/models';
import { runSeeders } from './db/seeders';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();
    
    // await runSeeders(); 
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true }); 
      await runSeeders();
    } else {
      await sequelize.sync(); 
    }


    console.log('DB connected & synced');

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error(err);
  }
})();