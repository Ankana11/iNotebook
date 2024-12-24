const connectToMongo = require("./db");
const express = require('express')
const app = express()
const port = 5000;
app.use(express.json()); // middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebok Backend listening on port ${port}`)
})
connectToMongo();