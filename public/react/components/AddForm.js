import React, { useState } from 'react'
import apiURL from '../api'

export const AddForm = ({ setIsAddArticle, fetchPages }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorName, setAuthorName] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  async function onHandleClick (e) {
    e.preventDefault()
    const articleData = {
      title,
      content,
      name: authorName,
      email: authorEmail
    }

    console.log('Sending article data:', articleData)

    try {
      const response = await fetch(`${apiURL}/wiki`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleData)
      })

      const result = await response.json()
      console.log('Response from server:', result)

      fetchPages()
      setIsAddArticle(false)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  return <>
    <form className='addForm' onSubmit={onHandleClick}>
      <h3>Add a Page</h3>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Title'
        type='text'
      ></input>
      <input
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder='Article Content'
        type='text'
      ></input>
      <input
        value={authorName}
        onChange={e => setAuthorName(e.target.value)}
        placeholder='Author Name'
        type='text'
      ></input>
      <input
        value={authorEmail}
        onChange={e => setAuthorEmail(e.target.value)}
        placeholder='Author Email'
        type='email'
      ></input>
      <button type='submit'>Create Page</button>
    </form>
  </>
}
