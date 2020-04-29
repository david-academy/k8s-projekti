import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import { useField } from './hooks/index'

const App= () => {
  const [blogs, setBlogs] = useState([])
  const username = useField({ type: 'text', name: 'username' })
  const password = useField({ type: 'password', name: 'password' })
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState( { message:null })
  const [postVisible, setPostVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='success') => {
    setNotificationMessage({ message,type })
    setTimeout(() => setNotificationMessage({ message: null }), 5000)
  }
  const handleLikeButton = async (blogId) => {
    const likedBlog = blogs.find(blog => blog.id === blogId)
    likedBlog.likes++

    try {
      await blogService.update(likedBlog.id, likedBlog)
      notify(`You liked the blog: ${likedBlog.title} by ${likedBlog.author}`)

      blogs.map(blog => {
        if (blog.id === likedBlog.id) {
          blog.likes = likedBlog.likes
        }
        return blog
      })
    } catch (exception) {
      notify('your like did not register', 'error')
    }
  }
  const handleRemoveButton = async (blogId) => {
    const removeBlog = blogs.find(blog => blog.id=== blogId)

    window.confirm(`remove blog ${removeBlog.title} by ${removeBlog.author}`)
    try{
      await blogService.remove(removeBlog.id)
      notify(`Removed blog: ${removeBlog.title}`)
      const newBlogs = blogs.filter(blog => blog.id !==removeBlog.id)
      setBlogs(newBlogs)
    } catch (exception){
      console.log('this did not work', exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      notify('wrong username or password', 'error')
      password.reset()
    }
  }

  //clickable headers - reveals more info
  const hideWhenVisible = { display: postVisible ? 'none': '' }
  const showWhenVisible = { display: postVisible ? '': 'none' }

  //sorting blogs according to most likes
  const blogList= blogs
    .sort((a,b) => b.likes - a.likes)

  if(user===null){
    return(
      <div>
        <Notification notification={notificationMessage} />
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
            username
          <input {...username} reset={null} />
            password
          <input {...password} reset={null} />
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return(
    <div>
      <h2>blogs</h2>
      <Notification notification={notificationMessage} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}type="logout">logout</button>
      </p>

      <div style={hideWhenVisible}>
        <button onClick={() => setPostVisible(true)}>new blog</button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
          notify={notify}/>
        <button onClick={() => setPostVisible(false)}>cancel</button>
      </div>
      {blogList.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          likeButtonHandler={() => handleLikeButton(blog.id)}
          removeButtonHandler={() => handleRemoveButton(blog.id)}
          currentUser={user.username}
        />
      )}
    </div>

  )
}

export default App
