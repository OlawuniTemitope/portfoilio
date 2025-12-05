import useWindowStore from '#store/window'
import React from 'react'

const WindowControlls = ({target}) => {
  const {closeWindow} = useWindowStore()
  return (
    <div id='window-controls'>
     <div onClick={() => closeWindow(target)}><div className='close'></div></div>
      <div className='minimize'/>
      <div className='maximize'/>
    </div>
  )
}

export default WindowControlls