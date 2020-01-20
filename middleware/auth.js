const IsAuth = (req, res, next) => {
    console.log(req.headers.authorization)
    if(req.method === 'OPTIONS') {
        return next()
    }

    if(req.headers.authorization) {
        console.log('->>>>>>>>>>>>>>> login')
        next()
    }

    if(!req.headers.authorization) {
        console.log('->>>>>>>>>>>>>>> not login')
        res.status(401).json({msg: "User no auth"})
    }

}

module.exports = IsAuth
