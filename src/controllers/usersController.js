
const express = require('express')
const Users = require('../models/userModel')
const router = express()


router.post('/register', async (req, res) =>{
try {



    
} catch (error) {
    console.log(error)
}
})

router.get('/list', async (req, res) =>{
try {
    update
} catch (error) {
    console.log(error)
}
})

router.put('/update', async (req, res) =>{
try {
    update
} catch (error) {
    console.log(error)
}
})

router.delete('/remove', async (req, res) =>{
try {
    update
} catch (error) {
    console.log(error)
}
})


module.exports = app => app.use('/userscrud', router)