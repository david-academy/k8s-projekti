/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import blogService from '../services/blogs'
import { useField } from '../hooks/index'


const BlogForm = ({ blogs, setBlogs, notify }) => {
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
    setBlogs(blogs.concat(addedBlog))
    title.reset()
    author.reset()
    blogURL.reset()
    notify(`a new blog ${addedBlog.title} by ${addedBlog.author} added `)
  }

  return (
	<>
	<h2>create new</h2>
	<form onSubmit={handleNewBlogSubmit}>
		Title
	  <input {...title} reset={null}/><br />
		Author
	  <input {...author} reset={null}/><br />
		URL
	  <input {...blogURL}reset={null}/><br />
	  <input type="submit" value="create"/>
	</form>
 	</>
  )
}

export default BlogForm