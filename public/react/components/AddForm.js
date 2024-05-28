import React, { useEffect, useState } from 'react'
import apiURL from '../api'

export const AddForm = ({ setIsAddArticle, fetchPages, post }) => {
  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.content || '')
  const [authorName, setAuthorName] = useState(post?.author?.name || '')
  const [authorEmail, setAuthorEmail] = useState(post?.author?.email || '')

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setContent(post.content)
      setAuthorName(post?.author?.name || '')
      setAuthorEmail(post?.author?.email || '')
    }
  }, [post])

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
      const response = post
      ? await fetch(`${apiURL}/wiki/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData)
      })
      : await fetch(`${apiURL}/wiki`, {
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
      <h3>{post ? 'Edit Page' : 'Add Page'}</h3>
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
      {!post && <>
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
      </>
      }

      <button type='submit'>{post ? 'Update Page' : 'Create Page'}</button>
    </form>
  </>
}
