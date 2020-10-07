// import { useEffect } from 'react'
// const useInfinityScroll = ({
//   root = null,
//   target,
//   onIntersect,
//   threshold = 1.0,
//   rootMargin = '0px',
// }) => {
//   useEffect(() => {
//     console.log({ target })
//     const observer = new IntersectionObserver(onIntersect, {
//       root,
//       rootMargin,
//       threshold,
//     })
//     if (!target) {
//       return
//     }
//     observer.observe(target)
//     return () => {
//       observer.unobserve(target)
//     }
//   }, [target, root, rootMargin, onIntersect, threshold])
// }
// export default useInfinityScroll
