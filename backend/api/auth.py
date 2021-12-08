# 첫 접속 화면 api

# 2021.11.21 created by 안태영


from flask import request
from flask.json import jsonify
from flask.helpers import make_response
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended import create_access_token
from flask_jwt_extended.view_decorators import jwt_required

import backend.lib.constantsSE2 as const
import backend.lib.UtilsSE2 as utils
from backend.lib.LoggerSE2 import Logger
from backend.lib.GetPutFmDB import GetPutFmDB

log = Logger()
Auth = Namespace('Auth')
cls_DB = GetPutFmDB()

post_auth_body = Auth.model('Resource-Auth', {
    'id':fields.String('staff'), 
    'pw':fields.String('a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'), 
    'actor':fields.String('staff')
})

@Auth.route('/')
class CAuth(Resource):

    @Auth.doc(body=post_auth_body)
    @Auth.expect(post_auth_body) # 파라미터 검증까지
    def post(self):
        dct_Input: dict = request.get_json()

        # 잘못된 값이 오면 abort
        if not utils.check_params(dct_Input, post_auth_body.keys()):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)
            
        if any(c in dct_Input['id'] for c in const.SQL_INJECTION_FILTER): #추가 유효성 검사
            log.INFO('aborting due to forbidden letters')
            return make_response(jsonify(const.SUCCESS_FALSE_RESPONSE), 400)

        # 인증 성공!
        if cls_DB.verify_user(dct_Input['actor'], dct_Input['id'], dct_Input['pw']):
            # 인증 시각 기록
            cls_DB.update_last_access( dct_Input['id'], bIsAdmin=(dct_Input['actor']=='admin') )
            log.INFO('login success')

            return jsonify({
                'success':True,
                'jwt_token':create_access_token(identity=dct_Input['id'], expires_delta=False)
            })

        log.INFO('login fail')

        return make_response(jsonify(const.SUCCESS_FALSE_RESPONSE), 400)


# thunder-client로 확인 완료
@Auth.route('/test')
class CAuthTest(Resource):
    @jwt_required()
    def get(self):
        return jsonify({
            'success':True
        })
      