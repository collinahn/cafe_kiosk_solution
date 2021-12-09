# 관리자 api

# 2021.11.21 created by 안태영

from flask import request
from flask.json import jsonify
from flask.helpers import make_response
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended.view_decorators import jwt_required

import backend.lib.constantsSE2 as const
import backend.lib.UtilsSE2 as utils
from backend.lib.LoggerSE2 import Logger
from backend.lib.GetPutFmDB import GetPutFmDB
from backend.lib.ItemFactory import ItemFactory

log = Logger()
Admin = Namespace('Admin')
cls_DB = GetPutFmDB()
cls_If = ItemFactory()


post_admin_body = Admin.model('Resource-Admin', {
    'code':fields.String('item61'),
    'name':fields.String('coffee61'),
    'category':fields.String('커피'),
    'price':fields.Integer(5000),
    'time':fields.Integer(10),
    'avail':fields.Boolean(True),
    'url':fields.String('img/default.svg'),
    'init':fields.Boolean(True)
})

@Admin.route('/')
class CAdmin(Resource):

    @jwt_required()
    @Admin.expect(post_admin_body)
    @Admin.response(200, 'success')
    @Admin.response(412, 'insufficent body')
    @Admin.doc(body=post_admin_body)
    def post(self):
        dct_Input: dict = request.get_json()
        log.CRITICAL(dct_Input)

        if not utils.check_params(dct_Input, ('data', )):
            return make_response(jsonify(const.SUCCESS_FALSE_RESPONSE), 412) # insufficient body

        if not utils.check_params(dct_Input['data'], post_admin_body.keys(), sExcept='init'):
            return make_response(jsonify(const.SUCCESS_FALSE_RESPONSE), 412) # insufficient body
        

        if not cls_DB.add_items((
            dct_Input['data']['code'],
            dct_Input['data']['name'],
            dct_Input['data']['category'],
            dct_Input['data']['price'],
            dct_Input['data']['time'],
            1 if dct_Input['data']['avail'] else 0,
            dct_Input['data']['url']
        )):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)

        if utils.check_params(dct_Input['data'], ('init',)) and dct_Input['data']['init']:
            cls_If.lazy_init()
            cls_If.lazy_init_item_list() # 즉시 초기화

        return jsonify({
            'success':True
        })