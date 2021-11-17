# 파이썬 (flask) 코딩 표준

* 들여쓰기
> 탭 1번(스페이스 4개)

* 공백
> 대괄호([])와 소괄호(()) 안, 쉼표(,), 쌍점(:), 쌍반점(;) 앞의 불필요한 공백을 피한다.

* 주석
> 코드와 모순되는 주석은 즉시 삭제하거나 수정한다.
> 불필요한 주석은 달지 않는다.
> 함수/메소드의 반환값이 복잡할 경우 주석으로 예시를 들어 놓는다. 

* 모듈 import
> 한 줄에 하나의 모듈 import(변경 추적 도구가 행 기반)
> from ~ import * 금지(네임스페이스 최소화)
```
import os, time    # 사용안함
from time import * # 사용안함
import os
import time
from time import sleep 
```

* 클래스 이름 규칙
> 카멜케이스, 첫 문자는 반드시 대문자
```
class Items(): ..
class LinkedQueue(): ..
```

* 함수/메소드 이름 규칙
> 소문자 사용, 두 단어 이상일 경우 언더바(_)로 구분.
> 타입힌트를 적극적으로 사용한다.
```
def insert_transaction() -> int: ..
```

* 변수명 규칙
> 맨 처음엔 3글자 이내로 타입을 명시한다.
> 첫 문자(타입)는 반드시 소문자, 이후 단어간 구분은 각 단어의 첫 문자를 대문자로 표기한다.
> protected 속성 변수는 언더바 한개를(_), private 속성 변수는 언더바 두개(__)를 변수명 앞에 표기한다.
```
n_TotalNumberOfStudent: int = 10 # int형은 n을 붙인다
s_Msg4Guest: str = "Food is Served" # str형은 s를 붙인다
set_Temp: set = () # set형은 set
lst_Temp: list = [] # list형은 lst
dct_OrderList: dict = {} # dict형은 dct
lq_CustomerQueue: LinkedQueue = LinkedQueue() #복잡한 자료형은 축약하여 명시한다
```

> 클래스 멤버(전역) 변수인 경우, 맨앞에 m을 덧붙임
> 인스턴스 변수인 경우, 맨앞에 i를 덧붙임
```
class AClass(object):
    mn_Count: int = 0
    mdct_MstObject: dict = {}

    def __init__():
        __is_Name: string = ""
        __iset_Properties = ()
```

> 함수 파라미터의 경우 변수명과 타입을 구분하는 언더바를 넣지 않는다. 
```
def get_sum(nTarget: int, lstTotalInput: lst):
    for input in lstTotalInput:
        nTarget += input
```

* 상수 이름 규칙
> 언더바와 대문자로 구성한다.
> constantsSE2.py 파일에서 관리.


* 변수 선언 규칙
> 한 줄에 하나의 변수 선언, 타입 힌트 사용
```
nNumber: int = 0
sStr: str = "Hello World"
conn: Connection = None
```

* Programming Recommendations
> None과의 비교는 is 또는 is not만 사용.
> 예외를 Exception으로 잡지 말고 구체적인 예외를 명시.
> try 블록의 코드는 필요한 것만 최소한으로 작성.
> 객체의 타입을 비교할 때는 isinstance() 사용.
> 불리안 타입 변수를 조건문에서 '==' 연산자를 통해 비교 금지.
