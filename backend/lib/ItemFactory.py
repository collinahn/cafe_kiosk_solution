# 상품들의 인스턴스를 관리하기 위한 클래스.
# 싱글턴으로 전역에서 접근할 수 있도록 한다.

# 2021.12.02 created by 안태영


from backend.lib.GetPutFmDB import GetPutFmDB
from backend.lib.LoggerSE2 import Logger
from backend.lib.Items import Items

class ItemFactory(object):
    def __new__(cls):
        if not hasattr(cls, "_instance"):
            cls._instance = super().__new__(cls)
            cls.logger = Logger()
        return cls._instance

    def __init__(self) :
        cls = type(self)
        if not hasattr(cls, "_init"):
            cls._init = True

            self.dct_Items: dict[Items] = {}
            self.lst_Data4Json: list[dict] = []

            self.logger.INFO("ItemFactory init")

    

    #db초기화 후 실행하기 위해 lazy init을 해줌
    def lazy_init(self) -> dict[Items]:
        cls_DB: GetPutFmDB = GetPutFmDB()
        lst_Items: list = cls_DB.get_items() #DB의 Items테이블에서 정보를 받아온다
        self.dct_Items = {}

        for itemInfo in lst_Items:
            self.dct_Items[itemInfo[0]] = Items(itemInfo)

        return self.dct_Items # { "itemcode123":Items인스턴스 }

    # /start/v1에서 반환할 목록 초기화
    # lazy_init() 다음에 실행되어야 함.
    def lazy_init_item_list(self) -> bool:
        self.lst_Data4Json = []

        try:
            self.lst_Data4Json = [ {
                'itemClass':spec.category,
                'itemCode':spec.code,
                'itemName':spec.name,
                'thumbnail':spec.url,
                'itemPrice':spec.price,
                'avail':spec.avail
                } for spec in self.asset.values()
            ]
        except AttributeError as ae:
            self.logger.ERROR(ae)
            return False
        
        return True
        

    # 개별 Items인스턴스 리턴
    def get_instance(self, sItemCode: str) -> Items:
        if sItemCode in self.dct_Items:
            return self.dct_Items[sItemCode]

        return Items(('0000', '', '', 0, 0, 0, ''), bTraceCategory=False) #찾는 게 없을 땐 기본 자료형 리턴


    @property #전체 items인스턴스들 리턴(수정 불가)
    def asset(self) -> dict[Items]: 
        return self.dct_Items

    @property
    def item_list(self) -> list[dict]:
        return self.lst_Data4Json