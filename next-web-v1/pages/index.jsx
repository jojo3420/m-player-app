// import fetch from 'node-fetch'
import axios from 'axios'
// import fs from 'fs';
// import path from 'path';

/**
 * index page
 * https://medium.com/@pks2974/nextjs-%EB%A1%9C-static-site-%EB%A7%8C%EB%93%A4%EA%B8%B0-f9ab83f29e7
 * @param props
 * @return {*}
 * @constructor
 */
export default function Index({ message, data }) {
  console.log({ message, data })
  return (
    <div>
      <h1>Welcome to {message}</h1>
      <h2>dog api</h2>
      <picture>
        <source srcSet={data.message} width={200} />
        <img src={data.message} alt="" width={200} />
      </picture>
    </div>
  );
}

export async function getStaticProps(context) {
  // 1. fetch
  let url = 'https://dog.ceo/api/breeds/image/random'
  const response = await axios(url);
  const data = response.data;
  return {
    props: {
      message: "Next.js!",
      data,
    },
  };

  // 2. axios
  // let url = 'http://localhost:4000/images/sample-album.jpg';
  // const response = await axios(url);
  // console.log({ response })
  // const data = response.data;

  // return {
  //   props: {
  //     message: "Next.js!",
  //     data: url,
  //   },
  // };
}


