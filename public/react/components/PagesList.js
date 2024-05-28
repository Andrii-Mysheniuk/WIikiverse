import React, { useState } from 'react'
import { Page } from './Page'
import apiURL from '../api'

export const PagesList = ({ pages, onPageClick, fetchPages, onSelect = () => {} }) => {
  const [selectedPageSlug, setSelectedPageSlug] = useState(null)

  const handlePageClick = (slug) => {
    setSelectedPageSlug(prevSlug => prevSlug === slug ? null : slug)
    if (slug === selectedPageSlug) {
      onPageClick(slug)
    }
  }

  async function deletePage (slug) {
    try {
      const res = await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      console.log(data)
    } catch (err) {
      console.log('Oh no an error! ', err)
    }
    fetchPages()
  }

  return (
    <div>
      {pages.map((page, idx) => (
        <div key={idx}>
          <h3 onClick={() => handlePageClick(page.slug)}>{page.title}</h3>
          {selectedPageSlug === page.slug && (
            <>
              <Page page={page} />
              <button onClick={() => deletePage(page.slug)}>Delete</button>
              <button onClick={(e) => { e.stopPropagation(); onSelect(page) }}>Edit</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
