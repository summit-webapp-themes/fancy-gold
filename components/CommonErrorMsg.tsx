import React from 'react'

const CommonErrorMsg = ({error}:any) => {
  return (
    <div className='error-container'>{error !== undefined ? error : 'Error occurred!'}</div>
  )
}

export default CommonErrorMsg