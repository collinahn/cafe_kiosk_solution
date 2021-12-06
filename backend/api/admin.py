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
    'code':fields.String('item001'),
    'name':fields.String('an item'),
    'category':fields.String('item'),
    'price':fields.Integer(1000),
    'time':fields.Integer(10),
    'avail':fields.Boolean(True),
    'url':fields.String('./item001.jpg'),
    'init':fields.Boolean(True)
})

@Admin.route('/')
class CAdmin(Resource):

    # @jwt_required
    @Admin.expect(post_admin_body)
    @Admin.response(200, 'success')
    @Admin.response(412, 'insufficent body')
    @Admin.doc(body=post_admin_body)
    def post(self):
        dct_Input: dict = request.get_json()

        if utils.check_false_param(dct_Input, post_admin_body.keys(), sExcept='init'):
            return make_response(jsonify(const.SUCCESS_FALSE_RESPONSE), 412) # insufficient body

        if not cls_DB.add_items((
            dct_Input['code'],
            dct_Input['name'],
            dct_Input['category'],
            dct_Input['price'],
            dct_Input['time'],
            1 if dct_Input['avail'] else 0,
            dct_Input['url']
        )):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)

        if not utils.check_false_param(dct_Input, ('init',)) and dct_Input['init']:
            cls_If.lazy_init()
            cls_If.lazy_init_item_list() # 즉시 초기화

        return jsonify({
            'success':True
        })