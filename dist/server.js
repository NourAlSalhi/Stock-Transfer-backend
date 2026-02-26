import app from './app';
import { sequelize } from './config/database';
import './db/models';
import { runSeeders } from './db/seeders';
const PORT = process.env.PORT || 3000;
(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await runSeeders();
        console.log('DB connected & synced');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
    catch (err) {
        console.error(err);
    }
})();
