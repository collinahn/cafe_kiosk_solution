# cafe_kiosk_solution

### Description

### Environment

### Prerequisite

- python 3.8
- flask 2.0

### Files

- 기본 폴더 트리

```
backend/ #백엔드 api
frontend/ # create-react-app 프로젝트 파일
  ⨽ public/
  ⨽ src/
  ⨽ package.json
  ⨽ package-lock.json
```

```
react.js와 flask 연동하기:
1) react 프로젝트 빌드 ($ yarn build)
2) 생성된 frontend/build 폴더 전체를 backend/로 이동 후 폴더명 "static"으로 변경(이전 폴더는 미리 삭제)
3) flask run으로 서버 실행
```

### Usage
