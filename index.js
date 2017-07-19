//NOTE: Run table.js file for initially creating table in the database

const pg         = require ('pg');
const http       = require('http');
const path       = require('path');
const dotenv     = require('dotenv');
const express    = require('express');
const bodyParser = require('body-parser');

dotenv.load();

//postgres end point
const postgresAddress = 'postgres://'+process.env.POSTGRES_USERNAME+':'+process.env.POSTGRES_PASSWORD+'@localhost:5432/'+process.env.POSTGRES_DATABASE_NAME;

const app = express();
//creating server
const server = http.createServer(app);

//parsing request body
app.use('/save', bodyParser.json());

app.use('/save', (req, res) => {

    pg.connect(postgresAddress, (err, client, done) => {

        if (err) {
            done();
            console.log(err);
            return res.status(500).json({data : err});
        }

        const query = client.query('INSERT INTO graph(name, type, x, y) values ($1, $2, $3, $4)', 
        [req.body.name, req.body.type, req.body.x, req.body.y]);

        query.on('end', () => {
            done();
            return res.status(200).json({data : "1 Row inserted"});
        });

    });

});

server.listen(3000, err => console.log(err || "Server started successfully"));