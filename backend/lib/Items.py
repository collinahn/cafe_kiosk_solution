# 상품의 정보를 담고 있는 클래스.

# 2021.11.25 created by 안태영

# Items 클래스: 상품 종류만큼의 인스턴스를 생성한다. 상품코드로 식별.
#               상품의 정보를 인스턴스 변수로 보유하고 있다(상품코드, 이름, 카테고리, 가격, 조리시간, 품절여부)
#               예) 총 종류가 50개면 50개의 인스턴스가 메모리에 로드되고, 
#                   같은 상품코드로 호출하면 이미 생성되어있는 인스턴스를 반환한다.
# 
# Items4Order 클래스: 해당하는 상품코드로 items의 인스턴스를 호출해 보유하고 
#                     추가로 수량 정보까지 보유하고 있는 클래스. 
# 
#

from backend.lib.LoggerSE2 import Logger

class Items(object):
    __mdct_MstInstance: dict[str, object] = {} # {"상품코드":해당 인스턴스}
    __mset_MstCode: set[str] = set() # 초기화 기록용
    __mset_MstCategory: set[str] = set() # 상품코드 추적

    def __new__(cls, tplItemInfo: tuple, sItemCode: str=None, *args):
        #튜플로 생성, str으로 조회
        if sItemCode and sItemCode in cls.__mdct_MstInstance: # 아이템 코드로 호출
            cls._instance = cls.__mdct_MstInstance[sItemCode]

        elif tplItemInfo and tplItemInfo[0] in cls.__mdct_MstInstance: # 튜플로 호출
            cls._instance = cls.__mdct_MstInstance[tplItemInfo[0]]

        else:
            cls._instance = super().__new__(cls)
            # 인스턴스의 중복 생성을 막는다
            cls.__mdct_MstInstance[tplItemInfo[0]] = cls._instance
            cls.logger = Logger()

            if sItemCode:
                cls.logger.CRITICAL("Wrong Class Call", sItemCode)

        cls.logger.INFO(cls._instance)
        return cls._instance

    def __init__(self, tpleItemInfo: tuple[str,str,str,int,int,int,str], *args, bTraceCategory: bool=True) -> None:
        cls = type(self)
        if tpleItemInfo[0] not in cls.__mset_MstCode:

            self._s_Code = tpleItemInfo[0]
            self._s_Name = tpleItemInfo[1]
            self._s_Category = tpleItemInfo[2]
            self._n_Price = tpleItemInfo[3]
            self._n_Time = tpleItemInfo[4]
            self._b_Avail = ( tpleItemInfo[5] == 0 )
            self._s_Url = tpleItemInfo[6]

            self.logger.INFO(f"Item {self._s_Code} init")

            cls.__mset_MstCode.add(self._s_Code)
            if bTraceCategory: # 더미 데이터 거르기 위함
                cls.__mset_MstCategory.add(self._s_Category) # 카테고리 추적

    def __del__(self):
        print(f"{self.code} collected")

    @classmethod
    def get_all(cls) -> dict:
        # 멤버 변수임을 주의
        return cls.__mdct_MstInstance

    @classmethod
    def get_categories(cls) -> set:
        # 보유중인 카테고리를 확인
        return cls.__mset_MstCategory

    @property
    def code(self) -> str:
        return self._s_Code

    @property
    def name(self) -> str:
        return self._s_Name

    @property
    def category(self) -> str:
        return self._s_Category

    @property
    def price(self) -> int:
        return self._n_Price

    @property
    def time(self) -> int:
        return self._n_Time

    @property
    def avail(self) -> bool:
        return self._b_Avail

    @property
    def url(self) -> str:
        return self._s_Url

# 수량정보는 Items4Order인스턴스 참조.
# 나머지 정보는 내부 변수인 Item 인스턴스를 참조하여 확인. 
class Items4Order(object):
    def __init__(self, sItemCode: str, \
                        nQuantity: int) -> None:
        self.logger = Logger()

        if sItemCode in Items.get_all():

            self._inst_Item = Items.get_all()[sItemCode]
            self._n_Quantity = nQuantity

            self.logger.INFO(f"New Order {sItemCode} x {nQuantity}")

        else:
            self.logger.CRITICAL("Wrong Item Code", sItemCode)

    @property
    def item(self) -> object:
        try:
            return self._inst_Item #인스턴스 반환
        except AttributeError as e:
            self.logger.CRITICAL("Items4Order init fail")
            return None

    @property
    def quantity(self) -> int:
        try:
            return self._n_Quantity
        except AttributeError as e:
            self.logger.CRITICAL("Items4Order init fail")
            return 0



class Items2Modify(object):
    def __init__(self, sItemCode: str, \
                        sPurpose: str) -> None:
        self.logger = Logger()

        if sItemCode in Items.get_all():

            self._inst_Item = Items.get_all()[sItemCode]
            self._s_Purpose = sPurpose

            self.logger.INFO(f"New Modify {sItemCode} - {sPurpose}")

        else:
            self.logger.CRITICAL("Wrong Item Code", sItemCode)

    @property
    def item(self) -> object:
        try:
            return self._inst_Item #인스턴스 반환
        except AttributeError as e:
            self.logger.CRITICAL("Items2Modify init fail")
            return None

    @property
    def purpose(self) -> int:
        try:
            return self._s_Purpose
        except AttributeError as e:
            self.logger.CRITICAL("Items2Modify init fail")
            return None


if __name__ == "__main__":
    
    item001 = Items(("Item001", "Strawberry", "Fruit", 1000, 10, 1, "/"))
    item002 = Items(("Item002", "Peanuts", "Nuts", 2000, 10, 1, "/"))
    item003 = Items(("Item003", "Bannana", "Fruit", 1000, 10, 1, "/"))
    item004 = Items(("Item004", "Milk", "Drink", 1000, 10, 1, "/"))
    item005 = Items(("Item005", "Cow", "Animal", 1000, 10, 1, "/"))
    item006 = Items(("Item006", "Human", "Animal", 1000, 10, 1, "/"))

    order001 = Items4Order("Item001", 4)
    print(order001.item.code, order001.item.name, order001.item.category, order001.quantity, order001.item.url)

    order002 = Items4Order("Item004", 5)
    print(order002.item.code, order002.item.name, order002.item.category, order002.quantity, order002.item.url)

    order003 = Items4Order("Item006", 6)
    print(order003.item.code, order003.item.name, order003.item.category, order003.quantity, order003.item.url)

    try:
        order004 = Items4Order("Item009", 7) # 실패하는 테스트케이스
        print(order004.item.code, order004.item.name, order004.item.category, order004.quantity)
    except AttributeError as e:
        print(e)