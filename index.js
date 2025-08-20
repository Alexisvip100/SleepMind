const express = require('express');
const routes = require('routes');
const cors = require('cors');
const app = express();
app.use(routes);
app.use(cors);
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
