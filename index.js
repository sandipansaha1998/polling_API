// Express
const express = require('express');
const port = 8000;
const app = express();

// Database Connection
const db_connection = require('./config/mongoose'); 


// Parsers
app.use(express.urlencoded());
app.use(express.json({ extended: true }));

// Routes
app.use('/',require('./routes'));


// Server
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`Server Failed to start . Error Encountered : ${err} `);
        return;
    }

    console.log(`Server started succesfully`);
})