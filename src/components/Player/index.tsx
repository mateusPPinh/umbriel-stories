import { type ReactElement } from 'react'
import ReactPlayer from 'react-player'

export default function Player(): ReactElement {
  return (
    <ReactPlayer
      url="https://youtu.be/mD07eQBA7Q4"
      controls
      width="100%"
      style={{ borderRadius: '8px' }}
    />
  )
}
