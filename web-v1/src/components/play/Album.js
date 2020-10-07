import React from 'react'

function Album({
  album,
  formField,
  handleField,
  handleAudios,
  onSubmitFileSave,
}) {
  if (!album) return null

  // const { title, artist, genre } = formField
  // console.log({ title, artist, genre })
  const { title, description, avatar } = album

  return (
    <>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
        <img src={`/images/${avatar}`} alt="album avatar" />
      </div>

      <form onSubmit={onSubmitFileSave}>
        {/*<label>*/}
        {/*  파일명: <input value={title} name="title" onChange={handleField} />*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  아티스트:*/}
        {/*  <input value={artist} name={'artist'} onChange={handleField} />*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  장르: <input value={genre} name={'genre'} onChange={handleField} />*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  오디오 파일:*/}
        {/*  <input type="file" multiple={true} onChange={handleAudios} />*/}
        {/*</label>*/}
        {/*<button type={'submit'}>오디오 저장</button>*/}
      </form>
    </>
  )
}

export default Album
