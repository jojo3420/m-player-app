import React from 'react'
// import styled from 'styled-components'

// {/*<div className="list">*/}
// {/*  /!*<div className="item">*!/*/}
// {/*  /!*  <div className="thumbnail">*!/*/}
// {/*  /!*    <img src={null} alt="thumbnail-list" />*!/*/}
// {/*  /!*  </div>*!/*/}
// {/*  /!*  <div className="details">*!/*/}
// {/*  /!*    <h2>song name1</h2>*!/*/}
// {/*  /!*    <p>artist name 1</p>*!/*/}
// {/*  /!*  </div>*!/*/}
// {/*  /!*</div>*!/*/}
// {/*</div>*/}

function SongList({ list, onChangePlaySong }) {
  return (
    <div className="list">
      {Array.isArray(list) &&
        list.map((item, i) => (
          <SongItem
            key={item.title + i}
            {...item}
            onChangePlaySong={onChangePlaySong}
          />
        ))}
    </div>
  )
}

const SongItem = ({
  thumbnail,
  audio,
  songTitle,
  artist,
  onChangePlaySong,
}) => {
  return (
    <div
      className="item"
      onClick={onChangePlaySong.bind(this, {
        audio,
        songTitle,
        artist,
      })}
    >
      <div className="thumbnail item_thumbnail">
        <img src={thumbnail} alt="song-thumbnail" />
      </div>
      <div className="details">
        <h2 className="song-title">{songTitle}</h2>
        <p className="artist">{artist}</p>
      </div>
    </div>
  )
}
//
// const ListWrapper = styled.div`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
//   body {
//     height: 100vh;
//     font-family: 'Raleway';
//   }
//   .list {
//     padding: 10px;
//   }
// `
//
// const Item = styled.div`
//   display: flex;
//   padding: 5px 0;
//   border-bottom: 1px solid #222;
//   cursor: pointer;
//
//   .thumbnail item_thumbnail {
//     width: 50px;
//     height: 50px;
//     overflow: hidden;
//     img {
//       width: 100%;
//       height: 100%;
//     }
//   }
//   .details {
//     display: flex;
//     flex-direction: column;
//     justify-contet: center;
//     padding: 0 10px;
//     .song-title {
//       font-weight: normal;
//       color: #eee;
//       font-size: 16px;
//     }
//     .artist {
//       color: #aaa;
//       font-size: 15px;
//     }
//   }
// `

export default SongList
