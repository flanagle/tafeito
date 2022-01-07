import knexLib from 'knex';

const knex = knexLib({
  client: 'pg',
  connection: 'postgres://postgres:postgres@localhost:5432/postgres', //process.env.DATABASE_URL ||
  debug: true
});

export default knex;

export function comUnidadeDeTrabalho () {
  return function (req, res, next) {
    if (req.uow) {
      next();
      return;
    }
    knex.transaction(function (trx) {
      res.on('finish', function () {
        if (res.statusCode < 200 || res.statusCode > 299) {
          trx.rollback();
        } else {
          trx.commit();
        }
      });
      req.uow = trx;
      next();
    });
  }
}
