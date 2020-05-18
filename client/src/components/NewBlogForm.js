import React from 'react'
import blogService from '../services/blogs'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useField } from '../hooks/index'
import Notification from './Notification'


const BlogForm = ({ blogit, setBlogit, notify , cancel}) => {
  const title = useField('text')
  const author = useField('text')
  const blogURL = useField('text')

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: blogURL.value,
    }

    const addedBlog = await blogService.create(blogObject)
    setBlogit(blogit.concat(addedBlog))
    title.reset()
    author.reset()
    blogURL.reset()
    notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added `)
  }
  const labelStyle = {
    margin: "8px"
  };
  const buttonStyle = {
  marginTop: "16px",
  marginBottom: "16px"
};

const loginHeading = {
  marginBottom: "40px",
  fontSize: "20px"
};

  return (
	<>
{/* 	<h2>create new</h2>
	<form onSubmit={handleNewBlogSubmit}>
		Title
	  <input {...title} reset={null}/><br />
		Author
	  <input {...author} reset={null}/><br />
		URL
	  <input {...blogURL}reset={null}/><br />
	  <input type="submit" value="create"/>
	</form> */}
<Col md={{ span: 8, offset: 4 }}>
<Form>
  <Row style={loginHeading}>
    <Col md={8}>Create new</Col>
  </Row>
  <Row>
    <Col md={8}>
      <Form.Label style={labelStyle} placeholder={title}>
        Title
      </Form.Label>
      <Form.Control
          input {... title} reset={null}
          type="text"/> 
    </Col>
  </Row>

  <Row>
    <Col md={8}>
      <Form.Label style={labelStyle} placeholder={author}>
        Author
      </Form.Label>
      <Form.Control
          input {... author} reset={null}
          type="text"/>
          </Col>
          </Row>
          <Row>
          <Col md={8}>
          <Form.Label style={labelStyle} placeholder={URL}>
        URL
      </Form.Label>
      <Form.Control
          input {... blogURL} reset={null}
          type="text"/>
      <Button
          type="submit"
          variant="outline-secondary"
          className="btn-block"
          style={buttonStyle}
          onClick={handleNewBlogSubmit}>
        Create
      </Button>
      <Button
        variant="outline-danger"
        style={buttonStyle}

        onClick={cancel}
        >
        Cancel
      </Button>
    </Col>
  </Row>
</Form>
</Col>
 	</>
  )
}

export default BlogForm