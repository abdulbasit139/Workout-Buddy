const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// User Signup function
userSchema.statics.signUp = async function(email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled")
    }
    if (!validator.isEmail(email)){
        throw Error("Not a valid Email")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password must be strong")
    }

    const exist = await this.findOne({email});

    if (exist) {
        throw Error("Email already in use")
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hash})

    return user;
}

// User Login Function
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email});

    if (!user) {
        throw Error("Invalid Email")
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Invalid Password") 
    }
    
    return user

}

module.exports = mongoose.model("User", userSchema)