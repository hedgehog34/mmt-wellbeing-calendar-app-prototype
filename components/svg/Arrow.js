import React from 'react'

const Arrow = ({ className, flipHorizontal = false }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='46.145' height='53.165' viewBox='0 0 46.145 53.165' className={className} transform={flipHorizontal ? 'rotate(180)' : ''}>
    <path d='M26.581,46.114l-.041.031L0,25.934l5.307-4.041L22.521,35V0h7.506V35.472L47.858,21.893l5.307,4.041L26.625,46.145Z' transform='translate(0 53.165) rotate(-90)'/>
  </svg>
)

export const ArrowRight = ({ className }) => <Arrow className={className} />

export const ArrowLeft = ({ className }) => <Arrow className={className} flipHorizontal />