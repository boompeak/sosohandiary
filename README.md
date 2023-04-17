# 우리들만의 소소한 다이어리, US!

### US는 친구들과 공유해 다이어리를 꾸밀 수 있는 웹 다이어리 꾸미기 서비스입니다.
---

## 📌 About Project

- Deploy 👉 [[__바로가기__]](https://us-diary.vercel.app/)
- Notion 👉 [[__바로가기__]](https://warp-subway-4cf.notion.site/US-266235af9f03470caa85e5d05073a795)

---

## 📌 기능
### 로그인
### 회원가입
### 카카오 로그인
### 다이어리
- 다이어리(전체 / 공유) 만들기
- 다이어리 표지 수정 / 삭제
- 다이어리 속지 추가
- 다이어리(전체 / 공유) 속지 꾸미기
- 다이어리 속지 수정 / 삭제
- 댓글 추가 / 수정 / 삭제
- 좋아요 추가 ↔️ 취소
- 미리 만들어진 다이어리(친구 공유)에 친구 초대하기

### 알림 
- 다이어리 초대 알림
- 댓글 알림
- 친구 추가 알림

### 친구
- 친구 추가 / 삭제

### 마이페이지
- 프로필 수정
- 회원 탈퇴

---

<div align=center><h1>📚 STACKS</h1></div>

<div align=center> 
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"> 
<img src="https://img.shields.io/badge/reactQuery-FF4154?style=for-the-badge&logo=reactQuery&logoColor=white">
<img src="https://img.shields.io/badge/reactRouter-CA4245?style=for-the-badge&logo=reactRouter&logoColor=white">
<img src="https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white">
</div>

---

## 📌 Trouble Shooting

| 내용                                            | 해결 방법                                                                                                                                                         |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 이미지 업로드 |  form data와 json 동시에 업로드할 경우, spring과의 협업에서는 json을 Blob을 통해 타입을 지정해주고 append를 하여야 한다.                                                                                                                                 |
| 무한스크롤, useQuery의 refetch, useState 동시 사용 시, 무한 루프에 빠진다                | state 변환 → 리렌더링 → 이때 다시 useQuery 호출                                                                                   |
| 네비바를 특정 라우터에만 보이도록 해야하는데, 각각 라우터 컴퍼넌트 안에서 사용하게 되면 네비바도 리렌더링이 되어 비효율적이고, click 애니메이션이 적용이 안된다.                   | router-dom의 Outlet을 도입 |
| react-draggable 라이브러리를 이용해서 swiper 버튼을 구현하려 하였으나, touch이벤트에서는 movement값이 주어지지 않음         |            start의 위치와 move의 위치값들의 차이를 구해 계산한다                                                 |
| 친구 검색 filter에서 input에 입력하는 값을 백엔드에 전달 할 때 useState를 사용하면 입력된 변경사항이 즉시 반영되지 않음. 또한 useState를 사용했을때 계속해서 리렌더링이 일어남                     | useRef는 업데이트 시 리렌더가 일어나지 않는 가변 값을 저장하는 데 사용 할 수 있음. useRef로 input값을 넘겨줌.                                 |
|      draft.js의 입력칸의 overflow가 발생하여 제한이 필요함       |    줄바꿈되는 케이스 분석 -> 1) \n 이 입력되어 줄바꿈됐을 때, 2) 줄의 길이가 최대 길이가 넘어 줄바꿈이 될 때 -> 1)의 경우는 getPlainText()의 \n 으로 split된 배열의 길이로 구함 -> 2) 배열의 요소가 한 줄의 최대길이를 나눈 몫으로 줄바꿈 횟수 구함 -> 1) + 2)의 합이 줄의 길이 -> beforeInput과 beforePaste에 최대 줄이 넘어가지 않도록 제한                            |
|    Image Shape의 구현을 위해 useImage 훅을 사용해야 하는데, Hook들은 함수형 컴포넌트 또는 커스텀 훅 안에서만 호출할 수 있기에 다수의 Image Shape들을 동적으로 적용할 수 없는 문제에 봉착함    |                 컴퍼넌트 내부에서 useImage 훅을 사용하여 Image shape에 대한 딕셔너리 자료구조를 만들고, 인덱스를 사용하여 동적으로 접근할 수 있도록 함           |
|    Image Shape의 transform 이후 바로 저장시 회전 정보만 저장이 안되는 문제       |              onTransformEnd의 onChange 속성을 추가하여 tranform 이후 회전 정보가 state에 반영되도록 함           |
|   스티커를 옮기기 위해 드래그할 때, 펜이 시작시점에 잠깐 그려지는 문제    |             모드 state를 STICKER와 DRAW를 분리하여 STICKER 모드일 때 펜 관련한 어떤 이벤트도 동작하지 않도록 함        |
|  모바일 환경에서 펜을 그리기 위해 touch를 할 때, overscroll이 되는 문제   |          touchmove 이벤트 발생 시, preventDefault 적용      |


---

## 📌 개선을 위한 고려사항

- 유저 정보 저장 : 현재는 로그인 시, Access-Token을 local Storage에 저장중. Refresh-Token으로 보안을 강화해야 하며, 저장이 필요한 다른 사항들(유저 닉네임 등)을 useRef등을 통한 앱 내의 변수로 관리되면 좋겠음.
- 사용 환경 : 현재 크롬브라우저에 최적화 됨. 사용자 경험(UX)을 최적화하기 위해서는 다양한 브라우저 및 디바이스에서도 웹 애플리케이션이 잘 동작할 수 있어야 함. 이를 위해서 크로스 브라우징(cross-browsing)을 고려해야 함.

----

## 📌 팀원 정보 및 개발 블로그 주소

| 이름 | 주특기 | 개발블로그 | 깃허브 |
| --- | --- | --- | --- |
| 황원준 |백엔드| https://velog.io/@potenter11 | https://github.com/1juuun |
| 강혜광 |백엔드| https://khgstart.tistory.com | https://github.com/kingaser |
| 함동진 |백엔드| https://eastjin.tistory.com/ | https://github.com/eastjin |
| 최승호 |프론트엔드| https://a-potato.tistory.com/ | https://github.com/boompeak |
| 곽세령 |프론트엔드| https://kuromi-dev.tistory.com/ | https://github.com/seryoungk |
| 이주애 |프론트엔드| https://www.notion.so/juae-world-8bf6f88c53544eb5a5656e2527749f35 | https://github.com/leejuae1020 |
| 한지윤 |프론트엔드| https://velog.io/@icedlatte | https://github.com/JellyKingdom |
| 김채연 |디자이너|  |
