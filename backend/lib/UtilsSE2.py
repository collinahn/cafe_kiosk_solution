# 백엔드에서 필요한 함수 및 자료구조를 보유하는 파일

# 2021.10.28 created by 안태영: Linked List 추가, 기본 구조 완성



class Node(object):
  def __init__(self, dData: dict) -> None:
      self.data = dData
      self.nextLink = None

class LinkedQueue(object):
  __mdict_MstInstance = {}

  def __new__(cls, sName: str="defaultQueue"):
      if sName in LinkedQueue.__mdict_MstInstance:
        cls._instance = LinkedQueue.__mdict_MstInstance[sName]

      else:
        cls._instance = super().__new__(cls)
        LinkedQueue.__mdict_MstInstance[sName] = cls._instance

      return cls._instance

  def __init__(self) -> None:
    self._headPoint = None
    self._tailPoint = None

  # 연결리스트에 push
  def push(self, dData: dict) -> None:
    nd_Node = Node(dData)

    if self._headPoint is None:
      self._headPoint = nd_Node
      self._tailPoint = nd_Node
    else:
      self._tailPoint.nextLink = nd_Node
      self._tailPoint = self._tailPoint.nextLink

  # 연결리스트에서 pull
  def pull(self) -> dict:
    if self._headPoint is None:
      return {}

    dict_Data = self._headPoint.data
    self._headPoint = self._headPoint.nextLink

    if self._headPoint is None: self._tailPoint = None

    return dict_Data

  # 자료 전체를 문자열로 리턴한다.
  def to_string(self) -> str:
    p_Curs: Node = self._headPoint
    s_Data2Str: str = ""
    while p_Curs:
      s_Data2Str += str(p_Curs.data)
      if p_Curs.nextLink: s_Data2Str += ","
      p_Curs = p_Curs.nextLink

    return s_Data2Str


  # **주의: self._headPoint는 값이 변경되면 안됩니다. to_string의 경우처럼 커서에 값을 복사해서 사용하세요

  # 주문을 취소하기 전 취소할 수 있는지 확인하는 함수
  # 취소할 수 있는 상황: 주문이 들어간 순서대로 확인하였을 때 5번째 이상인 경우
  # 즉 앞부터 확인하여 4개째 찾는 주문번호가 나오지 않는다면 true를 리턴하고 그게 아니면 false를 리턴한다.
  # 주문번호는 node.data(dict형 자료)의 key값이다.
  def check_cancellable(self, nOrderNo: int) -> bool:
    c_available = False
    p_Curs: Node = self._headPoint
    count = 0
    while(p_Curs):
      print(p_Curs.data.keys())
      if nOrderNo in p_Curs.data.keys():
        break
      else:
        p_Curs = p_Curs.nextLink
        count += 1
        if count == 4:
          c_available = True
          break
    return c_available

  # 취소가능한 것이 확인된 경우 해당 노드를 찾아 분리한다.
  def detach(self, ) -> bool:
    pass

  # 고객이 취소 요청을 보낼 시 호출되는 함수
  # Params
  # nOrderNo: 서버에서 고객에게 부여한 주문 번호.
  # 취소 가능 여부를 확인하고(check_cancellable()) 취소할 수 있으면 해당 노드를 삭제(self.detach())하고 true를 리턴.
  # 취소할 수 없으면 false를 리턴한다.
  def cancel_order(self, nOrderNo: int) -> bool:
    pass



if __name__ == "__main__":
  lq = LinkedQueue()

  lq.push({1:10})
  lq.push({2:20})
  lq.push({3:30})
  lq.push({4:40})
  lq.push({5:50})
  lq.push({6:60})

  print(f"구현 이후 false가 나와야 함 = {lq.check_cancellable(4)}")
  lq.push({7:70})
  lq.push({8:80})
  lq.push({9:90})

  print(lq.to_string())

  lq.pull()
  lq.pull()

  print(f"구현 이후 true가 나와야 함 = {lq.check_cancellable(9)}")

  print(lq.to_string())

