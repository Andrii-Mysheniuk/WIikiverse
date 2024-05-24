import React, { useState } from 'react'
import { Page } from './Page'
import apiURL from '../api'

export const PagesList = ({ pages, onPageClick, fetchPages }) => {
  const [selectedPageSlug, setSelectedPageSlug] = useState(null)
  const [isDescriptionActive, setIsDescriptionActive] = useState(false)

  const handlePageClick = (slug) => {
    setSelectedPageSlug(slug)
    onPageClick(slug)
    setIsDescriptionActive(!isDescriptionActive)
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
        <div key={idx} onClick={() => handlePageClick(page.slug)}>
          {selectedPageSlug === page.slug && isDescriptionActive === false
          ? (
            <>
              <Page page={page} />
              <button onClick={() => deletePage(page.slug)}>Delete</button>
            </>
          )
          : (
            <h3>{page.title}</h3>
          )}
        </div>
      ))}
    </div>
  )
}
