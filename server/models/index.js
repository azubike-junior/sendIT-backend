import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import {
    dbConfig
} from '../configs/config'
import dotenv from 'dotenv';

dotenv.config();

const env = 'production' || 'development'
const config = dbConfig[env];

const configPath = env === 'development' ? config.url : config.url
console.log('config:', configPath)

// const prod_config = dbConfig.production.connectionString
// const dev_config = dbConfig.development.connectionString
// const env = 'development' || 'production'

// const configPath = env === 'production' ? prod_config : dev_config

let sequelize;
sequelize = env === 'development' ? new Sequelize(configPath, {
    dialect: 'postgres',
    host: 'localhost',
    logging: false
}) : new Sequelize(configPath, {
    dialect: 'postgres'
})

const db = {};

fs.readdirSync(__dirname).filter(file => {
    return (file.indexOf('.') !== 0 && file !== 'index.js');
}).forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model
});

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;