import React, {useState, useEffect, useCallback, useRef} from 'react'
import Player from 'components/player/player'
import currentSong from 'resouces/audio/Stevie Wonder Greatest Hits - Best Songs Of Stevie Wonder Full Playlist.mp3';

// import axios from 'axios'

let list = [
  {
    thumbnail: 'Bright_Future.jpg',
    audio: 'Bright_Future.mp3',
    songTitle: 'Bright Future',
    artist: 'Silent Partner',
  },
  {
    thumbnail: 'Bovi.jpg',
    audio: 'Bovi.mp3',
    songTitle: 'Bovi',
    artist: 'The Grand Affair',
  },
  {
    thumbnail: 'Sunny_Looks_Good_on_You.jpg',
    audio: 'Sunny_Looks_Good_on_You.mp3',
    songTitle: 'Sunny Looks Good on You',
    artist: 'Midnight North',
  },
  {
    thumbnail: 'Bright_Eyed_Blues.jpg',
    audio: 'Bright_Eyed_Blues.mp3',
    songTitle: 'Bright Eyed Blues',
    artist: 'Unicorn Heads',
  },
  {
    thumbnail: 'How_it_Began.jpg',
    audio: 'How_it_Began.mp3',
    songTitle: 'How it Began',
    artist: 'Silent Partner',
  },
  {
    thumbnail: 'Simon_s_Song.jpg',
    audio: 'Simon_s_Song.mp3',
    songTitle: "Simon's Song",
    artist: 'Dan Lebowitz',
  },
  {
    thumbnail: 'Scanline.jpg',
    audio: 'Scanline.mp3',
    songTitle: 'Scanline',
    artist: 'Mike Relm',
  },
  {
    thumbnail: 'Flight_To_Tunisia.jpg',
    audio: 'Flight_To_Tunisia.mp3',
    songTitle: 'Flight To Tunisia',
    artist: 'Causmic',
  },
  {
    thumbnail: 'Calimba.jpg',
    audio: 'Calimba.mp3',
    songTitle: 'Calimba',
    artist: "E's Jammy Jams",
  },
  {
    thumbnail: 'Everglow.jpg',
    audio: 'Everglow.mp3',
    songTitle: 'Everglow',
    artist: 'Patrick Patrikios',
  },
]

function PlayerContainer({}) {
  // const [state, setState] = useState({});
  const [isPlay, setIsPlay] = useState(false)
  const [isListVisible, setIsListVisible] = useState(false)
  const [songList, setSongList] = useState([])
  useEffect(() => {
    setSongList(list)
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

  const onNextSong = useCallback(() => {}, [])

  const onPlaySong = useCallback((audioRef) => {
    setIsPlay((isPlay) => !isPlay)
    // console.log({ ref })
    audioRef.current && audioRef.current.play();
  }, [])
  const onStopSong = useCallback((audioRef) => {
    setIsPlay((isPlay) => !isPlay)
    audioRef && audioRef.current.pause();
  }, [])


  const onPrevSong = useCallback(() => {}, [])

  const onChangePlaySong = useCallback((song) => {
    console.log({ 'activeSong: ': song })

    setIsListVisible((visible) => !visible)
  }, [])

  return (
    <>
      <Player
        currentSong={currentSong}
        songList={songList}
        isPlay={isPlay}
        isListVisible={isListVisible}
        handlePlaylistVisible={handlePlaylistVisible}
        onPrevSong={onPrevSong}
        onPlaySong={onPlaySong}
        onStopSong={onStopSong}
        onNextSong={onNextSong}
        onChangePlaySong={onChangePlaySong}
      />
    </>
  )
}

export default PlayerContainer
