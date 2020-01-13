const {Router} = require('express');
const User = require('../model/user');
const {check, validationResult} = require('express-validator');
const router = Router()

router.post('/create', [
    check('email', 'pass or email nor correct').isEmail(),
    check('password').isLength({min: 2})
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    const {email, password} = req.body
    const user = new User({
        email: email,
    })

    user.setPassword(password)
    user.save()
        .then(user => {
            console.log(`${user} was added`)
            res.end()
        })
        .catch(err => {
            res.json({msg: 'User wasnt add'})
            console.error(err)
        })

})

router.post('/auth', [
    check('email', 'pass or email nor correct').isEmail(),
    check('password').isLength({min: 2})
], async (req, res) => {
    const {email, password} = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    const searchedUser = await User.findOne({email: email})
    if (searchedUser || searchedUser.checkPassword(password)) {
        const jwt = searchedUser.generateJWT()
        res.json({token: jwt})
    }
})
module.exports = router
