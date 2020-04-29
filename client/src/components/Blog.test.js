import React from 'react'
import { render, fireEvent } from '@testing-library/react' // highlight-line
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
  title: 'Titel',
  author: 'Författare',
  likes: 25,
  url: 'www.internet.com',
  user: {
    username: 'Användare',
  }
}
describe('<Blog />', () => {
  test('show only the title and the author of the blog', () => {
    const emptyFunction = function() {return undefined}
    const component = render(
      <Blog
        blog= { blog }
        likeButtonHandler= { emptyFunction }
        removeButtonHandler= { emptyFunction}
        currentUser= { 'Another user' }
      />
    )
    const titleAuthor = component.container.querySelector('.title')
    expect(titleAuthor).toHaveTextContent('Titel')
    expect(titleAuthor).toHaveTextContent('Författare')

    const moreInfo = component.container.querySelector('.moreInfo')
    expect(moreInfo).toHaveStyle('display: none')
  })
  test('show everything when clicked', () => {
    const emptyFunction = function() {return undefined}
    const component = render(
      <Blog
        blog= { blog }
        likeButtonHandler= { emptyFunction }
        removeButtonHandler= { emptyFunction}
        currentUser= { 'Another user' }
      />
    )
    const titleAuthor = component.container.querySelector('.title')
    expect(titleAuthor).toHaveTextContent('Titel')
    expect(titleAuthor).toHaveTextContent('Författare')
    fireEvent.click(titleAuthor)
    const moreInfo = component.container.querySelector('.moreInfo')
    expect(moreInfo).not.toHaveStyle('display: none')
  })
  
})