const initializeAndConnectDB = require('../db')

let connection;

const verifyDbConnection = async(req, res, next) => {
    try {
        if(!connection){
            connection = await initializeAndConnectDB()
        }
        req.myDB = connection
        next()
    } catch (error) {
        console.error('Failed to initialize database:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = verifyDbConnection