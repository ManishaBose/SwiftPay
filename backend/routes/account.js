const express = require('express');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware');
const { Account } = require('../db');
const {z} = require("zod")
const router = express.Router();

const transferSchema = z.object({
    to: z.string(),
    amount: z.number()
})

function validateTrasferBody(obj){
    const response = transferSchema.safeParse(obj);
    return response;
}
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
router.post("/transfer", authMiddleware, async(req,res)=>{
    const validation = validateTrasferBody(req.body);
    if(!validation.success){
        return res.status(401).json({
            message: "Invalid account"
        })
    }
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        const {to, amount} = validation.data;
        const account = await Account.findOne({
            userId: req.userId
        }).session(session);

        if(account.balance < amount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }
        const toAccount = await Account.findOne({
            userId: to
        }).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        await Account.updateOne({
            userId: req.userId
        }, {
            $inc: {
                balance: -amount
            }
        }).session(session);
        await Account.updateOne({
            userId: to
        }, {
            $inc: {
                balance: amount
            }
        }).session(session);
        await session.commitTransaction();

        res.status(200).json({
            message: "Transfer successful"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})
module.exports = router