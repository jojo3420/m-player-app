import React from 'react'
import useTitle from 'lib/hooks/useTitle'
import PropTypes from 'prop-types'

FindPw.propTypes = {}
function FindPw({}) {
  useTitle('비밀번호 초기화')

  return (
    <fieldset>
      <legend>로그인 비밀번호 찾기</legend>
      <form>
        <input autoFocus />
      </form>
    </fieldset>
  )
}

export default FindPw
