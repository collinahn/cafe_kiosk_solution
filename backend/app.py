# 2021.10.20 created by taeyoung
#            react.js와 flask 연동하기:
#            1) react 프로젝트 빌드 ($ yarn build)
#            2) 생성된 frontend/build 폴더 전체를 backend/로 이동 후 폴더명 "static"으로 변경(이전 폴더는 삭제)
#            3) flask run으로 서버 실행

# linux machine에서 gunicorn으로 배포
# gunicorn app:app -b 0.0.0.0:8000 -w 2 --timeout 10 --preload

from flask import Flask
from flask import request
from flask import make_response
from flask import jsonify
from flask_restx import Resource
from flask_restx import Api
from .api.admin import Admin
from .api.auth import Auth
from .api.order import Order
from .api.staff import Staff
from .lib.UtilsSE2 import LinkedQueue


app = Flask(__name__, static_url_path='')
lq = LinkedQueue()
lq.push({"dump":True})
lq.push({"dump2":True})
print(lq.to_string())

api = Api(
    app,
    version='1.0',
    title='Distributed Kiosk Solution',
    description='',
    terms_url='/',
    contact='collinahn@hufs.ac.kr',
    license='MIT'
)

api.add_namespace(Admin, '/admin')
api.add_namespace(Auth, '/auth')
api.add_namespace(Order, '/order')
api.add_namespace(Staff, '/staff')


@app.route('/start')
def index():
    return app.send_static_file("index.html")

#통신 테스트
@app.route('/test', methods=['GET'])
def test():
    if request.method == 'GET':
        print('test-GET')

    return make_response(jsonify({'status': True}), 200)

