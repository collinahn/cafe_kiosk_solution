# 주문 정보 보내기/완료여부 받아오기/취소

# 2021.12.03 이혜원 작성

from flask import request
from flask.json import jsonify
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource

import backend.lib.UtilsSE2 as utils
import backend.lib.constantsSE2 as const
from backend.lib.LoggerSE2 import Logger
from backend.lib.Items import Items4Order
from backend.lib.UtilsSE2 import LinkedQueue
from backend.lib.OrderManager import OrderManager
from backend.lib.GetPutFmDB import GetPutFmDB

log = Logger()
Order = Namespace('Order')
cls_Om = OrderManager()
cls_Q = LinkedQueue()
cls_Db = GetPutFmDB()

post_order_body = Order.model('Resource-Order', {
    'order':fields.Raw({
        'item1':1,
        'item11':3
        })
    })

cancel_order_body = Order.model('Resource-Cancel',{
    'isCancel':fields.Boolean(True)
    })

@Order.route('/')
class COrder(Resource):
    
    @Order.doc(body=post_order_body)
    @Order.expect(post_order_body)
    def post(self):
        dct_Input: dict = request.get_json()

        # 올바르지 않은 요청일 때 필터링
        if not utils.check_params(dct_Input, post_order_body.keys()):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)
        
        # 주문을 분해해서 Items4Order객체로 만든 뒤, 그 다음에 주문을 푸시한다
        tpl_Order: tuple = tuple( Items4Order(key, value) for key, value in dct_Input['order'].items() )
        s_OrderNo: str = cls_Om.push_order(tpl_Order)

        # 주문자 정보를 입력한다.
        s_IpAddr: str = request.environ['REMOTE_ADDR'] if request.environ.get('HTTP_X_FORWARDED_FOR') is None else request.environ['HTTP_X_HTTP_X_FORWARDED_FOR']
        cls_Db.add_customer_info(s_OrderNo, sIPAdress=s_IpAddr)

        return jsonify({
            'success':True,
            'orderCode':s_OrderNo,
            'timeComplete':cls_Q.estimate()
        })

@Order.route('/<orderCode>')
class COrderCode(Resource):

    def get(self,orderCode):
        return jsonify({
            'success':True,
            'isComplete':not cls_Om.check_complete(int(orderCode))
        })
    
    @Order.doc(cnl_body=cancel_order_body)
    @Order.expect(cancel_order_body)
    def post(self,orderCode):
        dct_Input: dict = request.get_json()

        b_CnlRequest = dct_Input['isCancel']

        #주문서에 주문 번호가 없음
        if not utils.to_int(orderCode):
            return jsonify(const.SUCCESS_FALSE_RESPONSE)
        
        if b_CnlRequest:
            return jsonify({
                'isCancellable':cls_Q.check_cancellable(int(orderCode)),
                'isCancelled':cls_Om.cancel_order_guest(int(orderCode))
                })

        return jsonify(const.SUCCESS_FALSE_RESPONSE)
