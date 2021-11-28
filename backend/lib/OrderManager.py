
# 주문서를 관리하기 위한 클래스.
# 주문서의 순서를 기억하고 지정한다.
# 주문서를 대기열에 푸시한다.
# 주문서를 취소시키거나 완료한다.
#
# 2021.11.26 created by 안태영


from datetime import datetime

from backend.lib.Items import Items4Order
from backend.lib.LoggerSE2 import Logger
from backend.lib.SingleOrder import SingleOrder
from backend.lib.UtilsSE2 import LinkedQueue
import backend.lib.UtilsSE2 as utils

class OrderManager(object):
    def __new__(cls):
        if not hasattr(cls, "_instance"):
            cls._instance = super().__new__(cls)
            cls.logger = Logger()
        return cls._instance

    def __init__(self) :
        cls = type(self)
        if not hasattr(cls, "_init"):
            cls._init = True

            self.iq_Queue: LinkedQueue = LinkedQueue()

            # 주문 번호 카운트
            self.__in_OrderCount: int = 0  
            # 주문 번호를 하루 단위로 초기화하기 위해
            self.__is_DateLastCount: str = utils.get_today_YMD()

            self.logger.INFO("OrderManager init")


    # 주문서 생성한다
    # { 주문서번호:SingleOrder인스턴스 }를 반환함.
    # SingleOrder인스턴스는 주문 및 상품의 정보를 모두 갖고 있음.
    # 이 형식대로 큐에 푸시됨(팩토리 패턴)
    def _make_order(self, tplOrder: tuple[Items4Order] = ()) -> dict:
        # 오늘 날짜인지 확인한다.(일마다 초기화)
        if self.__is_DateLastCount != utils.get_today_YMD():
            self.__in_OrderCount = 0
            self.__is_DateLastCount = utils.get_today_YMD()
        
        self.__in_OrderCount += 1
        self.__is_DateLastCount = utils.get_today_YMD()

        return { self.__in_OrderCount:SingleOrder(self.__in_OrderCount, tplOrder) }

    # 주문서 큐에 푸시하는 함수
    def push_order(self, tplOrder: tuple[Items4Order] = ()) -> None:

        self.iq_Queue.push(self._make_order(tplOrder))


    # 클라이언트 측에서 주문 취소할 시 찾아서 취소함
    # return값
    # True: 삭제 완료
    # False: 주문이 완료가 임박하여 삭제 불가 
    def cancel_order_guest(self, nOrderNo: int) -> bool:

        self.iq_Queue.cancel_order(nOrderNo)

        return True

    # 직원이 주문 취소시    
    def cancel_order_staff(self, nOrderNo: int) -> bool:

        self.iq_Queue.abandon_order(nOrderNo)
    
        return True

    # 직원이 주문 완료시
    def complete_order(self, nOrderNo: int) -> bool:

        self.iq_Queue.abandon_order(nOrderNo)
        
        return True



if __name__ == "__main__":
    from .Items import Items, Items4Order


    item001 = Items("Item001", "Strawberry", "Fruit", 1000, 100)
    item002 = Items("Item002", "Peanuts", "Nuts", 2000, 1000)
    item003 = Items("Item003", "Bannana", "Fruit", 1000, 100)
    item004 = Items("Item004", "Milk", "Drink", 1000, 1000)
    item005 = Items("Item005", "Cow", "Animal", 1000, 10000)
    item006 = Items("Item006", "Human", "Animal", 1000, 100)

    order001 = Items4Order("Item001", 1)
    order002 = Items4Order("Item002", 2)
    order003 = Items4Order("Item003", 3)
    order004 = Items4Order("Item004", 4)
    order005 = Items4Order("Item005", 5)
    order006 = Items4Order("Item006", 6)


    om = OrderManager()
    om.push_order((order001, order002, order003, order004)) # 1번 주문서
    om.push_order((order005, order006)) # 2번 주문서

    lq = LinkedQueue()
    print(lq.to_json()) #json

    print(lq.estimate()) #조리시간 조회