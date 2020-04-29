import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, likeButtonHandler, removeButtonHandler, currentUser }) => {
  const [visible, setVisible]= useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '': 'none' }
  const toggleVisibility =() => {
    setVisible(!visible)
    console.log(blog.user.name)
  }
  const removeButton = () => {
    return currentUser === blog.user.username
      ? (<button onClick={removeButtonHandler}>Remove</button>)
      : (<></>)
  }

  return(
    <div style={blogStyle} className='blog' >
      <div className='title' onClick={() => toggleVisibility()}>
        {blog.title} {blog.author}
      </div>
      <div className='moreInfo' style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blog.likes} likes <button onClick={likeButtonHandler}>Like</button></p>

        <p>added by {blog.user.name}</p>
        {removeButton()}
      </div>
    </div>


  )
}
Blog.propTypes={
  blog: propTypes.object.isRequired,
  likeButtonHandler: propTypes.func.isRequired,
  removeButtonHandler: propTypes.func.isRequired,
  currentUser: propTypes.string.isRequired
}
export default Blog