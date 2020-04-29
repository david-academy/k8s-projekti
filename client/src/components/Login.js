import React, { useState } from 'react'
import loginService from '../services/login'
import blogs from '../services/blogs'
import Blog from './Blog'
import { useField } from '../hooks/index'

const Login = () => {
  const username = useField('text')
  const password = useField('text')


  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('loggin in with ', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception){
      console.log('något gick fel', exception)
      username.reset()
      password.reset()
    }
  }
  if (user === null){
    return(
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username} />
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <div>
            <button type="submit">login</button>
          </div>
        </form>
      </div>
    )
  }
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default Login
