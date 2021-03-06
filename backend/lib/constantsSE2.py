#-*- encoding: utf-8 -*-

# 상수를 한 곳에서 관리하기 위한 파일
# 런타임에서 값은 변경하지 않고 참조만 한다. 
# 변수명은 반드시 대문자와 언더바(_)로 구성한다.
# 사용 예)
'''
import constantsSE2 as const

print(const.RANDOM_CONST)

'''

# 2021.11.09 created by 안태영

#-----------Logger--------

LOG_FOLDER_PATH = '../logSE2/'
LOG_FILE_PATH = LOG_FOLDER_PATH+'SE2.log'

MAX_BYTES = 10*1024*1024
BACKUP_CNT = 10

STACK_LV = 2
STACK_LV_OBJ = STACK_LV + 1

LV_DEBUG    = 10
LV_INFO     = 20
LV_WARNING  = 30
LV_ERROR    = 40
LV_CRITICAL = 50

#-----------Logger--------



#---------SingleOrder--------

EXPECTED_TIME_MUL = 1.2

#---------SingleOrder--------




#------------DB-------------

DB_FOLDER_PATH = './db/'
DB_FILE_PATH = DB_FOLDER_PATH+'kiosk.db'

#------------DB-------------




#---------api common--------

SUCCESS_FALSE_RESPONSE={'success':False}

#---------api common--------



#----------auth api---------

SQL_INJECTION_FILTER = """ '"`~!@#$%^&*()-+=<>,./?;:}{[]\|"""

#---------auth api---------



#---------staff api---------

ORDER_COMPLETE = 2000
ORDER_CANCEL   = 4000

#---------staff api---------