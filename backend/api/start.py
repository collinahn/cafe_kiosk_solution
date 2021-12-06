# 최초 접속시 상품 리스트 조회

# 2021.12.03 created by 안태영

from flask import request
from flask.json import jsonify
from flask_restx import Api
from flask_restx import fields
from flask_restx import Namespace
from flask_restx import Resource

from backend.lib.ItemFactory import ItemFactory

Start = Namespace('Start')
cls_It = ItemFactory()

@Start.route('/v1')
class CStart(Resource):

    def get(self):
        return jsonify({
            'classification':cls_It.get_instance('default').get_categories(),
            'data': cls_It.item_list
        })


 