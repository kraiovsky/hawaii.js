import React from 'react'

const MagicLinkInput = ({ handleChange, handleClick }) => {
  return (
    <div>
      <input onChange={e => handleChange(e.target.value)} />
      <button onClick={handleClick}>Confirm</button>
    </div>
  )
}

export default MagicLinkInput
