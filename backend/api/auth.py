# 첫 접속 화면 api

# 2021.11.21 created by 안태영


from flask import request
from flask.json import jsonify
from flask_jwt_extended.view_decorators import jwt_required
from flask_restx import Api
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended import create_access_token

from backend.lib.GetPutFmDB import GetPutFmDB

Auth = Namespace('Auth')
db = GetPutFmDB()

@Auth.route('/')
class CAuth(Resource):
    dct_Fail: dict = {'success':False}

    def post(self):
        dct_Input: dict = request.get_json()
        
        if len(dct_Input) != 3:
            return jsonify(self.dct_Fail)

        # 인증 성공!
        if db.verify_user(dct_Input['actor'], dct_Input['id'], dct_Input['pw']):
            return jsonify({
                'success':True,
                'jwt_token':create_access_token(identity=dct_Input['id'], expires_delta=False)
            })

        return jsonify(self.dct_Fail)

# thunder-client로 확인 완료
@Auth.route('/test')
class CAuthTest(Resource):
    @jwt_required()
    def get(self):
        return jsonify({
            'success':"True"
        })