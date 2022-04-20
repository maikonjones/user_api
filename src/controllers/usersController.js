
const express = require('express')
const User = require('../models/userModel')
const router = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMid = require('../middleware/auth')

//ROTA DE REGFISTRO DE USUÁRIO
router.post('/register', (authMid), async (req, res) =>{
try {

    let regexExpcpf = new RegExp('^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}\\-[0-9]{2}$');
    if (regexExpcpf.test(req.body.cpf) == false)
        return res.status(400).send({success: false, msg: "CPF informado possui formato inválido."})

    let regexExpPhone = new RegExp('^\\(((1[1-9])|([2-9][0-9]))\\)((3[0-9]{3}-[0-9]{4})|(9[0-9]{3}-[0-9]{4}))$');
    if (regexExpPhone.test(req.body.phone) == false)
        return res.status(400).send({success: false, msg: "Telefone informado possui formato inválido."})

    if (!req.body.password)
        return res.status(400).send({error: 'Informe uma senha para cadastro de usuário.'})


    let hashSalt = await bcrypt.genSalt(5)
    req.body.password = await bcrypt.hash(req.body.password, hashSalt)

    let thisUser = await User.create(req.body)
    if (thisUser)
        res.send({  success: true, msg: "“Informações armazenadas."})    
    else
        return res.status(400).send({success: false, msg: "CPF inválido."})

} catch (error) {
    console.log(error)
}
})

//ROTA DE AUTENTICAÇÃO
router.post('/authenticate', async (req, res) =>{
try {
    let thisUser = await User.findOne({cpf: req.body.cpf})
    if (!thisUser)
        return res.status(400).send({error: 'CPF não encontrado no sistema.'})
    
    let checkPassword = await bcrypt.compare(req.body.password, thisUser.password)
    if (!checkPassword)
        return res.status(400).send({error: 'A senha informada está incorreta'})

    let secretToken = process.env.AUTH_SECRET
    let userToken = jwt.sign({
        userId: thisUser._id
    },
    secretToken
    )

    res.send({msg: 'Autenticação realizada com sucesso', userToken})

    
} catch (error) {
    console.log(error)
}
})

//ROTA DE LISTAGEM DE USUARIOS
router.get('/list', async (req, res) =>{
try {
    let reportQuery = new Object();

    if (req.query.cpf)
        reportQuery = Object.assign(reportQuery, {cpf: req.query.cpf});

    let thisUsers = await User.find(reportQuery)
    if (thisUsers.length > 0)
        res.send(thisUsers)
    else
        return res.status(400).send({success: false, msg: "Informações de CPF não armazenadas."})
    
} catch (error) {
    console.log(error)
}
})

//ROTA DE ATUALIZAÇÃO
router.put('/update', async (req, res) =>{
try {
    let thisUserUpdated = await User.updateOne({_id: req.body.userId}, {$set: req.body}, {new: true})
    if (thisUserUpdated)
        res.send({success: true, msg: 'Atualização feita com sucesso.'})
    else
        return res.status(400).send({success: false, msg: 'Ocorreu um erro na atualização.'})
} catch (error) {
    console.log(error)
}
})

//ROTA DE EXCLUSÃO
router.delete('/remove', async (req, res) =>{
try {
    let thisUserRemoved = await User.deleteOne({_id: req.query.userId})
    if (thisUserRemoved)
        res.send({success: true, msg: 'Exclusão feita com sucesso.'})
    else
        return res.status(400).send({success: false, msg: 'Ocorreu um erro na exclusão do usuário.'})
} catch (error) {
    console.log(error)
}
})


function checkToken (req, res, next) {
    let authHeader = req
}


module.exports = app => app.use('/userscrud', router)