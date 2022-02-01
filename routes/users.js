import express from "express"
import User from '../models/user.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post(`/register`, async (req, res) => {
    try {
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.passwordHash, 10),
            telephone: req.body.telephone,
            isDoctor: req.body.isDoctor,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,

        })

        user = await user.save();
        res.json({
            success: true,
            message: 'Successfully created a new user!',
            user: user
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
        const secret = process.env.secret;

        if(!user) {
            return res.status(400).send('The user not found');
        }
    
        if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
            const token = jwt.sign(
                {
                    userId: user.id,
                    
                },
                secret,
                {expiresIn : '60 * 60'}
            )
           
            res.status(200).send({user: user.email , token: token}) 
        } else {
           res.status(400).send('password is wrong!');
        }

})

router.get(`/`, async (req, res) => {
    try {
        let users = await User.find().select('-passwordHash');
        res.json({
            success: true,
            user: users
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }

})

router.get(`/:id`, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id }).select('-passwordHash')
        res.json({
            success: true,
            user: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.put(`/:id`, async (req, res) => {
    req.params.id
    try {

        let user = await User.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            telephone: req.body.telephone,
            isDoctor: req.body.isDoctor,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        }, {
            new: true,
        })
        res.json({
            success: true,
            user: user
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.delete('/:id', (req, res)=>{
    User.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments((count) => count)

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    })
})


export default router