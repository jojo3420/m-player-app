import React, { useState, useEffect, useCallback, useRef } from 'react'
// import _useState from 'lib/hooks/_useState'
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
import { calcAudioDuration } from 'lib/util'
import { chain, add, multiply, round, divide } from 'mathjs'

function PlayerContainer({}) {
  const [audio, setAudio] = useState(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [volume, setVolume] = useState(1)
  const [seeking, setSeeking] = useState(0)
  // const [volumeVisible, setVolumeVisible] = useState(false)
  const [muted, setMuted] = useState(false)
  const [totalIdx, setTotalIdx] = useState(0)
  const [isPlay, setIsPlay] = useState(false)
  const [isSeek, setIsSeek] = useState(false)
  const [durationSecond, setDurationSecond] = useState(-1)
  // const [intervalID, setIntervalID] = useState(null)
  const [isListVisible, setIsListVisible] = useState(false)
  const [songList, setSongList] = useState([])

  useEffect(() => {
    const list = sampleList() || []
    setSongList(list)
    setTotalIdx(list.length)
    const audioObj = new Audio()
    setAudio(audioObj)

    if (Array.isArray(list) && list.length > 0) {
      audioObj.src = list[0].audio
      audioObj.preload = 'auto'
    }

    audioObj.addEventListener('loadeddata', () => {
      const duration = audioObj.duration
      const { h, m, s } = calcAudioDuration(duration, null)
      // console.log({ h, m, s })

      const second =
        h > 0
          ? chain(h * 60 + m)
              .multiply(60)
              .add(s)
              .multiply(1000)
              .done()
          : chain(m).multiply(60).add(s).multiply(1000).done()
      // console.log({ second })
      setDurationSecond(second)
    })

    audioObj.addEventListener('ended', (e) => {
      console.log('ended.')
      setSeeking(0)
      audioObj.pause()
      // setIsPlay(false)
      setCurrentIdx((currentIdx) =>
        currentIdx < list.length ? currentIdx + 1 : 0,
      )
    })
  }, [])

  useEffect(() => {
    // 플레이 리스트 index 1부터 끝까지 자동 재생
    const autoPlay = () => {
      if (isPlay && currentIdx > 0) {
        audio.src = songList[currentIdx].audio
        audio.play()
        setIsPlay(true)
      }
    }
    autoPlay()
  }, [currentIdx, audio, isPlay, songList])

  // 오디오 듀레이션 맞게 seeking 따라가기
  // useEffect(() => {
  //   if (isPlay && seeking > 0) {
  //     // 플레이, 자동재생
  //     const duration = chain(audio.duration).round(1).multiply(1000).done()
  //     console.log({ duration }) //  268 second * 1000 => 268000
  //     const id = setInterval(() => {
  //       setSeeking((seeking) => {
  //         console.log({ seeking })
  //         return seeking + 1
  //       })
  //     }, 1000)
  //   } else {
  //     // 일시 정지
  //   }
  // }, [isPlay, audio, seeking])

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
        setSeeking(0)
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
        setSeeking(0)
      }

      setIsListVisible((visible) => !visible)
    },
    [audio, songList],
  )

  const handleSongVolume = useCallback(
    (e) => {
      const { value } = e.target
      // iput.range 범위는 1 ~ 100 이나 실제 범위는 0 ~ 1 사이값
      audio.volume = value / 100
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

  const handleSeek = useCallback(
    (e) => {
      if (isSeek) {
        const { value } = e.target
        const floatValue = parseFloat(value)
        setSeeking(floatValue)
        // input.range max 값이 duration * 1000 이므로
        const toSeeking = divide(floatValue, 1000)
        // console.log({ toSeeking })
        audio.currentTime = toSeeking
      }
    },
    [audio, isSeek],
  )

  return (
    <>
      <Player
        songList={songList}
        currentIdx={currentIdx}
        isPlay={isPlay}
        volume={volume}
        muted={muted}
        isSeek={isSeek}
        seeking={seeking}
        durationSecond={durationSecond}
        handleSeek={handleSeek}
        setIsSeek={setIsSeek}
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
//
// const playAfter = (second, audio) => {
//   setTimeout(() => {
//     audio.src = list[currentIdx].audio
//     audioObj.play()
//     setIsPlay(true)
//   }, second);
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
      thumbnail: 'Scanline.jpg',
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
