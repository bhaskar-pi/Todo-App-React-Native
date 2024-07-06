const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const authenticate = async(request, response, next) => {
    let token;

    const authHeader = request.headers['authorization']
    if (authHeader){
        token = authHeader.split(' ')[1]
    }

    if (!token){
        return response.status(401).json({mesaage: "Invalid token"})
    }

    jwt.verify(token, process.env.TOKEN_SEC_KEY, async(error, payload) => {
        if (error) {
            return response.status(401).json({message: "You're un authorized"})
        }
        request.id = payload.id
        next()
    })

}

module.exports = authenticate