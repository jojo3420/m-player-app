export const emailPattern = /[\w.]+@[.\w]+\.[\w]+$/

// 휴대폰 번호 형식 체크
export function validationMobile(mobile) {
  if (!mobile.includes('-')) {
    const pattern2 = /^[\d]{3}[\d]{3,4}[\d]{4}$/
    return pattern2.test(mobile)
  }

  const pattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/
  return pattern.test(mobile)
}

// TODO - 더욱 정교하게 개선 피리요함
export function validationEmail(email) {
  return emailPattern.test(email)
}
