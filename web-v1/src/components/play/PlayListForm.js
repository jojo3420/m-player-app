import React from 'react'
import styled from 'styled-components'
import StyledInput from 'components/global/StyledInput'
import Button from 'components/global/Button'
import FormBlockWithTitle from 'components/global/FormBlockWithTitle'
import useTitle from 'lib/hooks/useTitle'
import palette from 'lib/styles/palette'

function PlayListForm({ form, onSubmit, onCancel }) {
  useTitle('플레이리스트 등록')

  const {
    title,
    description,
    avatar,
    setTitle,
    setDescription,
    setAvatar,
  } = form

  return (
    <FormBlockWithTitle>
      <h3>플레이리스트 등록</h3>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="title"
          value={title}
          placeholder={'플레이리스트 제목'}
          // onChange={e => setTitle.bind(this, )}
          // ref={register({ require: true })}
        />
        <StyledInput
          name="description"
          value={description}
          placeholder="플레이리스트 설명"
          // ref={register({ require: false })}
        />
        <FileBlock>
          <FileInput
            type="file"
            name="avatar"
            placeholder="플레이리스트 자켓사진"
            // ref={register({ require: false })}
          />
        </FileBlock>
        <Button type="submit" fullWidth color="indigo">
          등록
        </Button>
        <Button type="button" fullWidth color="yellow" onClick={onCancel}>
          뒤로 가기
        </Button>
      </form>
    </FormBlockWithTitle>
  )
}

const FileInput = styled.input`
  color: green;
`
const FileBlock = styled.div`
  background: yellow;
  input[type='file'] {
    color: ${palette.gray[7]};
    //background: #00b7ff;
  }
`

export default PlayListForm
