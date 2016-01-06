# SUJI [![Build Status](https://travis-ci.org/naver-d2-suji/suji.svg)](https://travis-ci.org/naver-d2-suji/suji)
> 소상공인들이 수지 맞기를 기원하는 웹 기반 오픈소스 POS 시스템

&nbsp;

## Development Stack
> 개발 언어 및 스택 소개

- Language : Javascript
- Framework : [Node.js](https://nodejs.org/), [Express](http://expressjs.com/)
- Use Modules : async, should, supertest, mocha, jQuery
- Server : [DigitalOcean](https://www.digitalocean.com/), [nginX](http://nginx.org/)
- Database : MariaDB
- Build & Test Tool : [Grunt](www.gruntjs.com/), [Travis CI](https://www.travis-ci.org/)

## REST API
> REST API Definition

| Feature |	Method	| Request URL | Todo Status |
| :------------ |	:-------:	| :-----------------| :--------: |
| 회원가입 |	POST	| /api/v1.1/user/register | complete |
| 로그인 |	GET	| /api/v1.1/user/login | complete |
| 카테고리 목록 |	GET	| /api/v1.1/category | complete |
| 카테고리 추가 |	POST	| /api/v1.1/category/insert | complete |
| 카테고리별 메뉴 목록 |	GET	| /api/v1.1/menu/:category | complete |
| 메뉴 목록 |	GET	| /api/v1.1/menu | complete |
| 메뉴 추가 |	POST	| /api/v1.1/menu/insert | complete |
| 메뉴 삭제 |	POST	| /api/v1.1/menu/delete | complete |
| 구매 목록 |	GET	| /api/v1.1/purchase | complete |
| 구매 리스트 추가 |	POST	| /api/v1.1/purchase/add | complete |
| 구매 리스트 삭제 |	POST	| /api/v1.1/purchase/delete | complete |



## 사용한 오픈소스 이름과 홈페이지 목록
- [Point of Sale Interface using AngularJS](http://codepen.io/fatihbs/pen/HufEx)
- [AngularJS Basic HTTP Authentication](https://github.com/cornflourblue/angular-authentication-example)
