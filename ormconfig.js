/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-11 18:10
*****************************************************************************************/

// --- GET A CURRENT URL
const isTestEnvironment = process.env.PORT === '5001';

console.log(`🔵 isTestEnvironment: ${isTestEnvironment}`);

module.exports = {
  type: 'sqlite',
  database: isTestEnvironment ? './src/database/database.test.sqlite' : './src/database/database.sqlite',
  entities: [
    isTestEnvironment
      ? 'src/entities/*.ts'
      : 'build/entities/*.js'
  ],
  migrations: [
    isTestEnvironment
      ? 'src/database/migrations/*.ts'
      : 'build/database/migrations/*.js'

  ],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/entities'
  }
}