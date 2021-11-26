# 백엔드에서 필요한 함수 및 자료구조를 보유하는 파일

# 2021.10.28 created by 안태영: Linked List 추가, 기본 구조 완성

from .LoggerSE2 import Logger

class Node(object):
  def __init__(self, dData: dict) -> None:
      self.data = dData
      self.nextLink = None

class LinkedQueue(object):
  __mdict_MstInstance = {}

  def __new__(cls, sName: str="defaultQueue"):
    if sName in cls.__mdict_MstInstance:
      cls._instance = cls.__mdict_MstInstance[sName]

    else:
      cls._instance = super().__new__(cls)
      cls.__mdict_MstInstance[sName] = cls._instance
      cls.logger = Logger()
    
    cls.logger.INFO(cls._instance)
    return cls._instance

  def __init__(self, sName: str="defaultQueue", *args) -> None:
    cls = type(self)
    if not hasattr(cls, "_init"):
      cls._init = True

      self._headPoint = None
      self._tailPoint = None

      self.logger.INFO(f"Queue {sName} init")

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

  # 자료 전체를 문자열로 리턴한다.
  def to_json(self) -> str:
    p_Curs: Node = self._headPoint
    s_Data2Str: str = ""
    while p_Curs:
      try:
        s_NextLine = str(list(p_Curs.data.values())[0].simplify)
      except AttributeError as ae:
        self.logger.ERROR(ae)
        continue
      except IndexError as ie:
        self.logger.ERROR(ie)
        continue

      s_Data2Str += s_NextLine
      
      if p_Curs.nextLink: 
          s_Data2Str += ","
      p_Curs = p_Curs.nextLink

    return s_Data2Str
  
  # 주문서 큐에서 걸리는 시간을 모두 더해 리턴한다(총 대기시간)
  def estimate(self) -> int:
    p_Curs: Node = self._headPoint
    n_Ret: int = 0
    while p_Curs:
      try:
        n_Ret += list(p_Curs.data.values())[0].time #조리시간 조회
      except AttributeError as ae:
        self.logger.ERROR(ae)
        continue
      except IndexError as ie:
        self.logger.ERROR(ie)
        continue

      p_Curs = p_Curs.nextLink

    return n_Ret

  # **주의: self._headPoint는 값이 변경되면 안됩니다. to_string의 경우처럼 커서에 값을 복사해서 사용하세요

  # 주문을 취소하기 전 취소할 수 있는지 확인하는 함수
  # 취소할 수 있는 상황: 주문이 들어간 순서대로 확인하였을 때 5번째 이상인 경우
  # 즉 앞부터 확인하여 4개째 찾는 주문번호가 나오지 않는다면 true를 리턴하고 그게 아니면 false를 리턴한다.
  # 주문번호는 node.data(dict형 자료)의 key값이다.
  def _check_cancellable(self, nOrderNo: int) -> bool:
    b_Available: bool = False
    p_Curs: Node = self._headPoint
    n_Count: int = 0
    while p_Curs:
      if nOrderNo in p_Curs.data.keys():
        break

      p_Curs = p_Curs.nextLink
      n_Count += 1
      if n_Count == 4:
        b_Available = True
        break

    return b_Available

  # 취소가능한 것이 확인된 경우 해당 노드를 찾아 분리한다.
  def _detach(self, nOrderNo: int) -> bool:
    p_Curs: Node = self._headPoint

    while p_Curs.nextLink:
      if nOrderNo in p_Curs.nextLink.data.keys():

        try:
            p_Curs.nextLink = p_Curs.nextLink.nextLink
        except AttributeError as e:
            p_Curs.nextLink = None
        finally:
            break

      else:
        p_Curs = p_Curs.nextLink
        
    return True

  # 고객이 취소 요청을 보낼 시 호출되는 함수
  # Params
  # nOrderNo: 서버에서 고객에게 부여한 주문 번호.
  # 취소 가능 여부를 확인하고(check_cancellable()) 취소할 수 있으면 해당 노드를 삭제(self.detach())하고 true를 리턴.
  # 취소할 수 없으면 false를 리턴한다.
  def cancel_order(self, nOrderNo: int) -> bool:

    if not self._check_cancellable(nOrderNo):
      return False
      
    return self._detach(nOrderNo)

  # 직원이 완료/취소할 시 호출되는 함수
  # 고객이 호출될 때와는 다르게 취소 조건을 따지지 않는다.
  def abandon_order(self, nOrderNo: int) -> bool:
      return self._detach(nOrderNo)
 

if __name__ == "__main__":
  lq = LinkedQueue()

  lq.push({1:10})
  lq.push({2:20})
  lq.push({3:30})
  lq.push({4:40})
  lq.push({5:50})
  lq.push({6:60})

  print(f"구현 이후 false가 나와야 함 = {lq._check_cancellable(4)}")
  lq.push({7:70})
  lq.push({8:80})
  lq.push({9:90})

  print(lq.to_string())

  lq.pull()
  lq.pull()

  print(f"구현 이후 true가 나와야 함 = {lq._check_cancellable(9)}")

  print(lq.to_string())


  lq.push({11:70})
  lq.push({12:80})
  lq.push({13:90}) 
  lq.push({14:70})
  lq.push({15:80})
  lq.push({16:90})
  lq.push({17:70})
  lq.push({18:80})
  lq.push({19:90})

  lq.cancel_order(9)
  print(lq.to_string())
  lq.cancel_order(4) # 지워지면 안됨
  print(lq.to_string())
  lq.cancel_order(5) # 지워지면 안됨
  print(lq.to_string())
  lq._detach(5)
  print(lq.to_string())
  lq.cancel_order(19)
  print(lq.to_string())
  lq.cancel_order(18)
  print(lq.to_string())
  lq.cancel_order(17)
  print(lq.to_string())