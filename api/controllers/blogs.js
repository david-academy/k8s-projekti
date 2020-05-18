const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
                    .find({})
                    .populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
const getTokenFrom = request =>{
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

  blogRouter.post('/', async (request, response) => {
    const body = request.body

    const token = getTokenFrom(request)
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }
    
    const user = await User.findById(decodedToken.id)
                const blog = new Blog({
                title: body.title,
                author: body.author,
                url: body.url,
                likes: body.likes === undefined 
                    ? 0 
                    : body.likes,
                user: user._id
        })
        
        const result = await blog.save()
        user.blogs = user.blogs.concat(result._id)
        await user.save()
        response.json(result.toJSON())
    
    
  } catch (exception){
      console.log('WEEEE! ', exception)
  }
  })

  blogRouter.put('/:id', (request, response, next) =>{
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
      .then(updatedBlog =>{
        response.json(updatedBlog.toJSON())
      })
      .catch(error => next(error))
  })
  blogRouter.delete('/:id', async (request, response)=>{
    const token = getTokenFrom(request)
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id){
            return response.status(401).json({error: 'token missing or invalid'})
        }
        const user = await User.findOne({username: decodedToken.username})
        const blog = await Blog.findById(request.params.id)

        if(blog.user.toString()=== user.id.toString()){
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()
        } else {
            response.status(401).end()
        }
    } catch (exception){
        console.log('Whoops.. seems like you cannot do that! ', exception)
    }
  })


  module.exports = blogRouter