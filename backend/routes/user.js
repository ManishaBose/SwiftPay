const express = require('express')
const {z} = require("zod");
const { User, Account } = require('../db');
const jwt = require("jsonwebtoken");
const { jwt_secret } = require('../config');
const authMiddleware = require('../middleware');

const router = express.Router();

const userSignupSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50)
})

const userSigninSchema = z.object({
    username: z.string().email(),
    password: z.string()
})

const userUpdateSchema = z.object({
    password: z.string().min(6).optional(),
    firstName: z.string().max(50).optional(),
    lastName: z.string().max(50).optional()
})

function validateSignupInput(obj){
    const response = userSignupSchema.safeParse(obj);
    return response;
}

function validateSigninInput(obj){
    const response = userSigninSchema.safeParse(obj);
    return response;
}

function validateUpdateInput(obj){
    const response = userUpdateSchema.safeParse(obj);
    return response;
}

router.post("/signup",async(req,res)=>{
    const validation = validateSignupInput(req.body);

    if(!validation.success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const {username, password, firstName, lastName} = validation.data;

    try{
        const existingUser = await User.findOne({username});
        if(existingUser){
            return res.status(411).json({
                message: "Email already taken"
            })
        }
        const user = await User.create({
            username,
            password,
            firstName,
            lastName
        });
        const userId = user._id
        
        //Initialize a random balance on signup between 1 and 10000
        //So, that we don't have to integrate with banks and give them a random balance to start with, instead
        const balance = Math.floor(Math.random()*10000)+1;
        //create account for new user
        await Account.create({
            balance,
            userId
        })

        const jwtToken = jwt.sign({userId}, jwt_secret);

        return res.status(201).json({
            message: "User created successfully",
            token:jwtToken,
            balance: `Congratulations! Your current balance is ${balance}`
        })
    } 
    catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Oops! User could not be created"
        })
    }
})

router.post("/signin",async(req,res)=>{
    const validation = validateSigninInput(req.body);
    if(!validation.success){
        return res.status(411).json({
            message: "Username and password required"
        })
    }
    const {username, password} = validation.data;
    try{
        const user = await User.findOne({username, password});
        if(!user){
            return res.status(411).json({
                message: "Error while logging in"
            })
        }
        const userId = user._id
        const token = jwt.sign({userId}, jwt_secret)
        return res.status(200).json({
            token
        })
    } 
    catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Sorry! Could not sign in"
        })
    }
    
})

router.put("/update",authMiddleware, async(req, res)=>{
    const validation = validateUpdateInput(req.body);
    if(!validation.success){
        return res.status(411).json({
            message: "Invalid inputs; password too small"
        })
    }
    const userId = req.userId;
    try{
        await User.updateOne({_id: userId},
            {$set: validation.data}
        )
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch(e){
        console.error(e);
        res.status(400).json({
            message: "Couldnot be updated"
        })
    }
})

router.get("/bulk", authMiddleware,async(req,res)=>{
    const filter = req.query.filter
    try{
        const users = filter? await User.find({ $or: [{
            firstName: {
                $regex: filter,
                $options: "i"
            }
        }, {
            lastName: {
                $regex: filter,
                $options: "i"
            }
        }]}): await User.find()
        res.status(200).json({
           users: users.map(user=>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            id: user._id
           }))
        })
    }
    catch(e){
        console.error(e);
        res.status(400).json({
            message: "Could not filter"
        })
    }
})
module.exports = router