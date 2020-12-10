const express = require('express');
const userRouter = require('./users/userRouter');
const logger = require('./middleware/logger');

const server = express();
const port = process.env.PORT || 4000;

server.use(express.json());
server.use(logger());

server.use(userRouter);

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: 'Something went wrong, please try later, or contact us.'
    })
})

server.listen(port, () => {
    console.log(`Server listening on ${port}`)
})
