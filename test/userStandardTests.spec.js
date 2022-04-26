const chai = require("chai")
const axios = require("axios")


//Estilo das asserções
let expect = chai.expect


let config = {
    headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYwNWIzZmJjYmU4NmJjMDhjYzM0NjUiLCJpYXQiOjE2NTA5NzY0MjUsImV4cCI6MTY1MTAxOTYyNX0.MWLAPyJOgDj86XmqPwKBNYxluqaNg-LQN3eunbZOZGg`}
}

let configErr = {
    headers: { 'Authorization': `Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjYwNWIzZmJjYmU4NmJjMDhjYzM0NjUiLCJpYXQiOjE2NTA5NzM1NzQsImV4cCI6MTY1MTAxNjc3NH0.mSzuH5fx3Hmfa5giWclfQl5Q8am9KSiPAU14nf7We2M`}
}

//teste de listagem usuários
describe("Listagem de usuários", function () {
  it("Erro de autorização do Token", async function () {
    let url = "http://localhost:3000/userscrud/list?cpf=885.226.339-10"
    await axios.get(url, configErr)
    
    .catch(function (err) {
        expect(err.response.status).to.be.equal(401)
        expect(err.response.statusText).to.be.equal('Unauthorized')
    })
  })

  it("Buscar usuario com CPF existente", async function () {
    let url = "http://localhost:3000/userscrud/list?cpf=885.226.339-10"
    await axios.get(url, config)
    
    .catch(function (err) {
        expect(err.response.status).to.be.equal(200)
        expect(err.response.data.success).to.be.equal(true)
    })
  })

  it("Buscar usuario com CPF inexistente", async function () {
    let url = "http://localhost:3000/userscrud/list?cpf=885.226.000-00"
    await axios.get(url, config)
    
    .catch(function (err) {
        expect(err.response.status).to.be.equal(400)
        expect(err.response.data.success).to.be.equal(false)
    })

  })

})

//teste de inserção
describe("Registro de usuários", function () {

  it("Teste de registro com CPF no FORMATO inválido", async function () {
      
    let url = "http://localhost:3000/userscrud/register"
    
    let body = {
            "name": "TESTE",
            "surname": "TESTE",
            "password":"123456",
            "phone": "(11)11111-1111",
            "cpf": "000000.000-00"       
          }
    
    await axios.post(url, body)
    
    .catch(function (err) {
      
          expect(err.response.status).to.be.eql(400);
          expect(err.response.data.success).to.be.eql(false)
    })

  }),

  it("Teste de registro com TELEFONE no FORMATO inválido", async function () {
      
    let url = "http://localhost:3000/userscrud/register"
    
    let body = {
        "name": "TESTE",
        "surname": "TESTE",
        "password":"123456",
        "phone": "1111111-1111",
        "cpf": "000.000.000-00"       
      }
    
    await axios.post(url, body)
    
    .catch(function (err) {
      
        expect(err.response.status).to.be.eql(400);
        expect(err.response.data.success).to.be.eql(false)

    })
  }),

  it("Teste de registro SEM senha.", async function () {
      
    let url = "http://localhost:3000/userscrud/register"

    let body = {
        "name": "TESTE",
        "surname": "TESTE",
        "phone": "(11)11111-1111",
        "cpf": "000.000.000-00"       
      }
    await axios.post(url, body)
    
    .catch(function (err) {
        expect(err.response.status).to.be.eql(400);
        expect(err.response.data.success).to.be.eql(false)

    })
  })
})

//autenticação
describe("Autenticação de usuários", function () {
    it("Autenticado com sucesso",  async function () {
      let url = "http://localhost:3000/userscrud/authenticate"
  
      let body = {
        "cpf": "885.226.339-10",
        "password": "123456"
      }
  
  
    await axios.post(url, body)
      .catch(function (err) {

      expect(err.response.status).to.be.equal(200)
      expect(err.response.data.success).to.be.equal(true)
    })
    
    })
  
    it("Autenticação com senha errada", async function () {
      let url = "http://localhost:3000/userscrud/authenticate"
  
      let body = {
        "cpf": "885.226.339-10",
        "password": "ERROR"
      }
  
      await axios.post(url, body)
        .catch(function (err) {
  
          expect(err.response.status).to.be.equal(401)
          // expect(res.response.data.msg).to.be.equal({"msg": "A senha informada está incorreta"})
        })
  
    })
  
    it("Autenticação com CPF errado", async function () {
      let url = "http://localhost:3000/userscrud/authenticate"
  
      let body = {
        "cpf": "ERROR",
        "password": "123456"
      }
  
      await axios.post(url, body)
        .catch(function (err) {
  
          expect(err.response.status).to.be.equal(400)
          expect(err.response.data.success).to.be.equal(false)
        })
  
    })
  
  })

//excluir usuário
describe("Exclusão de usuários", function () {

  it("Erro de autorização do Token", async function () {
    let url = "http://localhost:3000/userscrud/remove?userId=62600522b4a8a72bebd70000"
    await axios.delete(url, configErr)
    
    .catch(function (err) {
        expect(err.response.status).to.be.equal(401)
        expect(err.response.statusText).to.be.equal('Unauthorized')
    })
  })

  it("ID informado não possui tamanho mínimo", async function () {
      
    let url = "http://localhost:3000/userscrud/remove?userId=15165156456561"
    await axios.delete(url, config)
    
    .catch(function (err) {
      expect(err.response.status).to.be.eql(400);
      expect(err.response.data.success).to.be.eql(false)
    })

  })

  it("Usuário não encontrado para exclusão", async function () {
      
    let url = "http://localhost:3000/userscrud/remove?userId=62600522b4a8a72bebd70000"
    await axios.delete(url, config)
    
    .catch(function (err) {
      expect(err.response.status).to.be.eql(400);
      expect(err.response.data.success).to.be.eql(false)

    })

  })
})

//edição de usuário
describe("Edição de usuários", function () {

  it("Erro de autorização do Token", async function () {
    let url = "http://localhost:3000/userscrud/update"
    await axios.put(url, configErr)
    
    .catch(function (err) {
        expect(err.response.status).to.be.equal(401)
        expect(err.response.statusText).to.be.equal('Unauthorized')
    })
  })


  it("Usuário não encontrado para edição", async function () {
      
    let url = "http://localhost:3000/userscrud/update"

    let body =  {
      "userId":"625ff2c2ee5fb8c8ffd6e68a",
      "name": "Rodolfo",
      "surname": "Gomes",
      "password":"12345678",
      "confirmPassword":"12345678",
      "phone": "(11)96855-2211",
      "cpf": "885.226.339-10"
    }


    await axios.put(url, body, config)
    
    .catch(function (err) {
      expect(err.response.status).to.be.eql(401);
      expect(err.response.data.success).to.be.eql(false)

    })

  })
})