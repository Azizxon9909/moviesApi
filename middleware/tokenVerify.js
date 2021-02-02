const jwt = require('jsonwebtoken');
module.exports = (req,res,next)=>{
    const token = req.headers['x-access-token'] ||req.body.token||req.query.token
    if(token){
        jwt.verify(token, req.app.get('api-secret-key'),(err, decoded)=>{
            if (err) {
                res.json({
                    status: 404,
                    msg:'tokenda xatolik bor'
                })
            } else {
                req.decoded = decoded,
                next()
            }
        })
    }else{
        res.json({
            status: false,
            msg: 'registratsiyadan oting'
        })
    }
}