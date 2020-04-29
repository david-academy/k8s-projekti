const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/', async (request, response) => {
    const users = await User
            .find({})
            .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    
    response.json(users.map(u => u.toJSON()))
  })
userRouter.post('/', async(request, response)=>{
    
    const body = request.body
        if(body.password.length >2){
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception){
        console.log('something is wrong: ', exception)
    }
} else {
    response.status(400).json({error: 'Password missing or to short! (minimum 3 charachters)'})
    console.log('Password missing or to short! (minimum 3 charachters)')
}
})

module.exports = userRouter