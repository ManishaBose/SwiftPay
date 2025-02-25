const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware');
const { Account } = require('../db');

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Hello from account");
});

router.get("/balance", authMiddleware, async(req, res)=>{
    try{
        const account = await Account.findOne({ userId: req.userId}); 
        res.status(200).json({
            message: `Your current balance is ₹${account.balance}`
        })
    } catch(e){
        console.error(e);
        res.status(400).json({
            message: "Could not get balance."
        })
    }
})
module.exports = router