# 첫 접속 화면 api

# 2021.11.21 created by 안태영


from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import Namespace
from flask_restx import Resource
from ..lib.UtilsSE2 import LinkedQueue

Auth = Namespace('Auth')

@Auth.route('')
class AuthTest(Resource):
    def get(self):

        return jsonify({
            'auth-ret':True
        })
