// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://localhost/lulueats'/*{
      database: 'postgres://qchtcljolicwca:5e94df15934be7843cda7a786b5e1e73764e24f60dee01d7e833fa32b8234890@ec2-50-19-232-205.compute-1.amazonaws.com:5432/d9s5b5spfr1e8',
      user:     'qchtcljolicwca',
      password: '5e94df15934be7843cda7a786b5e1e73764e24f60dee01d7e833fa32b8234890'
    }*/
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }

};
