import React from 'react'

export const Page = ({ page }) => {
  if (!page) {
    return <div>Loading...</div>
  }

  const { title, content, author, createdAt } = page

  return <>
    <h3>{title}</h3>
    <p>{content}</p>
    <p><strong>Author: </strong>{author ? author.name : 'Unknown'}</p>
    <p><strong>Published: </strong>{createdAt.slice(0, 10)}</p>
  </>
}
