import instance from './axios-setup';

/*
서비스명	text	Y
인증키	text	Y
요청타입	text	Y
언어	text	Y
요청시작건수	text	Y
요청종료건수	text	Y
 */

const KEY = process.env.REACT_APP_API_KEY;

export const sample = () => {
	// http://ecos.bok.or.kr/api/KeyStatisticList/sample/xml/kr/1/10/
	const url = `/KeyStatisticList/${KEY}/json/kr/1/10/`;
	return instance.get(url);
};
