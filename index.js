// Express
const express = require('express');
const port = 8000;
const app = express();


// Parsers
app.use(express.urlencoded());
app.use(express.json());


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