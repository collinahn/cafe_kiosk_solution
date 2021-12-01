# 2021.10.20 created by taeyoung
#            react.js와 flask 연동하기:
#            1) react 프로젝트 빌드 ($ yarn build)
#            2) 생성된 frontend/build 폴더 전체를 backend/로 이동 후 폴더명 "static"으로 변경(이전 폴더는 삭제)
#            3) flask run으로 서버 실행

# 파일 실행 시 flask run --no-reload 옵션으로 실행(이중실행 방지)

# linux machine에서 gunicorn으로 배포
# gunicorn app:app -b 0.0.0.0:8000 -w 2 --timeout 10 --preload

# 파이썬 라이브러리
# flask, flask_restx, flask_jwt_extended

from flask import Flask
from flask_restx import Resource
from flask_restx import Api
from flask_jwt_extended import JWTManager
from threading import Thread

from backend.api.admin import Admin
from backend.api.auth import Auth
from backend.api.order import Order
from backend.api.staff import Staff
from backend.setup import initialize_item
from backend.setup import debug_console

app = Flask(__name__, static_url_path='')
api = Api(
    app,
    version='1.0',
    title='Distributed Kiosk Solution',
    description='',
    terms_url='/',
    contact='collinahn@hufs.ac.kr',
    license='MIT',
    validate=True # 파라미터 검증
) #api정보입력

# ./api/ 폴더 내부 파일들에 작성된 네임스페이스들을 가져온다.
api.add_namespace(Admin, '/admin')
api.add_namespace(Auth, '/auth')
api.add_namespace(Order, '/order')
api.add_namespace(Staff, '/staff')

# 내부 로직이 가동되기 전에 초기화한다
initialize_item()

Thread(target=debug_console, daemon=False).start()

# 릴리즈 될 땐 안보이는 곳에
app.config.update(
    DEBUG = True,
    JWT_SECRET_KEY = "HUFS Software Engineering 2"
)

# JWTManager 등록
jwt = JWTManager(app)


@app.route('/main')
def index():
    return app.send_static_file("index.html")



if __name__ == '__main__':

    app.run(use_reloader=False)