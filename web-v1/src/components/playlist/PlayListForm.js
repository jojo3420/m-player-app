import React from 'react'
import styled from 'styled-components'
import StyledInput from 'components/global/StyledInput'
import Button from 'components/global/Button'
import FormBlockWithTitle from 'components/global/FormBlockWithTitle'
import useTitle from 'lib/hooks/useTitle'
import palette from 'lib/styles/palette'
import PropTypes from 'prop-types'

PlayListForm.propTypes = {
  form: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleFile: PropTypes.func,
  onCreatePlaylist: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
}

function PlayListForm({
  form,
  handleChange,
  handleFile,
  onCreatePlaylist,
  onCancel,
}) {
  useTitle('플레이리스트 신규')
  const { title, description, avatar } = form

  return (
    <FormBlockWithTitle>
      <h3>플레이리스트 등록</h3>
      <form onSubmit={onCreatePlaylist}>
        <StyledInput
          placeholder={'플레이리스트 제목'}
          name="title"
          value={title}
          onChange={handleChange}
        />
        <StyledInput
          placeholder="플레이리스트 설명"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <FileBlock>
          <label>
            플레이리스트 대표 이미지
            <FileInput
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .heif, .bmp"
              name="avatar"
              value={avatar}
              onChange={handleFile}
            />
          </label>
        </FileBlock>
        <div>
          <Button type="submit" fullWidth color="indigo">
            등록
          </Button>
          <Button type="button" fullWidth color="yellow" onClick={onCancel}>
            뒤로 가기
          </Button>
        </div>
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
