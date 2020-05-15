import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import { useField } from './hooks/index'
import Jumbo from './components/Jumbo'
import JumboLogged from './components/JumboLogged'
import BlogTable from './components/BlogTable'

const LoginForm= () => {
  const [blogs, setBlogs] = useState([])
  const username = useField({ type: 'text', name: 'username' })
  const password = useField({ type: 'password', name: 'password' })
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState( { message:null })



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



  //sorting blogs according to most likes
  const blogList= blogs
    .sort((a,b) => b.likes - a.likes)
    const labelStyle = {
      margin: "8px"
    };
  
    const buttonStyle = {
      marginTop: "16px",
      marginBottom: "16px"
    };
  
    const loginHeading = {
      marginBottom: "40px",
      fontSize: "40px"
    };
  if(user===null){
    return(
      <div>
        <Jumbo />
        <Notification notification={notificationMessage} />
        <Col md={{ span: 8, offset: 4 }}>
          <Form>
            <Row style={loginHeading}>
              <Col md={4}>Login</Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Label style={labelStyle} placeholder={username}>
                  Username
                </Form.Label>
                <Form.Control
                    input {... username} reset={null}
                    type="text"
                    autoComplete='username' /> 
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Label style={labelStyle} placeholder={password}>
                  Password
                </Form.Label>
                <Form.Control
                    input {... password} reset={null}
                    type="password"
               autoComplete='current-password' />
                <Button
                    type="submit"
                    variant="outline-secondary"
                    className="btn-block"
                    style={buttonStyle}
                    onClick={handleLogin}>
                  Login
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </div>
    )
  }
  return(
    <div>
      <JumboLogged logout={handleLogout} username={user.name}/>
       <BlogTable 
        blogs={blogs}
        removeButtonHandler={() => handleRemoveButton(blogs.id)}

        />
    </div>

  )
}

export default LoginForm
