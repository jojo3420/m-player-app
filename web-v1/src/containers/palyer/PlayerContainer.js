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
  const [audio, setAudio] = useState(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [volumeVisible, setVolumeVisible] = useState(false)
  const [muted, setMuted] = useState(false)
  const [totalIdx, setTotalIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  const [isListVisible, setIsListVisible] = useState(false)
  const [songList, setSongList] = useState([])
  useEffect(() => {
    const list = sampleList()
    setSongList(list)
    setTotalIdx(list.length || 0)
    const audioObj = new Audio()
    if (Array.isArray(list) && list.length > 0) {
      audioObj.src = list[0].audio
      audioObj.preload = true
    }

    setAudio(audioObj)
  }, [])

  const handlePlaylistVisible = useCallback(() => {
    setIsListVisible((visible) => !visible)
  }, [])

  const onPlaySong = useCallback(() => {
    setIsPlay((isPlay) => !isPlay)
    if (audio && !audio.src) audio.src = songList[currentIdx].audio

    audio && audio.play()
  }, [audio, songList, currentIdx])

  const onStopSong = useCallback(() => {
    setIsPlay((isPlay) => !isPlay)
    audio && audio.pause()
  }, [audio])

  const onNextPrevSong = useCallback(
    (number) => {
      setIsPlay((isPlay) => (isPlay ? !isPlay : isPlay))
      audio && audio.pause()
      const index = currentIdx < totalIdx ? currentIdx + number : 0
      setCurrentIdx(index)
      if (audio) {
        audio.src = songList[index].audio
        audio.play()
        setIsPlay((play) => !play)
      }
    },
    [currentIdx, totalIdx, songList, audio],
  )

  const onChangePlaySong = useCallback(
    (song) => {
      // console.log({ 'activeSong: ': song })
      audio && audio.pause()

      setIsPlay((isPlay) => (isPlay ? !isPlay : isPlay))
      const index = songList.findIndex((item) => item.audio === song.audio)
      if (index > -1) setCurrentIdx(index)

      if (audio) {
        audio.src = songList[index].audio
        audio.play()
        setIsPlay((play) => !play)
      }

      setIsListVisible((visible) => !visible)
    },
    [audio, songList],
  )

  const handleSongVolume = useCallback(
    (e) => {
      const { value } = e.target
      audio.volume = value
      setVolume(value)
    },
    [audio],
  )

  const handleSongMute = useCallback(() => {
    if (audio) {
      let muted = !audio.muted
      audio.muted = muted
      setMuted(muted)
    }
  }, [audio])

  return (
    <>
      <Player
        songList={songList}
        currentIdx={currentIdx}
        isPlay={isPlay}
        volume={volume}
        muted={muted}
        volumeVisible={volumeVisible}
        setVolumeVisible={setVolumeVisible}
        isListVisible={isListVisible}
        handlePlaylistVisible={handlePlaylistVisible}
        handleSongMute={handleSongMute}
        handleSongVolume={handleSongVolume}
        onPlaySong={onPlaySong}
        onStopSong={onStopSong}
        onNextPrevSong={onNextPrevSong}
        onChangePlaySong={onChangePlaySong}
      />
    </>
  )
}

// function rePlay(audio, second = 0) {
//   if (!audio) throw new Error('audio intance is null')
//
//   setTimeout(() => {
//     audio.play()
//   }, second)
// }

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
