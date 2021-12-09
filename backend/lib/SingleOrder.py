# 주문서 정보를 담고 있는 클래스.
# 주문서는 복수의 "상품과 상품의 수량"으로 구성된다.
# 주문서의 시간을 계산한다(가장 긴 상품의 준비시간 * 1.2).
#
# 주의: 본 클래스의 인스턴스는 주문을 푸시하는 과정에서 자동으로 생성되므로,
#       OrderManager 클래스 외의 코드를 작성하는 과정에서 추가로 인스턴스를 생성하지 않는다
#
# 2021.11.26 created by 안태영
#


import backend.lib.constantsSE2 as const
import backend.lib.UtilsSE2 as utils
from backend.lib.Items import Items4Order
from backend.lib.LoggerSE2 import Logger


class SingleOrder(object):

    def __init__(self, nOrderSeq: int, tplOrder: tuple[Items4Order]):
        self.logger = Logger()

        self.__n_OrderSeq: int = nOrderSeq
        self.tpl_OrderList: tuple = tplOrder
        self.__s_OrderTime: str = utils.get_time_HMS()

        self._in_Time = self._time
        self.logger.INFO(f"SingleOrder {nOrderSeq} init, {self.time=}")

    @property
    def order(self) -> int:
        return self.__n_OrderSeq

    @property
    def order_to_string(self) -> str:
        return str(self.order).zfill(4) #0001

    @property
    def _time(self) -> int:
        n_largest: int = 0
        if self.tpl_OrderList:
            for target in self.tpl_OrderList:
                if target.item.time > n_largest:
                    n_largest = target.item.time

        return int(n_largest*const.EXPECTED_TIME_MUL)

    @property
    def time(self) -> int:
        return self._in_Time #미리 계산됨

    @property 
    def details(self) -> dict:
        dct_Ret: dict = {}
        if self.tpl_OrderList:
            for target in self.tpl_OrderList:
                dct_Ret[target.item.code]=target.quantity
        return dct_Ret # DB

    @property 
    def details_json(self) -> dict:
        dct_Ret: dict = {}
        if self.tpl_OrderList:
            for target in self.tpl_OrderList:
                dct_Ret[target.item.name]=target.quantity
        return dct_Ret # json { "item01":1, "item02":3, ... }

    @property
    def simplify(self) -> dict:
        return {
            "orderCode":self.order_to_string,
            "orderDetails":self.details_json,
            "time":self.__s_OrderTime,
        } # json 만들 때 사용함


if __name__ == "__main__":
    from .Items import Items, Items4Order

    item001 = Items(("Item001", "Strawberry", "Fruit", 1000, 10, 1, "/"))
    item002 = Items(("Item002", "Peanuts", "Nuts", 2000, 10, 1, "/"))
    item003 = Items(("Item003", "Bannana", "Fruit", 1000, 10, 1, "/"))
    item004 = Items(("Item004", "Milk", "Drink", 1000, 10, 1, "/"))
    item005 = Items(("Item005", "Cow", "Animal", 1000, 10, 1, "/"))
    item006 = Items(("Item006", "Human", "Animal", 1000, 10, 1, "/"))

    order001 = Items4Order("Item001", 1)
    order002 = Items4Order("Item002", 2)
    order003 = Items4Order("Item003", 3)
    order004 = Items4Order("Item004", 4)
    order005 = Items4Order("Item005", 5)
    order006 = Items4Order("Item006", 6)

    so1 = SingleOrder(101, (order001, ))
    so2 = SingleOrder(102, (order002, order003, order004))
    so3 = SingleOrder(103, (order005, order006))

    print(f"{so1.order=}")
    print(f"{so2.order=}")
    print(f"{so3.order=}")
    print(f"{so1.order_to_string=}")
    print(f"{so2.order_to_string=}")
    print(f"{so3.order_to_string=}")
    print(f"{so1.simplify=}")
    print(f"{so2.simplify=}")
    print(f"{so3.simplify=}")
