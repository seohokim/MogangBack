# Mogang API Server


  <br/>



# Project Environment

- NodeJS: v18.15.0
- TypeScript: v5.1.3
- NestJS: v10.0.0
- GraphQL: v16.8.1
- PostgreSQL: v14.9
- TypeORM: v0.3.17
- Winston v3.11.0

  <br/>

---

# Getting Started

```bash
$ git clone https://github.com/seohokim/MogangBack.git
```

  <br/>

## npm Install

npm package 설치

```bash
$ npm install
```

  <br/>

## DB Configuration

아래 config 파일을 참고하여 DB 설정을 완료해주세요

사용 DB: PostgreSQL

📜[`typeorm.config.ts`]([https://github.com/seohokim/HeartLab_test/blob/main/src/config/typeorm.config.t](https://github.com/seohokim/MogangBack/blob/main/src/config/typeorm.config.ts)

  <br/>

## Start

```bash
$ npm run start
```

  <br/>

  <br/>

---
# API Specification

API endpoint는 아래와 같습니다. 

(로컬에서 돌릴 경우)

```
http://localhost:4000/graphql
```

요청 Header는 아래와 같습니다.

```
Content-Type: application/json
```

  <br/>

# 로그인/가입

로그인/가입에 관한 API입니다.

  <br/>

## CreateUser

<br/>

User 생성

query 예시:

```graphQL
mutation CreateUserOutputDto {
  createUser(createUserInput: {email:"admin",password:"admin",
  checkPassword:"admin",firstName:"hi", lastName:"ho"}) {
    ok 
    message
    user{
      email
      id
    }
  }
}
```

response 예시:

```json
{
  "data": {
    "createUser": {
      "ok": true,
      "message": null,
      "user": {
        "email": "shk994",
        "id": 7
      }
    }
  }
}
```  
  <br/>

## Login

User 로그인

query 예시:

```graphQL
mutation LoginOutputDto {
  login(loginInput: {email: "shk9946",password:"admin"})
  {
    ok
    message
    accessToken
  }
}
```

response 예시:

```json
{
  "data": {
    "login": {
      "ok": true,
      "message": null,
      "accessToken":      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzaGs5OTQ2Iiwic3ViIjoxLCJpYXQiOjE3MDExNzU0ODIsImV4cCI6MTcwMTIxODY4Mn0.2TySH-D9Ro6dxeMawy8G2giuHw9VnpPiLDrN1QQENmM"
    }
  }
}
```
  <br/>

#강의 조회

## GetLecture

id에 따른 강의 불러오기

query 예시:

```GraphQL
query GetLectureOutputDto {
  getLecture(getLectureInput: {lectureId: 1}) {
    lecture {
      id
      provider
      title
      author
      skills
      lectureUpdatedAt
      level
      currentPrice
      duration
      score
      description
      thumbnailUrl
      url
    }
  }
}
```
response 예시:

```json
{
  "data": {
    "getLecture": {
      "lecture": {
        "id": 1,
        "provider": "udemy",
        "title": "노코딩, 왕초보도 만드는 무료 홈페이지",
        "author": "김지형 M.D.",
        "skills": [
          "웹 개발"
        ]
        "lectureUpdatedAt": "2023/09",
        "level": "초급",
        "currentPrice": 23000,
        "duration": "2:39",
        "score": 0,
        "description": "코딩없이, 기능제한없는 무료 홈페이지 만드는 법을 배웁니다.",
        "thumbnailUrl": "https://img-c.udemycdn.com/course/240x135/5583016_fb2f.jpg",
        "url": "https://www.udemy.com/course/nocodingwebsite/"
      }
    }
  }
}
```
  <br/>

## GetLectureList

filter에 맞는 강의 불러오기

query 예시:

```graphQL
query GetLectureListOutputDto {
  getLectureList(getLectureListInput: {
  skills: ["JavaScript"], page: 1, order:"score"}) {
    ok
    message
    totalPage
    lectures {
      id
      provider
      title
      author
      skills
      lectureUpdatedAt
      level
      currentPrice
      duration
      score
      description
      thumbnailUrl
      url
    }
  }
}
```

response 예시

```json
{
  "data": {
    "getLectureList": {
      "ok": true,
      "message": null,
      "totalPage": 20,
      "lectures": [
        {
          "id": 647,
          "provider": "inflearn",
          "title": "쌩초보도 4시간 안에 마스터하는 자바스크립트 기초",
          "author": "Code with Dan",
          "skills": [
            "JavaScript"
          ],
          "lectureUpdatedAt": "2022/10",
          "level": "입문",
          "currentPrice": 39600,
          "duration": "4:23",
          "score": 5,
          "description": "자바스크립트의 기본기를 제대로 배우길 원하는 입문자, 비전공자를 위한 강의 입니다. \r\n이 강의는 (1) 최대한 짧은 시간에  (2) 다양한 비유로 자바스크립트의 개념을 이해하는 것부터 (3) 실전 자바스크립트 코드를 작성을 통해 자바스크립트 언어에 익숙해지는 것 까지 포괄적으로 다룹니다.",
          "thumbnailUrl": "https://cdn.inflearn.com/public/courses/329714/cover/6f6caf5c-0b81-41b0-8a7a-682f32e9d5c1/329714-original.jpg",
          "url": "https://www.inflearn.com/course/쌩초보-4시간-마스터-자바스크립트-기초"
        },
        {
          "id": 652,
          "provider": "inflearn",
          "title": "웹 애니메이션의 새로운 표준, Web Animations API",
          "author": "1분코딩",
          "skills": [
            "Web Animations API"
            "JavaScript",
            "HTML/CSS",
            "인터랙티브 웹",
            "frontend"
          ],
          "lectureUpdatedAt": "2023/06",
          "level": "초급",
          "currentPrice": 66000,
          "duration": "4:58",
          "score": 5,
          "description": "라이브러리는 선택이지만, 웹 표준 기술은 필수입니다. 웹 애니메이션의 새로운 표준인 Web Animation API에 남들보다 빠르게 적응하고, 실무에도 바로 활용해보세요!",
          "thumbnailUrl": "",
          "url": "https://www.inflearn.com/course/웹-애니메이션-web-animation-api"
        },
        ..
      ]
    }
  }
}  

```

  <br/>

# Like

좋아요 기능에 따른 API 입니다.

추가 요청 헤더
```
"Authorization", "Bearer ${jwt-token}
```


<br/>

## CreateLike

`lectureId`에 해당하는 강의 좋아요 생성하기

query 예시:


```graphQL
mutation CreateLikeLectureOutputDto {
  likeLecture(CreateLikeLectureInput: {lectureId: 11}) {
    ok
    message
    likeStatus
  }
}
```

response 예시:

```json
{
  "data": {
    "likeLecture": {
      "ok": true,
      "message": null,
      "likeStatus": "like"
    }
  }
}
```
  <br/>

## GetLikedLectures

`user`가 like한 강의 불러오기

query 예시:

```graphQL
query GetLikedLectureOutputDto {
  getLikedLecture {
    ok
    message
    totalPage
    lectures {
      id
      provider
      title
      author
      skills
      lectureUpdatedAt
      level
      currentPrice
      duration
      score
      description
      thumbnailUrl
      url
    }
  }
}

```

response 예시:

```json
{
  "data": {
    "getLikedLecture": {
      "ok": true,
      "message": null,
      "totalPage": 20,
      "likedlectures": [
        {
          "id": 647,
          "provider": "inflearn",
          "title": "쌩초보도 4시간 안에 마스터하는 자바스크립트 기초",
          "author": "Code with Dan",
          "skills": [
            "JavaScript"
          ],
          "lectureUpdatedAt": "2022/10",
          "level": "입문",
          "currentPrice": 39600,
          "duration": "4:23",
          "score": 5,
          "description": "자바스크립트의 기본기를 제대로 배우길 원하는 입문자, 비전공자를 위한 강의 입니다. \r\n이 강의는 (1) 최대한 짧은 시간에  (2) 다양한 비유로 자바스크립트의 개념을 이해하는 것부터 (3) 실전 자바스크립트 코드를 작성을 통해 자바스크립트 언어에 익숙해지는 것 까지 포괄적으로 다룹니다.",
          "thumbnailUrl": "https://cdn.inflearn.com/public/courses/329714/cover/6f6caf5c-0b81-41b0-8a7a-682f32e9d5c1/329714-original.jpg",
          "url": "https://www.inflearn.com/course/쌩초보-4시간-마스터-자바스크립트-기초"
        },
        {
          "id": 652,
          "provider": "inflearn",
          "title": "웹 애니메이션의 새로운 표준, Web Animations API",
          "author": "1분코딩",
          "skills": [
            "Web Animations API"
            "JavaScript",
            "HTML/CSS",
            "인터랙티브 웹",
            "frontend"
          ],
          "lectureUpdatedAt": "2023/06",
          "level": "초급",
          "currentPrice": 66000,
          "duration": "4:58",
          "score": 5,
          "description": "라이브러리는 선택이지만, 웹 표준 기술은 필수입니다. 웹 애니메이션의 새로운 표준인 Web Animation API에 남들보다 빠르게 적응하고, 실무에도 바로 활용해보세요!",
          "thumbnailUrl": "",
          "url": "https://www.inflearn.com/course/웹-애니메이션-web-animation-api"
        },
        ..
      ]
    }
  }
}  

```

  <br/>

