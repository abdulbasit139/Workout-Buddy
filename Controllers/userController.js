const User = require('../Models/userModel')

const userLogin = async (req, res) => {
    res.json({mssg: "User Login"})
}

const userSignup = async (req, res) => {
    
    const {email, password} = req.body 

    try {
        const user = await User.signUp(email, password);

        res.status(200).json({email, user});
    }
    catch(error) {
        res.status(400).json({error: error.message})
    }

}

module.exports = { userLogin, userSignup }