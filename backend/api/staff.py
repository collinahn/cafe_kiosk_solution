from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended.view_decorators import jwt_required

import backend.lib.UtilsSE2 as utils
import backend.lib.constantsSE2 as const
from backend.lib.OrderManager import OrderManager


Staff = Namespace('Staff')
cls_Om = OrderManager()

post_body_fields = Staff.model('Resource', {
    'orderCode':fields.String('order code, 4 digits'),
    'status':fields.Integer('2000(complete)/4000(cancel)')
})

@Staff.route('/')
class CStaff(Resource):

    # @jwt_required()
    def get(self):

        return jsonify({
        })

    # @jwt_required()
    @Staff.doc(body=post_body_fields)
    @Staff.expect(post_body_fields)
    def post(self):
        dct_Input: dict = request.get_json()

        n_OrderCode = utils.to_int(dct_Input['orderCode'])
        n_RequestCode = dct_Input['status'] #2000 - 완료 4000 - 취소

        # 주문서에서 주문 찾기 실패한경우
        if not n_OrderCode:
            return jsonify(const.SUCCESS_FALSE_RESPONSE)

        # 주문 완료시
        if n_RequestCode == const.ORDER_COMPLETE:
            return jsonify({
                'success':cls_Om.complete_order(n_OrderCode)
            })

        # 주문 취소시
        elif n_RequestCode == const.ORDER_CANCEL:
            return jsonify({
                'success':cls_Om.cancel_order_staff(n_OrderCode)
            })

        return jsonify(const.SUCCESS_FALSE_RESPONSE)

        
                
