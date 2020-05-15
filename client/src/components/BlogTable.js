import React, { useState, useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import blogService from '../services/blogs'
import { Button } from 'react-bootstrap'
import NewBlogForm from './NewBlogForm'
import Notification from './Notification'
 

const columns = ({handleRemoveButton, handleLikeButton}) => [{
    dataField: 'title',
    text: 'Title',
    sort: true,
},
{
    dataField: 'author',
    text: 'Author',
    sort: true,
},
{
    dataField: 'url',
    text: 'URL',
    sort: true,
},
{
    dataField: 'user.name',
    text: 'added by',
    sort: true,
},
{
    dataField: 'likes',
    text: 'likes',
    sort: true,
},
 {
    dataField: 'like',
    text: '',
    isDummyField: true,
    csvExport: false,
    editable: false,
    align: 'center',

    title: () => 'Like',
     headerStyle: () => {
         return {width: '40px', textAlign: 'center'};
     }, 
    formatter: (cell, row) => {
      const kerRow = row;
      return (
        <button type="button"
          className="btn btn-primary btn-sm"
          onClick={() =>
            handleLikeButton(row.id)}>
            Like
        </button>);
    }
  }, 
  {
    dataField: 'delete',
    text: '',
    isDummyField: true,
    csvExport: false,
    editable: false,
    align: 'center',

    title: () => 'Delete',
           headerStyle: () => {
              return {width: '40px', textAlign: 'center'};
          }, 
    formatter: (cell, row) => {
      return (
          
        <button type="button" className="btn btn-danger btn-sm" onClick={() => handleRemoveButton(row.id)}>
          X
        </button>);
    }
  },
]
const defaultSorted = [{
    dataField: 'likes',
    order: 'desc'
  }]

const BlogTable = props => {
    const [blogit, setBlogit] = useState([])
    const [notificationMessage, setNotificationMessage] = useState( { message:null })
    const [postVisible, setPostVisible] = useState(false)
    const hideWhenVisible = { display: postVisible ? 'none': '' }
    const showWhenVisible = { display: postVisible ? '': 'none' }

    useEffect(()=> {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            blogService.getAll()
                .then(blogit => {
                    setBlogit(blogit)
                })
        }
    },[])
  const notify = (message, type='success') => {
    setNotificationMessage({ message,type })
    setTimeout(() => setNotificationMessage({ message: null }), 5000)
  }
    const handleRemoveButton = async (blogId) => {
        const removeBlog = blogit.find(blogit => blogit.id=== blogId)
    
        window.confirm(`remove blog ${removeBlog.title} by ${removeBlog.author}`)
        try{
          await blogService.remove(removeBlog.id)
          notify(`Removed blog: ${removeBlog.title}`)
          const newBlogs = blogit.filter(blog => blog.id !==removeBlog.id)
          setBlogit(newBlogs)
        } catch (exception){
          console.log('this did not work', exception)
        }
      }
      const handleLikeButton = async (blogId) => {
        const likedBlog = blogit.find(blog => blog.id === blogId)
        likedBlog.likes++
    
        try {
          await blogService.update(likedBlog.id, likedBlog)
          notify(`You liked the blog: ${likedBlog.title} by ${likedBlog.author}`)
    
          blogit.map(blog => {
            if (blog.id === likedBlog.id) {
              blog.likes = likedBlog.likes
            }
            return blog
          })
        } catch (exception) {
   //       notify('your like did not register', 'error')
        }
      }
    return (
        <>
        <div style={hideWhenVisible} className="justify-content-start">
                  <Notification notification={notificationMessage} />

        <Button 
        variant="outline-secondary"
        onClick={() => setPostVisible(true)}
        >
          add blog
        </Button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          blogit={blogit}
          setBlogit={setBlogit}
          notify={notify}
          cancel={() => setPostVisible(false)}
          />
      </div>
        <div>
            <BootstrapTable
                bootstrap4 striped hover condensed
                keyField="id"
                data={blogit}
                columns={columns({handleRemoveButton, handleLikeButton})}
                defaultSorted={defaultSorted}
  
            />

        </div>
        </>
    );
}

export default BlogTable;
