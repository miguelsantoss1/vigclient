// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '192.168.1.68',
      user: 'root',
      password: '',
      database: 'drc_app_dev',
    },
  },

  staging: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
