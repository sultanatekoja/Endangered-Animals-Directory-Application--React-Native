const app = require('express')();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log('Its alive on http://localhost:${PORT}')
)