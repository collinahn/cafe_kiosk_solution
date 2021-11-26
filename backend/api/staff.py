from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import Namespace
from flask_restx import Resource
from ..lib.UtilsSE2 import LinkedQueue


Staff = Namespace('Staff')

@Staff.route('')
class StaffTest(Resource):
    def get(self):
        lq = LinkedQueue()

        return jsonify({
            'staff-ret':lq.to_string()
        })
