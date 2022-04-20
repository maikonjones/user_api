
const express = require('express')
const User = require('../models/userModel')
const router = express()


router.post('/register', async (req, res) =>{
try {
  /*
    - registro ok
    - validação cpf
    - validação telefone
  */


    let thisUser = await User.create(req.body)
    if (thisUser)
        res.send({  success: true, msg: "“Informações armazenadas."})    
    else
        return res.status(400).send({success: false, msg: "CPF inválido."})

} catch (error) {
    console.log(error)
}
})

router.get('/list', async (req, res) =>{
try {
    let reportQuery = new Object();

    if (req.query.cpf)
        reportQuery = Object.assign(reportQuery, {cpf: req.query.cpf});

    let thisUsers = await User.find(reportQuery)
    if (thisUsers.length > 0)
        res.send(thisUsers)
    else
        return res.status(400).send({success: false, msg: "“Informações de CPF não armazenadas."})
    
} catch (error) {
    console.log(error)
}
})

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


module.exports = app => app.use('/userscrud', router)