const jwt = require('jsonwebtoken');
const {jwt_secret} = require('./config')
function authMiddleware(req, res, next){
    
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer'))
        return res.status(403).json({})
    const jwtToken = token.split(" ")[1];
    try{
        const decoded = jwt.verify(jwtToken, jwt_secret);
        req.userId = decoded.userId;
        next();
    } catch(e){
        console.error(e);
        res.status(403).message({})
    }
    
}

module.exports = authMiddleware