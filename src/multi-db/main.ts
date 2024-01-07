import { ContextStrategy } from './db/strategies/base/context';
import { Postgres } from './db/strategies/postgres';
import { MongoDB } from './db/strategies/mongodb';

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create(1)
const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create(1)

// contextMongo.read()