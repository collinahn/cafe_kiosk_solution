# 직원 큐 조회/완료&취소요청

# 2021.12.02 created by 안태영

from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource
from flask_jwt_extended.view_decorators import jwt_required

import backend.lib.UtilsSE2 as utils
import backend.lib.constantsSE2 as const
from backend.lib.LoggerSE2 import Logger
from backend.lib.OrderManager import OrderManager

log = Logger()
Staff = Namespace('Staff')
cls_Om = OrderManager()

post_staff_body = Staff.model('Resource-Staff', {
    'orderCode':fields.String('0001'),
    'status':fields.Integer(2000)
})

@Staff.route('/')
class CStaff(Resource):

    # @jwt_required()
    @Staff.response(200, 'Success')
    @Staff.response(204, 'Empty Queue')
    def get(self):
        return jsonify({
            'success':True,
            'queue':cls_Om.queue.to_json()
        })

    # @jwt_required()
    @Staff.doc(body=post_staff_body)
    @Staff.expect(post_staff_body)
    def post(self):
        dct_Input: dict = request.get_json()

        # 잘못된 값이 오면 abort
        if not utils.check_params(dct_Input, post_staff_body.keys()):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)

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

        
                
