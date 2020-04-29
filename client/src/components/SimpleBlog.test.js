import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react' // highlight-line
import Blog from './SimpleBlog'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',

  }

  const component = render(
    <Blog blog={ blog } />
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  const element = component.getByText(
    'Component testing is done with react-testing-library'
  )
  expect(element).toBeDefined()
})

test('clicking the like-button twice', async () => {
  const blog = {
    title: 'hej',
    author: 'pappdiin',
    likes: 3,
  }
  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={ blog } onClick= { mockHandler } />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})

