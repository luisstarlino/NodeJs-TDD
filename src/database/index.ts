/*****************************************************************************************
* @Author: Luis Starlino
* @Date: 2025-01-11 18:50
*****************************************************************************************/
import { Connection, createConnection, getConnectionOptions } from 'typeorm'

// --- GET A CURRENT URL
const isTestEnvironment = process.env.PORT === '5001';

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      database: isTestEnvironment
        ? './src/database/database.test.sqlite'
        : defaultOptions.database
    })
  )
}