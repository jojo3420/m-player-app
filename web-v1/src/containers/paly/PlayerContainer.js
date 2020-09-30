import React, { useState, useEffect, useCallback, useRef } from 'react'
import Player from 'components/play/player'
import { calcAudioDuration } from 'lib/util'
import { chain, add, multiply, round, divide } from 'mathjs'
import { message } from 'antd'
import { msg } from 'lib/constant'
// import useInterval from 'lib/hooks/useInterval'

/**
 * 음악 재생 플레이어 컨테이너
 * @return {*}
 * @constructor
 */
function PlayerContainer({}) {
  const [audio, setAudio] = useState(null) // 오디오 객체
  const [currentIdx, setCurrentIdx] = useState(0) // 현재 플레이리스트 재생 인덱스
  const [volume, setVolume] = useState(60) // 볼륨크기
  const [seeking, setSeeking] = useState(0) // 재생구간
  const [muted, setMuted] = useState(false) // 뮤트여부
  const [totalIdx, setTotalIdx] = useState(0) // 전체 플레이리스트 갯수
  const [isPlay, setIsPlay] = useState(false) // 재생상태
  const [isSeek, setIsSeek] = useState(false) //  탐색 여부
  const [duration, setDuration] = useState(null) // 오디오 듀레이션
  const [restSecond, setRestSecond] = useState(0) // 남은 초
  const [usedSecond, setUsedSecond] = useState(0) // 재생한 초
  const [humanRestTime, setHumanRestTime] = useState('0:00') // 남은 시간
  const [humanUsedTime, setHumanUsedTime] = useState('0:00') // 재생 시간
  const [intervalID, setIntervalID] = useState(null) // 인터벌 아이디
  const [isListVisible, setIsListVisible] = useState(false) // 재생목록 show/hide
  const [isAutoPlayMode, setIsAutoPlayMode] = useState(true) // 자동재생모드
  const [songList, setSongList] = useState([]) // 송리스트 배열

  useEffect(() => {
    console.log('first load and server interface')

    const list = sampleList() || []
    setSongList(list)
    setTotalIdx(list.length - 1) // index는 0부터 시작 하므로 0 ~ length-1 사이가 재생인덱
    const audioObj = new Audio()
    setAudio(audioObj)
    audioObj.volume = 0.6

    if (Array.isArray(list) && list.length > 0) {
      audioObj.src = list[0].audio
      audioObj.preload = 'auto'
    }

    audioObj.addEventListener('loadeddata', () => {
      console.log('song loadeddata')
      songInit(
        audioObj,
        setDuration,
        setHumanRestTime,
        setRestSecond,
        setHumanUsedTime,
        setUsedSecond,
        setSeeking,
      )
    })

    // 재생 완료후 오디오 초기화 하기
    // play seek = 0, usedSecond = 0, restSecond = 0
    // humanUsedSecond = '0:00' humanRestSecond=?
    // duration=현재 재생곡으로 듀레이션 유지하거나, 다음 곡 듀레이션으로 변경 (자동재생 모드에따라 결정)
    audioObj.addEventListener('ended', (e) => {
      console.log('current song ended.')
      songInit(
        audioObj,
        setDuration,
        setHumanRestTime,
        setRestSecond,
        setHumanUsedTime,
        setUsedSecond,
        setSeeking,
      )
      stopSong(audioObj, setIsPlay)

      // (자동 재생 모드) - 다음곡으로 인덱스 이동 하거나 처음으로 리스트 처음으로 이동 _
      if (isAutoPlayMode) {
        setCurrentIdx((currentIdx) =>
          currentIdx < list.length - 1 ? currentIdx + 1 : 0,
        )
      }
    })
  }, [isAutoPlayMode])

  // 자동 재생
  // useEffect(() => {
  //   const autoPlay = () => {
  //     if (
  //       isPlay === false &&
  //       currentIdx > 0 &&
  //       isAutoPlayMode &&
  //       usedSecond === 0 &&
  //       seeking === 0 &&
  //       restSecond === Math.ceil(duration)
  //     ) {
  //       console.log('autoPlay!' + currentIdx)
  //       playSong(audio, songList[currentIdx], setIsPlay)
  //     }
  //   }
  //   autoPlay()
  // }, [
  //   isPlay,
  //   currentIdx,
  //   audio,
  //   isAutoPlayMode,
  //   songList,
  //   usedSecond,
  //   seeking,
  //   restSecond,
  //   duration,
  // ])

  // 오디오 듀레이션 맞게 seeking 따라가기
  useEffect(() => {
    if (isPlay) {
      // seeking > 0
      // console.log('재생중...' + seeking)
      // const duration = chain(audio.duration).round(1).multiply(1000).done()
      const id = setInterval(() => {
        setRestSecond((second) => second - 1)
        setUsedSecond((second) => second + 1)
        tick(
          restSecond - 1,
          usedSecond + 1,
          setHumanRestTime,
          setHumanUsedTime,
          setSeeking,
        )
      }, 1000)
      setIntervalID(id)
      return () => window.clearInterval(id)
    }
  }, [isPlay, seeking, restSecond, usedSecond])

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
        console.log('onNextPrevSong => ' + nextOrPrevNumber)
        stopSong(audio, setIsPlay)
        const index = currentIdx < totalIdx ? currentIdx + nextOrPrevNumber : 0
        setCurrentIdx(index)
        playSong(audio, songList[index], setIsPlay)
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
        playSong(audio, songList[index], setIsPlay)
        setIsListVisible((visible) => !visible)
      }
    },
    [audio, songList],
  )

  const handleSongVolume = useCallback(
    (e) => {
      const { value } = e.target
      // iput.range 범위는 1 ~ 100 이나 실제 범위는 0 ~ 1 사이값
      console.log({ value })
      const volume = parseInt(value, 10)
      audio.volume = volume / 100
      setVolume(volume)
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
        const seek = parseInt(value, 10)
        // console.log({ seek })
        setSeeking(seek)
        // input.range max 값이 duration * 1000 이므로
        // const toSeeking = divide(seek, 1000)
        // console.log({ toSeeking })
        audio.currentTime = seek

        // 남은시간, 재생한 시간 계산후 업데이트
        setRestSecond(() => Math.ceil(audio.duration) - seek)
        setUsedSecond(seek)
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
        duration={duration}
        volume={volume}
        muted={muted}
        isSeek={isSeek}
        seeking={seeking}
        restSecond={restSecond}
        useSecond={usedSecond}
        humanRestTime={humanRestTime}
        humanUsedTime={humanUsedTime}
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
        setIsAutoPlayMode={setIsAutoPlayMode}
      />
    </>
  )
}
// 처음 재생
function playSong(audio, song, setIsPlay) {
  // setSeeking(0)
  const source = song.audio
  if (!source) {
    message.warning(msg.noAudio)
    return
  }
  audio.src = source
  audio.play()
  setIsPlay(true)
}

function stopSong(audio, setIsPlay) {
  audio && audio.pause()
  setIsPlay(false)
}

// 재생 완료후 오디오 초기화 하기
// play seek = 0, usedSecond = 0, restSecond = 0
// humanUsedSecond = '0:00' humanRestSecond=?
// duration=현재 재생곡으로 듀레이션 유지하거나, 다음 곡 듀레이션으로 변경 (자동재생 모드에따라 결정)
// isPlay=false
function audioStateInit(setSeeking, setUsedSecond, setDuration) {
  //
  // setUsedSecond,
  // setHumanUsedTime,
}

const tick = (
  restDuration,
  usedSecond,
  setHumanRestTime,
  setHumanUsedTime,
  setSeeking,
) => {
  setSeeking((seeking) => seeking + 1)
  const humanRestTime = calcAudioDuration(restDuration, 'human')
  const humanUsedTime = calcAudioDuration(usedSecond, 'human')
  setHumanRestTime(humanRestTime)
  setHumanUsedTime(humanUsedTime)
}

const songInit = (
  audio,
  setDuration,
  setHumanRestTime,
  setRestSecond,
  setHumanUsedTime,
  setUsedSecond,
  setSeeking,
) => {
  audio.currentTime = 0
  const duration = audio.duration
  setDuration(duration)
  const { h, m, s } = calcAudioDuration(duration, null)
  const humanRestTime = calcAudioDuration(duration, 'human')
  const restSecond =
    h > 0
      ? chain(h * 60 + m)
          .multiply(60)
          .add(s)
          .done()
      : chain(m).multiply(60).add(s).done()
  setHumanRestTime(humanRestTime)
  setRestSecond(restSecond)
  setHumanUsedTime('0:00')
  setUsedSecond(0)
  setSeeking(0)
}

function sampleList() {
  return [
    {
      // thumbnail: sampleImg1,
      // audio: sampleSong1,
      thumbnail: '/images/sample-album.jpg',
      audio: '/audio/01-sample.mp3',
      songTitle: '01 lost stars',
      artist: 'adam levine',
      mimeType: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg2,
      // audio: sampleSong2,
      thumbnail: '/images/sample-aobum-4.jpeg',
      audio: '/audio/02-sample.mp3',
      songTitle: '02 tell me if you wanna go home',
      artist: 'keira knightley',
      mimeType: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg3,
      // audio: sampleSong3,
      thumbnail: '/images/sample-aobum-3.jpeg',
      audio: '/audio/03-sample.mp3',
      songTitle: '03 no one else like you',
      artist: 'adam levine',
      mimeType: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg4,
      // audio: sampleSong4,
      thumbnail: '/images/sample-aobum-4.jpeg',
      audio: '/audio/04-sample.mp3',
      songTitle: '04 green horny',
      artist: 'ceelo',
      mimeType: 'audio/mpeg',
    },
    {
      // thumbnail: sampleImg5,
      thumbnail: 'images/sample-aobum-5.jpeg',
      // audio: sampleSong5,
      audio: '/audio/05-sample.mp3',
      songTitle: '05 lost starts',
      artist: 'keira knightley',
      mimeType: 'audio/mpeg',
    },
    {
      thumbnail: '',
      audio: '',
      songTitle: "Simon's Song",
      artist: 'Dan Lebowitz',
      mimeType: 'audio/mpeg',
    },
    {
      thumbnail: '',
      audio: 'Scanline.mp3',
      songTitle: 'Scanline',
      artist: 'Mike Relm',
      mimeType: 'audio/mpeg',
    },
    {
      thumbnail: 'Flight_To_Tunisia.jpg',
      audio: 'Flight_To_Tunisia.mp3',
      songTitle: 'Flight To Tunisia',
      artist: 'Causmic',
      mimeType: 'audio/mpeg',
    },
    {
      thumbnail: 'Calimba.jpg',
      audio: 'Calimba.mp3',
      songTitle: 'Calimba',
      artist: "E's Jammy Jams",
      mimeType: 'audio/mpeg',
    },
    {
      thumbnail: 'Everglow.jpg',
      audio: 'Everglow.mp3',
      songTitle: 'Everglow',
      artist: 'Patrick Patrikios',
      mimeType: 'audio/mpeg',
    },
  ]
}
export default PlayerContainer
