# DB를 관리하고 DB에 저장된 데이터를 끌어다쓰기 위한 클래스.
# 시스템 설계 명세서 6. Data설계를 기반으로 작성됨.
# https://docs.google.com/document/d/1UsmxXIQL2K8jQTq3UMREj8FjEy_7PnZRa_Z8_B98dNE/edit?usp=sharing

# 2021.11.20 created by 이혜원
# 2021.11.27 modified by 안태영: 
#                        1) 객체 생성 시 실제 파일이 있는 지 체크, 생성자에서 테이블 생성하도록 수정
#                        2) 공통적으로 사용하는 staticmethod 추가(시간 관련)

import os
import sqlite3
from datetime import datetime
from sqlite3.dbapi2 import Connection

import backend.lib.UtilsSE2 as utils
import backend.lib.constantsSE2 as const
from backend.lib.LoggerSE2 import Logger


class GetPutFmDB(object):
    def __new__(cls):
        if not hasattr(cls, "_instance"):
            cls._instance = super().__new__(cls)
            cls.logger = Logger()

        #폴더가 없는 경우
        if os.path.exists(const.DB_FOLDER_PATH) == False:
            os.mkdir(const.DB_FOLDER_PATH)
        #파일이 없는 경우
        if os.path.exists(const.DB_FILE_PATH) == False:
            conn: Connection = None

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH)
        except sqlite3.Error as e: 
            cls.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

        return cls._instance

    def __init__(self) :
        cls = type(self)
        if not hasattr(cls, "_init"):
            conn: Connection = None
            lst_CreateQuery: list[str] = [
                "CREATE TABLE IF NOT EXISTS tStaff ( \
                    staffID TEXT PRIMARY KEY NOT NULL, \
                    staffPW TEXT NOT NULL, \
                    staffTLA TEXT NOT NULL \
                );", #Staff 로그인 테이블 생성
                "CREATE TABLE IF NOT EXISTS tAdmin ( \
                    adminID TEXT PRIMARY KEY NOT NULL, \
                    adminPW TEXT NOT NULL, \
                    adminTLA TEXT NOT NULL \
                );", #Admin 로그인 테이블 생성
                "CREATE TABLE IF NOT EXISTS tCustomer ( \
                    orderNo INT PRIMARY KEY NOT NULL, \
                    customerID TEXT NOT NULL, \
                    customerIP TEXT NOT NULL \
                );", #주문 고객 정보 테이블 생성
                "CREATE TABLE IF NOT EXISTS tMstItems ( \
                    itemCode TEXT PRIMARY KEY NOT NULL, \
                    itemName TEXT NOT NULL, \
                    category TEXT NOT NULL, \
                    itemPrice INT NOT NULL, \
                    timeEst INT NOT NULL, \
                    availability INT NOT NULL, \
                    imgSrc TEXT NOT NULL DEFAULT '/' \
                );" #상품 테이블 생성
            ]

            try:
                conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None) 
                curs: Connection = conn.cursor()

                #테이블 세팅
                for query in lst_CreateQuery:
                    curs.execute(query)

                self.logger.INFO("DB init")
                cls._init = True

            except sqlite3.Error as e: 
                self.logger.ERROR(e)
            finally:
                if conn: 
                    conn.close()

    @staticmethod
    def get_table_name_tody(sType: str='Order') -> str:
        return 'tHist' + utils.get_today_YMD() + sType  # "tHist20211127Hist"

    @staticmethod
    def get_now_time() -> str:
        return str(datetime.now()) # "2021-11-27 03:08:33,620"

    #내역을 저장하는 테이블은 일자마다 새로 생성한다
    def create_tHistOrder(self):
        conn: Connection = None
        s_TblName = self.get_table_name_tody()

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            curs = conn.cursor()
            query = f"CREATE TABLE IF NOT EXISTS {s_TblName} ( \
                        orderNo INT PRIMARY KEY NOT NULL, \
                        orderTime TEXT NOT NULL, \
                        orderDetail TEXT NOT NULL, \
                        timeEst TEXT NOT NULL, \
                        timeComplete TEXT, \
                        status TEXT NOT NULL \
                        )"
            curs.execute(query)

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

    #DB에서 상품 정보 전부를 가져온다
    #프로그램 최초 실행시 초기화를 위해 실행됨.
    def get_items(self) -> list:
        conn: Connection = None
        lst_Ret: list = []

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            curs = conn.cursor()
            query = "SELECT * FROM tMstItems;"
            curs.execute(query)
            lst_Ret = curs.fetchall()

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

        return lst_Ret # [('상품코드', '상품이름', '카테고리', 가격, 조리시간, 품절 여부, '위치'), ...]

    # admin api에서 사용
    def add_items(self, tplSpec: tuple) -> bool:
        conn: Connection = None

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            conn.row_factory = sqlite3.Row
            curs = conn.cursor()
            query = "INSERT INTO tMstItems\
                    (itemCode, itemName, category, itemPrice, timeEst, availability, imgSrc) \
                    Values(?,?,?,?,?,?,?);"
            curs.execute(query, (tplSpec))
            conn.close()

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
            if conn:
                conn.close()
            return False
        
        return True

    # 주문을 받았을 시 기록한다.
    def add_tHistOrder(self, nOrderNo: int, dctDetail: dict, nTimeEstimate: int, sStatus: str='on'):
        conn: Connection = None
        s_TblName = self.get_table_name_tody()
        s_Now = self.get_now_time()

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            conn.row_factory = sqlite3.Row
            curs = conn.cursor()
            query = f"INSERT OR IGNORE INTO {s_TblName}\
                    (orderNo, orderTime, orderDetail, timeEst, status) \
                    Values(?,?,?,?,?);"
            curs.execute(query, (nOrderNo, s_Now, str(dctDetail), nTimeEstimate, sStatus))

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

    # 주문의 상태가 변경되면 시각과 처리 결과를 기록한다.
    # 처리 결과(status)
    # on: 기본(주문이 들어온 상태)
    # cancelled: 취소됨
    # completed: 완료됨
    def add_result_tHistOrder(self, nOrderNo: int, sStatus: str):
        conn: Connection = None
        s_TblName = self.get_table_name_tody()
        s_Now = self.get_now_time()

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            conn.row_factory = sqlite3.Row
            curs = conn.cursor()
            query = f"UPDATE {s_TblName} \
                    SET `timeComplete`=?,  \
                    `status`=? \
                    WHERE `orderNo`=?;"
            curs.execute(query, (s_Now, sStatus, nOrderNo))

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

    # 아이디를 입력받아 관리자/직원임을 확인한다
    def verify_user(self, sTable: str, sID: str, sPW: str) -> bool:
        conn: Connection = None
        lst_Ret: list = []
        s_TblName = 'tAdmin' if sTable == 'admin' else 'tStaff'
        s_FldName = 'adminID' if sTable == 'admin' else 'staffID'

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            curs = conn.cursor()
            query = f"SELECT * FROM {s_TblName} \
                        WHERE `{s_FldName}`=?;"
            curs.execute(query, (sID, ))
            lst_Ret = curs.fetchall()
        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

        if not lst_Ret:
            return False
        if not lst_Ret[0]:
            return False

        return lst_Ret[0][1] == sPW

    #고객 이용 정보 내역을 저장하는 테이블은 일자마다 새로 생성한다
    def create_tCustomer(self):
        conn: Connection = None
        s_TblName = self.get_table_name_tody(sType='Customer')

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            curs = conn.cursor()
            query = f"CREATE TABLE IF NOT EXISTS {s_TblName} ( \
                        orderNo INT PRIMARY KEY NOT NULL, \
                        customerID TEXT NOT NULL, \
                        customerIP TEXT NOT NULL);"
            curs.execute(query)

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()

    # 주문 시 주문자 정보를 기록한다
    def add_orderer_info(self, nOrderNo: int, sMacAddress: str, sIPAdress: str):
        conn: Connection = None
        s_TblName = self.get_table_name_tody(sType='Customer')

        try:
            conn = sqlite3.connect(const.DB_FILE_PATH, isolation_level=None)
            conn.row_factory = sqlite3.Row
            curs = conn.cursor()
            query = f"INSERT INTO {s_TblName}\
                    (orderNo, customerID, customerIP) \
                    Values(?,?,?);"
            curs.execute(query, (nOrderNo, sMacAddress, sIPAdress))

        except sqlite3.Error as e: 
            self.logger.ERROR(e)
        finally:
            if conn: 
                conn.close()





if __name__ == '__main__':
    db = GetPutFmDB()

    print(db.get_items())

    db.create_tHistOrder()
    db.add_tHistOrder(1, {
        "items001": 1, "items003":2
    }, 15)

    db.add_result_tHistOrder(1,"completed")

    db.create_tCustomer()
    db.add_orderer_info(100,'mad12jqlkdqjlk','0.0.0.0')