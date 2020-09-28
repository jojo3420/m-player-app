import React, { useRef } from 'react'
import SongList from 'components/player/SongList'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import palette from 'lib/styles/palette'
import {
  faForward,
  faPlay,
  faPause,
  faBackward,
  faAngleUp,
  faAngleDown,
  faVolumeMute,
  faVolumeUp,
  faVolumeDown,
} from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'

Player.propTypes = {
  songList: PropTypes.array.isRequired,
  currentIdx: PropTypes.number.isRequired,
  isPlay: PropTypes.bool,
  isListShow: PropTypes.bool,
  volume: PropTypes.number,
  muted: PropTypes.bool,
  seeking: PropTypes.number,
  durationSecond: PropTypes.number,
  handleSeek: PropTypes.func,
  handlePlaylistVisible: PropTypes.func,
  handleSongMute: PropTypes.func,
  handleSongVolume: PropTypes.func,
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
  volume,
  muted,
  seeking,
  durationSecond,
  handleSeek,
  setIsSeek,
  handlePlaylistVisible,
  handleSongMute,
  handleSongVolume,
  onPlaySong,
  onStopSong,
  onNextPrevSong,
  onChangePlaySong,
}) {
  const currentSong = songList[currentIdx] || {}
  const { songTitle, artist, thumbnail } = currentSong || {}

  return (
    <PlayerMain className="player">
      <div className="main">
        <audio alt="audio player">
          Your browser does not support the <code>audio</code> element.
        </audio>

        <div className="thumbnail">
          <img src={thumbnail} height={270} alt="thumbnail" />
        </div>
        <div className="seekbar">
          <input
            type="range"
            value={seeking}
            step={1}
            min={0}
            max={durationSecond}
            onChange={handleSeek}
            onMouseDown={() => setIsSeek(true)}
            onMouseUp={() => setIsSeek(false)}
          />
        </div>
        <div className="details">
          <h2 className="active-song-name">{songTitle}</h2>
          <p className="active-artist-name">{artist}</p>
        </div>
        <div className="controls">
          <div className="prev-control">
            <FontAwesomeIcon
              onClick={onNextPrevSong.bind(null, -1)}
              className="icon prev"
              icon={faBackward}
            />
          </div>
          <div className="play-pause-control">
            {isPlay ? (
              <FontAwesomeIcon
                className="icon pause"
                icon={faPause}
                onClick={onStopSong.bind(null)}
              />
            ) : (
              <FontAwesomeIcon
                onClick={onPlaySong.bind(null)}
                className="icon play"
                icon={faPlay}
              />
            )}
          </div>
          <div className="next-control">
            <FontAwesomeIcon
              onClick={onNextPrevSong.bind(null, +1)}
              className="icon next"
              icon={faForward}
            />
          </div>
          <div className="mute-control">
            <FontAwesomeIcon
              icon={muted ? faVolumeMute : faVolumeUp}
              onClick={handleSongMute}
              className="icon muted"
            />
          </div>
        </div>
        <div className="volume-slider">
          {/*<FontAwesomeIcon icon={faVolumeUp} className="icon" />*/}
          {true && (
            <input
              type="range"
              value={volume}
              step={1}
              min={0}
              max={100}
              onChange={handleSongVolume}
            />
          )}
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
        <SongList list={songList} onChangePlaySong={onChangePlaySong} />
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
      height: 5px;
      outline: none;
      background: #aaa;
      overflow: hidden;
    }
  }
  .seekbar input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    box-shadow: -300px 0 0 300px ${palette.blue[6]};
  }
  .volume-slider {
    margin-top: 25px;
    display: flex;
    justify-content: center;
    input[type='range'] {
      -webkit-appearance: none;
      width: 60%;
      height: 6px;
      outline: none;
      background: #aaa;
      overflow: hidden;
      cursor: pointer;
    }
    .icon {
      cursor: pointer;
    }
  }
  .volume-slider input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    box-shadow: -300px 0 0 300px ${palette.violet[5]};
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
    margin: 0 20px;
    cursor: pointer;
  }
  .icon {
    font-size: 1.5625rem;
    color: #ddd;
    transition: all 0.3s linear;
    &:hover {
      color: white;
    }
  }
  .play {
    display: block;
  }
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
    transition: all 0.3s linear;
    &:hover {
      color: white;
    }
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
