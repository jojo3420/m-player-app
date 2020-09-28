import React, { useState, useEffect, useCallback } from 'react'
import _useState from 'lib/hooks/_useState'
import Player from 'components/player/player'
import sampleSong1 from 'resouces/audio/01-sample.mp3'
import sampleSong2 from 'resouces/audio/02-sample.mp3'
import sampleSong3 from 'resouces/audio/03-sample.mp3'
import sampleSong4 from 'resouces/audio/04-sample.mp3'
import sampleSong5 from 'resouces/audio/05-sample.mp3'
import sampleImg1 from 'resouces/img/sample-album.jpg'
import sampleImg2 from 'resouces/img/sample-aobum-2.jpeg'
import sampleImg3 from 'resouces/img/sample-aobum-3.jpeg'
import sampleImg4 from 'resouces/img/sample-aobum-4.jpeg'
import sampleImg5 from 'resouces/img/sample-aobum-5.jpeg'
// import axios from 'axios'

function PlayerContainer({}) {
  const [currentIdx, setCurrentIdx] = useState(0)

  const [totalIdx, setTotalIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  const [isListVisible, setIsListVisible] = useState(false)
  const [songList, setSongList] = useState([])
  useEffect(() => {
    const list = sampleList()
    setSongList(list)
    setTotalIdx(list.length || 0)
    // const fetch = async () => {
    //   const url = 'http://localhost:4000/web/1.jpeg'
    //   const response = await axios.get(url)
    //   console.log({ response })
    // }
    // fetch()
  }, [])

  const handlePlaylistVisible = useCallback(() => {
    setIsListVisible((visible) => !visible)
  }, [])

  const onPlaySong = useCallback((audioRef) => {
    setIsPlay((isPlay) => !isPlay)
    console.log({ audioRef })
    audioRef.current && audioRef.current.play()
  }, [])
  const onStopSong = useCallback((audioRef) => {
    setIsPlay((isPlay) => !isPlay)
    audioRef && audioRef.current.pause()
  }, [])

  const onNextPrevSong = useCallback(
    (audioRef, number) => {
      setIsPlay((isPlay) => (isPlay ? !isPlay : isPlay))
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setCurrentIdx(currentIdx < totalIdx ? currentIdx + number : 0)

      if (audioRef.current) {
        rePlay(audioRef)
        setIsPlay((play) => !play)
      }
    },
    [currentIdx, totalIdx, songList],
  )

  const onChangePlaySong = useCallback(
    (song, audioRef) => {
      console.log({ 'activeSong: ': song })
      if (audioRef && audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlay((isPlay) => (isPlay ? !isPlay : isPlay))

      const index = songList.findIndex((item) => item.audio === song.audio)
      if (index > -1) setCurrentIdx(index)

      // 1초후 rePlay!
      if (audioRef && audioRef.current) {
        rePlay(audioRef)
        setIsPlay((play) => !play)
      }

      setIsListVisible((visible) => !visible)
    },
    [songList],
  )

  return (
    <>
      <Player
        songList={songList}
        currentIdx={currentIdx}
        isPlay={isPlay}
        isListVisible={isListVisible}
        handlePlaylistVisible={handlePlaylistVisible}
        onPlaySong={onPlaySong}
        onStopSong={onStopSong}
        onNextPrevSong={onNextPrevSong}
        onChangePlaySong={onChangePlaySong}
      />
    </>
  )
}

function rePlay(audioRef, second = 700) {
  if (!audioRef) throw new Error('audioRef is null')

  setTimeout(() => {
    audioRef.current.play()
  }, second)
}

/*
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
<audio controls>
 <source src="foo.opus" type="audio/ogg; codecs=opus"/>
 <source src="foo.ogg" type="audio/ogg; codecs=vorbis"/>
 <source src="foo.mp3" type="audio/mpeg"/>
</audio>
* */
function sampleList() {
  return [
    {
      thumbnail: sampleImg1,
      audio: sampleSong1,
      songTitle: '01 lost stars',
      artist: 'adam levine',
      format: 'audio/mpeg',
    },
    {
      thumbnail: sampleImg2,
      audio: sampleSong2,
      songTitle: '02 tell me if you wanna go home',
      artist: 'keira knightley',
      format: 'audio/mpeg',
    },
    {
      thumbnail: sampleImg3,
      audio: sampleSong3,
      songTitle: '03 no one else like you',
      artist: 'adam levine',
      format: 'audio/mpeg',
    },
    {
      thumbnail: sampleImg4,
      audio: sampleSong4,
      songTitle: '04 green horny',
      artist: 'ceelo',
      format: 'audio/mpeg',
    },
    {
      thumbnail: sampleImg5,
      audio: sampleSong5,
      songTitle: '05 lost starts',
      artist: 'keira knightley',
      format: 'audio/mpeg',
    },
    {
      thumbnail: '',
      audio: '',
      songTitle: "Simon's Song",
      artist: 'Dan Lebowitz',
      format: 'audio/mpeg',
    },
    {
      thumbnail: 'none',
      audio: 'Scanline.mp3',
      songTitle: 'Scanline',
      artist: 'Mike Relm',
      format: 'audio/mpeg',
    },
    {
      thumbnail: 'Flight_To_Tunisia.jpg',
      audio: 'Flight_To_Tunisia.mp3',
      songTitle: 'Flight To Tunisia',
      artist: 'Causmic',
      format: 'audio/mpeg',
    },
    {
      thumbnail: 'Calimba.jpg',
      audio: 'Calimba.mp3',
      songTitle: 'Calimba',
      artist: "E's Jammy Jams",
      format: 'audio/mpeg',
    },
    {
      thumbnail: 'Everglow.jpg',
      audio: 'Everglow.mp3',
      songTitle: 'Everglow',
      artist: 'Patrick Patrikios',
      format: 'audio/mpeg',
    },
  ]
}
export default PlayerContainer
