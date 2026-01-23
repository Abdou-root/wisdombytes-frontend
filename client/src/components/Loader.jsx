{/* Loading loop component of the frontend */}

import React from 'react'
import LoadingGif from '../images/loading.gif'

const Loader = () => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__image">
        <img src={LoadingGif} alt="Loading..." />
      </div>
    </div>
  )
}

export default Loader
