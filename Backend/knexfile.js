
export const development = {
  client: 'postgresql',
  connection: 'postgres://postgres:postgres@localhost:5432/postgres', //process.env.DATABASE_URL ||
  migrations: {
    tableName: 'knex_migrations'
  }
};
