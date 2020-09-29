import React from 'react'

function Album({
  formField,
  audios,
  handleField,
  handleAudios,
  onSubmitFileSave,
}) {
  const { title, artist, genre } = formField
  console.log({ title, artist, genre })
  return (
    <>
      <h2>Album detail</h2>
      <form onSubmit={onSubmitFileSave}>
        <label>
          파일명: <input value={title} name="title" onChange={handleField} />
        </label>
        {/*<label>*/}
        {/*  아티스트:*/}
        {/*  <input value={artist} name={'artist'} onChange={handleField} />*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  장르: <input value={genre} name={'genre'} onChange={handleField} />*/}
        {/*</label>*/}
        <label>
          오디오 파일:
          <input
            type="file"
            name="audios"
            multiple={true}
            onChange={handleAudios}
          />
        </label>
        <button type={'submit'}>오디오 저장</button>
      </form>
    </>
  )
}

export default Album
