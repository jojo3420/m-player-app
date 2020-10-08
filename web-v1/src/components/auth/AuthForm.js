// import React from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom'
// import palette from 'lib/styles/palette'
// import Button from 'components/global/Button'
//
// /**
//  * 회원가입 또는 로그인 폼을 보여 줍니다.
//  */
//
// const AuthForm = ({
//   type,
//   register,
//   errors,
//   handleSubmit,
//   onSubmit,
//   onSendSMS,
// }) => {
//   const title =
//     type === 'signIn' ? '로그인' : type === 'signUp' ? '회원가입' : ''
//   return (
//     <AuthFormBlock>
//       <h3>{title}</h3>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <StyledInput
//           type="email"
//           autoComplete="email"
//           name="email"
//           placeholder="email 입력"
//           ref={register({
//             required: true,
//             maxLength: 40,
//             /* pattern: '' */
//           })}
//         />
//         <ErrorMsg>{errors.email && 'email is required'}</ErrorMsg>
//         <StyledInput
//           type="password"
//           autoComplete="off"
//           name="pw1"
//           placeholder="password 입력"
//           ref={register({ required: true, min: 8, max: 20 })}
//         />
//         <ErrorMsg>{errors.pw1 && 'password is required'}</ErrorMsg>
//         {type === 'signUp' && (
//           <>
//             <StyledInput
//               type="password"
//               autoComplete="off"
//               name="pw2"
//               placeholder="confirm password 입력"
//               ref={register({ required: true, min: 8, max: 20 })}
//             />
//             <ErrorMsg>{errors.pw2 && 'confirm password is required'}</ErrorMsg>
//             <StyledInput
//               type="text"
//               name="username"
//               placeholder="username 입력"
//               ref={
//                 type === 'signUp'
//                   ? register({ required: true, maxLength: 20 })
//                   : register
//               }
//             />
//             <ErrorMsg>{errors.username && 'username is required'}</ErrorMsg>
//             <StyledInput
//               type="tel"
//               name="mobile"
//               placeholder="모바일 번호 입력"
//               ref={type === 'signUp' ? register({ required: true }) : register}
//             />
//             <ErrorMsg>
//               {errors.mobile && 'mobile password is required'}
//             </ErrorMsg>
//             <Button onClick={onSendSMS}>인증번호 전송</Button>
//             <StyledInput
//               type="number"
//               name="certificationNo"
//               placeholder="모바일 인증번호 입력"
//               ref={
//                 type === 'signUp'
//                   ? register({ required: true, minLength: 5, maxLength: 6 })
//                   : register
//               }
//             />
//             <ErrorMsg>
//               {errors['certificationNo'] && 'certificationNo_ is required'}
//             </ErrorMsg>
//           </>
//         )}
//         <ButtonWithMarginTop type="submit" fullWidth color="indigo">
//           {title}
//         </ButtonWithMarginTop>
//       </form>
//
//       <Footer>
//         <Link to={type === 'signIn' ? '/signup' : '/signin'}>
//           {type === 'signIn' ? '회원가입 이동' : '로그인 이동'}
//         </Link>
//       </Footer>
//     </AuthFormBlock>
//   )
// }
//
// const AuthFormBlock = styled.div`
//   h3 {
//     margin: 0 0 1rem;
//     color: ${palette.gray[8]};
//     font-size: 1.1rem;
//     font-weight: bold;
//   }
// `
// const StyledInput = styled.input`
//   font-size: 1rem;
//   border: none;
//   border-bottom: 1px solid ${palette.gray[5]};
//   padding-bottom: 0.5rem;
//   outline: none;
//   width: 100%;
//   //margin-bottom: 2rem;
//   &:focus {
//     color: ${palette.gray[7]};
//     border-bottom: 1px solid ${palette.gray[7]};
//   }
//   & + & {
//     margin-top: 1rem;
//   }
// `
// const Footer = styled.footer`
//   margin-top: 2rem;
//   text-align: right;
//   a {
//     color: ${palette.gray[6]};
//     text-decoration: none;
//     &:hover {
//       text-decoration: underline;
//       color: ${palette.gray[9]};
//     }
//   }
// `
//
// const ErrorMsg = styled.p`
//   color: ${palette.red[6]};
// `
//
// const ButtonWithMarginTop = styled(Button)`
//   margin-top: 1rem;
//   margin-bottom: 0.5rem;
// `
//
// export default AuthForm
