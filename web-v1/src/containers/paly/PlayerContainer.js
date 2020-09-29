import React, { useState, useEffect, useCallback, useRef } from 'react'
import Player from 'components/play/player'
import { calcAudioDuration } from 'lib/util'
import { chain, add, multiply, round, divide } from 'mathjs'
import { message } from 'antd'
import { msg } from 'lib/constant'
/**
 * 음악 재생 플레이어 컨테이너
 * @return {*}
 * @constructor
 */
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
  const [humanTime, setHumanTime] = useState('')
  // const [intervalID, setIntervalID] = useState(null)
  const [isListVisible, setIsListVisible] = useState(false)
  const [songList, setSongList] = useState([])

  useEffect(() => {
    console.log('useEffect!')
    const list = sampleList() || []
    setSongList(list)
    setTotalIdx(list.length - 1) // index는 0부터 시작 하므로 0 ~ length-1 사이가 재생인덱
    const audioObj = new Audio()
    setAudio(audioObj)

    if (Array.isArray(list) && list.length > 0) {
      audioObj.src = list[0].audio
      audioObj.preload = 'auto'
    }

    audioObj.addEventListener('loadeddata', () => {
      const duration = audioObj.duration
      const { h, m, s } = calcAudioDuration(duration, null)
      const humanTime = calcAudioDuration(duration, 'human')
      setHumanTime(humanTime)
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
        currentIdx < list.length - 1 ? currentIdx + 1 : 0,
      )
    })
  }, [])

  useEffect(() => {
    // 플레이 리스트 index 1부터 끝까지 자동 재생
    const autoPlay = () => {
      if (isPlay && currentIdx > 0) {
        console.log('autoPlay!')
        const source = songList[currentIdx].audio
        if (!source) {
          message.warning(msg.noAudio)
          return
        }
        audio.src = source
        audio.play()
        setIsPlay(true)
      }
    }
    autoPlay()
  }, [currentIdx, audio, isPlay, songList])

  // 오디오 듀레이션 맞게 seeking 따라가기
  useEffect(() => {
    if (isPlay) {
      // seeking > 0
      console.log('재생중...' + seeking)
      const duration = chain(audio.duration).round(1).multiply(1000).done()
      console.log({ duration }) //  268 second * 1000 => 268000
      // const id = setInterval(() => {
      //   setSeeking((seeking) => {
      //     console.log({ seeking })
      //     return seeking + 1000
      //   })
      // }, 1000)
    } else {
      // 일시 정지
      console.log('일시 정지 상태')
    }
  }, [isPlay, audio, seeking])

  const handlePlaylistVisible = useCallback(() => {
    setIsListVisible((visible) => !visible)
  }, [])

  const onPlaySong = useCallback(() => {
    if (audio) {
      console.log('onPlaySong')
      if (!audio.src) {
        const source = songList[currentIdx].audio
        if (!source) {
          message.warning(msg.noAudio)
          return
        }
        audio.src = source
      }
      audio.play()
      setIsPlay(true)
    }
  }, [audio, songList, currentIdx])

  const onStopSong = useCallback(() => {
    console.log('onStopSong')
    stopSong(audio, setIsPlay)
  }, [audio])

  const onNextPrevSong = useCallback(
    (nextOrPrevNumber) => {
      if (audio) {
        console.log('onNextPrevSong')
        stopSong(audio, setIsPlay)
        const index = currentIdx < totalIdx ? currentIdx + nextOrPrevNumber : 0
        setCurrentIdx(index)
        playSong(setSeeking, audio, songList[index], setIsPlay)
      }
    },
    [audio, currentIdx, totalIdx, songList],
  )
  const onChangePlaySong = useCallback(
    (song) => {
      if (audio && song) {
        console.log('onChangePlaySong')
        audio && stopSong(audio, setIsPlay)
        const index = songList.findIndex((item) => item.audio === song.audio)
        if (index > -1) setCurrentIdx(index)
        playSong(setSeeking, audio, songList[index], setIsPlay)
        setIsListVisible((visible) => !visible)
      }
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
        humanTime={humanTime}
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
// 처음 재생
function playSong(setSeeking, audio, song, setIsPlay) {
  setSeeking && setSeeking(0)
  const source = song.audio
  if (!source) {
    message.warning(msg.noAudio)
    return
  }
  audio.src = source
  audio.play()
  setIsPlay(true)
}
// function _playSong() {
//
// }

function stopSong(audio, setIsPlay) {
  audio && audio.pause()
  setIsPlay(false)
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
      // thumbnail: sampleImg1,
      // audio: sampleSong1,
      thumbnail: '/images/sample-album.jpg',
      audio: '/audio/01-sample.mp3',
      songTitle: '01 lost stars',
      artist: 'adam levine',
      format: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg2,
      // audio: sampleSong2,
      thumbnail: '/images/sample-aobum-4.jpeg',
      audio: '/audio/02-sample.mp3',
      songTitle: '02 tell me if you wanna go home',
      artist: 'keira knightley',
      format: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg3,
      // audio: sampleSong3,
      thumbnail: '/images/sample-aobum-3.jpeg',
      audio: '/audio/03-sample.mp3',
      songTitle: '03 no one else like you',
      artist: 'adam levine',
      format: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg4,
      // audio: sampleSong4,
      thumbnail: '/images/sample-aobum-4.jpeg',
      audio: '/audio/04-sample.mp3',
      songTitle: '04 green horny',
      artist: 'ceelo',
      format: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg5,
      thumbnail: 'images/sample-aobum-5.jpeg',
      // audio: sampleSong5,
      audio: '/audio/05-sample.mp3',
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
      thumbnail: '',
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
