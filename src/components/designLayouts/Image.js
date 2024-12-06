import React from "react"

// src/components/designLayouts/Image.js

const Image = ({ imgSrc, className }) => {
  return <img loading="lazy" className={className} src={imgSrc} alt={imgSrc} />
}
export default Image
