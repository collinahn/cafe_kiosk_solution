from backend.lib.GetPutFmDB import GetPutFmDB
from backend.lib.Items import Items, Items4Order
from backend.lib.OrderManager import OrderManager
from backend.lib.UtilsSE2 import LinkedQueue
from backend.lib.LoggerSE2 import Logger


# db에서 상품 정보를 읽어 Items클래스로 찍어내 인스턴스를 생성한다.
def initialize_item() -> dict:
    cls_DB: GetPutFmDB = GetPutFmDB()
    lst_Items: list = cls_DB.get_items() #DB의 Items테이블에서 정보를 받아온다
    dct_Ret: dict[Items] = {}

    for itemInfo in lst_Items:
        dct_Ret[itemInfo[0]] = Items(itemInfo)

    return dct_Ret # { "itemcode123":Items인스턴스 }

# 디버그를 위한 함수.
# app.py에서 서브 스레드로 실행된다.
def debug_console() -> None:
    logger = Logger()
    lq = LinkedQueue()
    ordm = OrderManager()

    while True:
        sInput = input()
        if sInput == '':
            pass

        elif sInput == 'i' or sInput == 'push':
            dct_Items = initialize_item() # 상품들 가져온다
            logger.DEBUG("possible options: ", dct_Items.keys())
            sItemID = input("choose your option: ")
            if sItemID in dct_Items.keys():
                nNum = int(input("how many?"))
                ordm.push_order((Items4Order(sItemID, nNum), ))
            else:
                logger.DEBUG("wrong order")


        elif sInput == 'q' or sInput == 'queue' or sInput == 'Q':
            logger.DEBUG(f"{lq.to_json() = }")
            logger.DEBUG(f"{lq.to_string() = }")