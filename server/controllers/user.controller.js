const brcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const { convertKeysToCamelCase } = require('../utils')

dotenv.config()

const registerUser = async(request, response) => {
    const {username, password, name} = request.body
    try {
        const db = request.myDB
        const [existingUser] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username])

        if (existingUser.length > 0){
            return response.status(400).json({success: false, message: "User already exists."})
        }

        const hashedPassword = await brcrypt.hash(password, 10)

        await db.execute(`INSERT INTO users (username, password, name) VALUES(?, ?, ?)`, [username, hashedPassword, name])
        response.status(201).json({ success: true, message: "User registered successfully."})
    } catch (error) {
        response.status(500).json({success: false, message: "Internal server error"})
        console.log("error at registering", error)
    }
}

const loginUser = async(request, response) => {
    const {username, password} = request.body

    try {
        const db = request.myDB
        const [user] = await db.execute(`SELECT * FROM users WHERE username = ?`, [username])
        if (user.length === 0){
            return response.status(400).json({success: false, message: "User not registered."})
        }

        const data = user[0]
        const isPasswordMatched = await brcrypt.compare(password, data.password)
        if (!isPasswordMatched){
            return response.status(400).json({ success: false, message: "Incorrect Password"})
        }

        const payload = {
            id: data.user_id
        }

        jwt.sign(payload, process.env.TOKEN_SEC_KEY, { expiresIn: 3600 }, (error, token) => {
            if(error) throw error;
            response.status(200).json({ success: true, token})
        })
    } catch (error) {
        response.status(500).json({success: false, message: "Internal server error"})
        console.log('error at login', error)
    }
}

const getUserDetails = async(request, response) => {
    const id = request.id 
    const db = request.myDB

    try {
        const [results] = await db.execute(`SELECT * FROM users WHERE user_id = ?`, [id])
        const formattedResults = convertKeysToCamelCase(results)
        response.status(200).json({name: formattedResults[0].name, success: true})
    } catch (error) {
        console.log("err at get user details", error)
        response.status(500).json({success: false, message: "Internal server error"})
    }
}

module.exports = {registerUser, loginUser, getUserDetails}