import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'
import { AddForm } from './AddForm'
// import { Page } from './Page'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState([])
  const [isAddForm, setIsAddForm] = useState(false)

  async function fetchPages () {
    try {
      const response = await fetch(`${apiURL}/wiki`)
      const pagesData = await response.json()
      setPages(pagesData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  async function fetchPage (slug) {
    try {
    const res = await fetch(`${apiURL}/wiki/${slug}`)
    const pageData = await res.json()
    console.log(pageData)
    setCurrentPage(pageData)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
  }

  async function deletePage (slug) {
    try {
      const res = await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE'
      })
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
    fetchPages()
  }

  useEffect(() => {
    fetchPages()
  }, [])

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
      <button onClick={() => setIsAddForm(!isAddForm)}>Add Page</button>
      {isAddForm === true
      ? <AddForm setIsAddArticle={setIsAddForm} fetchPages={fetchPages}/>
      : <PagesList pages={pages} onPageClick={fetchPage} fetchPages={fetchPages}/>}
		</main>
  )
}
