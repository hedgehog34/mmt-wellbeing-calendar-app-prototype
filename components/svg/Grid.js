import React from 'react'

export const Grid = ({ className, colour = '#353535' }) => {
  const attrs = {
    fill: 'none',
    strokeWidth: 2,
    stroke: colour,
    width: 6,
    height: 6,
  }

  const Rect = props => <rect {...attrs} {...props} />

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" className={className}>
      <g transform="translate(-144 -496)">
        <Rect transform="translate(151 498)" />
        <Rect transform="translate(151 510)" />
        <Rect transform="translate(163 498)" />
        <Rect transform="translate(163 510)" />
      </g>
    </svg>
  )
}