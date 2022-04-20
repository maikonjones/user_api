const jwt = require('jsonwebtoken')


module.exports = (req, res, next) =>{

     
    const authHeader = (req.headers.authorization) || (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
   
    if (!authHeader)
        return res.status(401).send({error: 'Não possui token válido!'});
   
    const parts = authHeader.split(' ');
   
    if (!parts.length === 2)
        return res.status(401).send({error: 'Erro no token'});
   
    const [ scheme, token ] = parts;
   
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({error: 'Formato de token inválido!'});
   
    jwt.verify(token, process.env.AUTH_SECRET, (err, decoded) =>{
   
    if (err) return res.status(401).send({ error: 'Token inválido'});
   
    return next();

    })

   
}
   