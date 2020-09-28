import React, { useRef } from 'react'
import SongList from 'components/player/SongList'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactAudioPlayer from 'react-audio-player'
import {
  faForward,
  faPlay,
  faPause,
  faBackward,
  faAngleUp,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

Player.propTypes = {
  songList: PropTypes.array.isRequired,
  currentIdx: PropTypes.number.isRequired,
  isPlay: PropTypes.bool,
  isListShow: PropTypes.bool,
  handlePlaylistVisible: PropTypes.func,
  onPlaySong: PropTypes.func,
  onStopSong: PropTypes.func,
  onNextPrevSong: PropTypes.func,
  onChangePlaySong: PropTypes.func,
}

function Player({
  songList,
  currentIdx,
  isPlay,
  isListVisible,
  handlePlaylistVisible,
  onPlaySong,
  onStopSong,
  onNextPrevSong,
  onChangePlaySong,
}) {
  const ref = useRef()
  const currentSong = songList[currentIdx] || {}
  const { songTitle, artist, thumbnail, audio, format } = currentSong || {}

  return (
    <PlayerMain className={`player`}>
      <div className="main">
        <audio alt="audio player" src={audio} ref={ref} preload={true}>
          {/*<source src={audio} type={format} />*/}
          Your browser does not support the <code>audio</code> element.
        </audio>
        {/*<ReactAudioPlayer*/}
        {/*  src={audio}*/}
        {/*  preload={true}*/}
        {/*  controls={true}*/}
        {/*  ref={ref}*/}
        {/*/>*/}
        <div className="thumbnail">
          <img src={thumbnail} height={300} alt="thumbnail" />
        </div>
        <div className="seekbar">
          <input type="range" value={5} step={1} min={1} max={50} />
        </div>
        <div className="details">
          <h2 className="active-song-name">{songTitle}</h2>
          <p className="active-artist-name">{artist}</p>
        </div>
        <div className="controls">
          <div className="prev-control">
            <FontAwesomeIcon
              onClick={onNextPrevSong.bind(null, ref, -1)}
              className="icon"
              icon={faBackward}
            />
          </div>
          <div className="play-pause-control">
            {isPlay ? (
              <FontAwesomeIcon
                className="icon pause"
                icon={faPause}
                onClick={onStopSong.bind(null, ref)}
              />
            ) : (
              <FontAwesomeIcon
                onClick={onPlaySong.bind(null, ref)}
                className="icon play"
                icon={faPlay}
              />
            )}
          </div>
          <div className="next-control">
            <FontAwesomeIcon
              onClick={onNextPrevSong.bind(null, ref, +1)}
              className="icon"
              icon={faForward}
            />
          </div>
        </div>
      </div>
      <div
        className="player-list"
        style={isListVisible ? { marginTop: -350 } : {}}
      >
        <div className="toggle-list" onClick={handlePlaylistVisible}>
          {!isListVisible ? (
            <FontAwesomeIcon
              className="icon active-icon angle-up"
              icon={faAngleUp}
            />
          ) : (
            <FontAwesomeIcon
              className="icon active-icon angle-down"
              icon={faAngleDown}
            />
          )}
        </div>
        <SongList
          list={songList}
          onChangePlaySong={onChangePlaySong}
          audioRef={ref}
        />
      </div>
    </PlayerMain>
  )
}

const PlayerMain = styled.section`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    height: 100vh;
    font-family: 'Raleway';
  }

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20rem;
  height: 30rem;
  overflow: hidden;

  .main {
    width: 100%;
    height: 100%;
    background: #222;
    transition: all 500ms ease-in-out;
  }
  .thumbnail img {
    width: 100%;
  }
  .seekbar {
    margin-top: -15px;
    input[type='range'] {
      -webkit-appearance: none;
      width: 100%;
      height: 4px;
      outline: none;
      background: #aaa;
      overflow: hidden;
    }
  }
  .seekbar input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    box-shadow: -300px 0 0 300px #00acee;
  }
  .details {
    text-align: center;
    padding: 15px 0px;
    .active-song-name {
      color: #eee;
      margin-bottom: 5px;
    }
    .active-artist-name {
      font-size: 0.9375rem;
      color: #aaa;
    }
  }
  .controls {
    display: flex;
    justify-content: center;
    margin: 8px 0;
  }
  .controls > div {
    margin: 0px 30px;
    cursor: pointer;
  }
  .icon {
    font-size: 1.5625rem;
    color: #ddd;
  }
  .play {
    display: block;
  }
  //.pause {
  //display: none;
  //}
  .player-list {
    position: absolute;
    width: 100%;
    margin-top: -20px;
    height: 21.875rem;
    overflow-y: scroll;
    background: rgba(0, 0, 0, 0.8);
    z-index: 2;
    transition: all 500ms ease-in-out;
  }
  .toggle-list {
    position: sticky;
    top: 0;
    text-align: center;
    height: 20px;
    line-height: 20px;
    background: #555;
  }
  .toggle-list .active-icon {
    color: #ccc;
    font-size: 1.25rem;
    font-weight: 600;
  }
  .list {
    padding: 10px;
  }
  .list .item {
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid #222;
    cursor: pointer;
  }
  .item .thumbnail {
    width: 50px;
    height: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .item .details {
    display: flex;
    flex-direction: column;
    justify-contet: center;
    padding: 0 10px;
    h2 {
      color: #eee;
      font-size: 16px;
    }
    p {
      color: #aaa;
      font-size: 15px;
    }
  }
  .player-list::-webkit-scrollbar {
    width: 5px;
    background: #222;
  }
  .player-list::-webkit-scrollbar-thumb {
    background: #00acee;
  }
  .activeSongList .player-list {
    margin-top: -350px;
  }
  .activeSongList .main {
    filter: blur(5px);
  }
`

export default Player
