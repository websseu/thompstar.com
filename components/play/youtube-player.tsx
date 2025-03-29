import React from 'react'
import {
  TbPlayerSkipBackFilled,
  TbPlayerSkipForwardFilled,
  TbPlayerPlayFilled,
} from 'react-icons/tb'

export default function YoutubePlayer() {
  return (
    <div className='youtube__player'>
      <div className='player__controls'>
        <div className='left'></div>
        <div className='center'>
          <span>
            <TbPlayerSkipBackFilled size={20} />
          </span>
          <span>
            <TbPlayerPlayFilled size={26} />
          </span>
          <span>
            <TbPlayerSkipForwardFilled size={20} />
          </span>
        </div>
        <div className='right'></div>
      </div>
    </div>
  )
}
