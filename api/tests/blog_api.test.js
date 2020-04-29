const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async ()=>{
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Getting blogs', ()=>{
test('blogs are returned as json', async()=>{
    const blogs = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogs.body.length).toBe(helper.initialBlogs.length)
})
test('Identifying field is id, not _id', async()=>{
    const blogs = await api.get('/api/blogs')
    expect(blogs.body
        .map(b=> b.hasOwnProperty('id'))
        .every(p=>p===true))
        .toBe(true)
})
})

test('A blog can be added', async()=>{
    const newBlog = {
        title: 'Whatever happens happens',
        author: 'Ben Dover',
        url: 'www.123.com',
        likes: '15'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-type', /application\/json/)
    const blogssAfter = await helper.blogsInDb()

    expect(blogssAfter.length).toBe(helper.initialBlogs.length +1)

    const titles = blogssAfter.map(blog=> blog.title)
    expect(titles).toContain(newBlog.title)
})

test('Added a blog without likes get 0 likes', async()=>{
    const newBlog = {
        title: 'Whatever happens happened',
        author: 'Ben Dover',
        url: 'www.123.com'
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-type', /application\/json/)
    const blogssAfter = await helper.blogsInDb()

    const addedBlog = blogssAfter.find(blog => blog.title === newBlog.title)
    expect(addedBlog.likes).toBe(0)
})
test('Added blog without title and URL will get 400', async()=>{
    const newBlog = {
        author: 'Justin Case',
        likes: 4
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    
    newBlog.url = '123-123.com'
    delete newBlog.title
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

})
describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      const user = new User({ username: 'root', password: 'sekret' })
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
    
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('`username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
  })
  
afterAll(()=>{
    mongoose.connection.close()
})