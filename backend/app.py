# 2021.10.20 created by taeyoung
#            react.js와 flask 연동하기:
#            1) react 프로젝트 빌드 ($ yarn build)
#            2) 생성된 frontend/build 폴더 전체를 backend/로 이동 후 폴더명 "static"으로 변경(이전 폴더는 삭제)
#            3) flask run으로 서버 실행

from flask import Flask, request, make_response, jsonify

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
  return app.send_static_file("index.html")



#통신 테스트
@app.route('/test', methods=['GET'])
def test():
  if request.method == 'GET':
    print('test-GET')

  return make_response(jsonify({'status': True}), 200)

