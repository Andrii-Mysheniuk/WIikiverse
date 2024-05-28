import React from 'react'

export const Page = ({ page }) => {
  if (!page) {
    return <div>Loading...</div>
  }

  const { content, author, createdAt } = page

  return <>
    <p>{content}</p>
    <p><strong>Author: </strong>{author ? author.name : 'Unknown'}</p>
    <p><strong>Published: </strong>{createdAt.slice(0, 10)}</p>
  </>
}
