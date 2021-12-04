# 주문 정보 보내기/완료여부 받아오기/취소

# 2021.12.03 이혜원 작성

from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource

import backend.lib.UtilsSE2 as utils
import backend.lib.constantsSE2 as const
from backend.lib.OrderManager import OrderManager
from backend.lib.GetPutFmDB import GetPutFmDB

Order = Namespace('Order')
cls_Om = OrderManager()
db = GetPutFmDB()

post_order_body = Order.model('order',{
    'itemCode':fields.String('itemCode'),
    'quantity':fields.Integer(100)
})

cancel_order_body = Order.model('Resource-Cancel',{'isCancel':fields.Boolean(True)})

@Order.route('/')
class COrder(Resource):
    def post(self):
        dct_Input: dict = request.get_json()
        cls_Om.push_order(dct_Input['order'])
        return jsonify({'success':True,
                        'orderCode':'001',
                        'timeComplete':utils.estimate()
                        })
    
@Order.route('/<orderCode>')
class COrderCode(Resource):
    
    @Order.response(100, 'Success')
    @Order.response(150, 'isComplete')
    def get(self,orderCode):
        return jsonify({
            'success':True,
            'isComplete':cls_Om.complete_order(int(orderCode))
        })
    
    @Order.doc(cnl_body=cancel_order_body)
    @Order.expect(cancel_order_body)
    def post(self,orderCode):
        dct_Input: dict = request.get_json()

        b_CnlRequest = dct_Input['isCancel']
        
        if b_CnlRequest:
            return jsonify({
                'isCancellable':utils._check_cancellable(int(orderCode)),
                'isCancelled':cls_Om.cancel_order_guest(int(orderCode))
                })

        return jsonify(const.SUCCESS_FALSE_RESPONSE)
