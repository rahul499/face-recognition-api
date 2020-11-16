
const handleSignIn = (req, res, db, bcrypt) => {

    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json('incorrect form submission')
     }

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
       const isVal =  bcrypt.compareSync(password, data[0].hash);
       if(isVal) {
       return db.select('*').from('users')
           .where('email', '=', email)
           .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('Unable to get User'))
       } else {
           res.status(400).json('Wrong credentials')
       }
    })
    .catch(err => res.status(400).json('Wrong credentials'))
}

module.exports = {
    handleSignIn: handleSignIn
}