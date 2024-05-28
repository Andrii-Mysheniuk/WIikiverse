import React, { useState, useEffect } from 'react'
import { PagesList } from './PagesList'
import { AddForm } from './AddForm'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [currentPage, setCurrentPage] = useState([])
  const [isAddForm, setIsAddForm] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)

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

  useEffect(() => {
    fetchPages()
  }, [])

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
      <button onClick={() => setIsAddForm(!isAddForm)}>Add Page</button>

      <AddForm
        setIsAddArticle={setIsAddForm}
        fetchPages={fetchPages}
        post={selectedPage}
      />

      <PagesList
        pages={pages}
        onPageClick={fetchPage}
        fetchPages={fetchPages}
        onSelect={setSelectedPage}
      />
		</main>
  )
}
