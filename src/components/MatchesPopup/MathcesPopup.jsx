import React from 'react'

const MatchesPopup = ({ isOpen, onClose }) => (
  <div className={`MatchesPopup ${isOpen && 'MatchesPopup_opened'}`} onClick={onClose}>
    <div className='MatchesPopup__container' onClick={(e) => e.stopPropagation()} />
  </div>
)

export default MatchesPopup;
