# 첫 접속 화면 api

# 2021.11.21 created by 안태영


from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended import create_access_token
from flask_jwt_extended.view_decorators import jwt_required

import backend.lib.constantsSE2 as const
from backend.lib.GetPutFmDB import GetPutFmDB

Auth = Namespace('Auth')
cls_DB = GetPutFmDB()

post_body_fields = Auth.model('Resource', {
    'id':fields.String('id'), 
    'pw':fields.String('hashed pw'), 
    'actor':fields.String('staff/admin')
})

@Auth.route('/')
class CAuth(Resource):

    @Auth.doc(body=post_body_fields)
    @Auth.expect(post_body_fields) # 파라미터 검증까지
    def post(self):
        dct_Input: dict = request.get_json()

        if any(c in dct_Input['id'] for c in const.SQL_INJECTION_FILTER): #추가 유효성 검사
            return jsonify(const.SUCCESS_FALSE_RESPONSE)

        # 인증 성공!
        if cls_DB.verify_user(dct_Input['actor'], dct_Input['id'], dct_Input['pw']):
            return jsonify({
                'success':True,
                'jwt_token':create_access_token(identity=dct_Input['id'], expires_delta=False)
            })

        return jsonify(const.SUCCESS_FALSE_RESPONSE)


# thunder-client로 확인 완료
@Auth.route('/test')
class CAuthTest(Resource):
    @jwt_required()
    def get(self):
        return jsonify({
            'success':True
        })