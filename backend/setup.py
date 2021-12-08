import ast

from backend.lib.GetPutFmDB import GetPutFmDB
from backend.lib.ItemFactory import ItemFactory
from backend.lib.Items import Items, Items4Order
from backend.lib.OrderManager import OrderManager
from backend.lib.GetPutFmDB import GetPutFmDB
from backend.lib.UtilsSE2 import LinkedQueue
from backend.lib.LoggerSE2 import Logger


# db에서 상품 정보를 읽어 Items클래스로 찍어내 인스턴스를 생성한다.
# 2021.12.02 -> itemFactory 클래스로 이전, 사용안함
def initialize_item() -> dict:
    cls_DB: GetPutFmDB = GetPutFmDB()
    lst_Items: list = cls_DB.get_items() #DB의 Items테이블에서 정보를 받아온다
    return {
        itemInfo[0]:Items(itemInfo) 
        for itemInfo in lst_Items
    }

# 서버 가동 전 필요한 사항을 초기화한다.
def initialize_distributed_kiosk_system() -> bool:
    cls_Db = GetPutFmDB()
    cls_It = ItemFactory()
    cls_Om = OrderManager()
    cls_It.lazy_init()
    cls_It.lazy_init_item_list()

    lst_Ret = cls_Db.check_db_unhandled_order()
    if lst_Ret:
        for record in lst_Ret:
            n_OrderNo: int = record[0]
            dct_Detail: dict = ast.literal_eval(record[2]) # str -> dict
            tpl_OrderList: tuple = tuple(
                Items4Order(key, item) for key, item in dct_Detail.items()
            )

            cls_Om.push_order(tpl_OrderList, nForceOrderNo=n_OrderNo)

    return True

# 디버그를 위한 함수.
# app.py에서 서브 스레드로 실행된다.
def debug_console() -> None:
    logger = Logger()
    cls_Lq = LinkedQueue()
    cls_Om = OrderManager()
    cls_If = ItemFactory()
    cls_Db = GetPutFmDB()

    while True:
        sInput = input()
        if sInput == '':
            pass

        elif sInput in ['i', 'push']:
            dct_Items = cls_If.asset # 상품들 가져온다
            logger.DEBUG("possible options: ", dct_Items.keys())
            lst_ItemID = list(map(str, input("specify your options: ").split()))
            if any(id in lst_ItemID for id in dct_Items):
                tpl_Order = tuple( Items4Order(item, 5) for item in lst_ItemID )
                s_OrderNo: str = cls_Om.push_order(tpl_Order)
                cls_Db.add_customer_info(s_OrderNo, "LOCALHOST(DEBUG_CONSOLE)")
                # logger.DEBUG(tpl_Order[0].item.name) #아이템 이름
                # logger.DEBUG(tpl_Order[0].quantity)  #아이템 수량
            else:
                logger.DEBUG("wrong order")

        elif sInput in ['q', 'queue', 'Q']:
            logger.DEBUG(f"{cls_Lq.to_json() = }")
            logger.DEBUG(f"{cls_Lq.to_string() = }")

        elif sInput in ['e', 'complete', 'kill']:
            logger.DEBUG(f"{cls_Lq.to_json() = }")
            sCode = input("input order code to complete = ")
            cls_Om.complete_order(int(sCode))
            logger.DEBUG(f"{cls_Lq.to_json() = }")

        elif sInput in ['c', 'cancel']:
            logger.DEBUG(f"{cls_Lq.to_json() = }")
            sCode = input("input order code to cancel = ")
            cls_Om.cancel_order_staff(int(sCode))
            logger.DEBUG(f"{cls_Lq.to_json() = }")


        elif sInput == "cancel all":
            logger.DEBUG("cancelling all orders, proceed? (Y/n)")
            sAns = input()
            if sAns in ['y', 'Y']:
                for a in cls_Lq.to_json():
                    cls_Om.cancel_order_staff(int(a['orderCode']))
            else:
                logger.DEBUG("abort")
