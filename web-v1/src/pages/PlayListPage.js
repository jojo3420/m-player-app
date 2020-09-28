import React, { useRef } from 'react'
import ReactAudioPlayer from 'react-audio-player'
import sampleSong1 from 'resouces/audio/01-sample.mp3'
// import sampleSong2 from 'resouces/audio/02-sample.mp3'
// import sampleSong3 from 'resouces/audio/03-sample.mp3'
// import sampleSong4 from 'resouces/audio/04-sample.mp3'
// import sampleSong5 from 'resouces/audio/05-sample.mp3'
import useTitle from 'lib/hooks/useTitle'

function PlayListPage(props) {
  useTitle('PlayList')
  const ref = useRef()

  return (
    <ReactAudioPlayer
      src={sampleSong1}
      ref={ref}
      autoplay={true}
      controls={true}
      controlList={''}
    />
  )
}

export default PlayListPage
