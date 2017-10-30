//NOTE: Run this file for initially creating table in the database

const pg     = require('pg');
const dotenv = require('dotenv');

dotenv.load();

//Postgres endpoint
const postgresAddress = 'postgres://'+process.env.POSTGRES_USERNAME+':'+process.env.POSTGRES_PASSWORD+'@localhost:5432/'+process.env.POSTGRES_DATABASE_NAME;

//creating pg client
const client = new pg.Client(postgresAddress);
client.connect();

//Creating table
const query = client.query(
  'CREATE TABLE graph(id SERIAL PRIMARY KEY, name VARCHAR(40) not null, type VARCHAR(50) not null, x int[], y int[]);');

query.on('end', () => { client.end(); });
