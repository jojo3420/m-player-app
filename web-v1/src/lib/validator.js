// 휴대폰 번호 형식 체크
export function validationMobile(mobile) {
  const pattern = /[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/
  return pattern.test(mobile)
}
