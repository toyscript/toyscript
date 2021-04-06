from io import StringIO
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser
import PyPDF2
import re
import collections
import pandas as pd
from matplotlib import pyplot as plt
import seaborn as sns
import collections

def convert_pdf_to_string(pdf_file_path):
    """
    pdf_file_path: 'dir/aaa.pdf'로 구성된 path로부터
    내부의 text 파일을 모두 읽어서 스트링을 리턴함.
    https://pdfminersix.readthedocs.io/en/latest/tutorials/composable.html
    """
    output_string = StringIO()
    with open(pdf_file_path, 'rb') as f:
        parser = PDFParser(f)
        doc = PDFDocument(parser)
        rsrcmgr = PDFResourceManager()
        device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        for page in PDFPage.create_pages(doc):
            interpreter.process_page(page)
    return output_string.getvalue()


toy_txt = convert_pdf_to_string("toystory3.pdf")
#print(toy_txt[0:100])
# print(type(convert_pdf_to_string("script-toystory3.pdf")))


##########################################################################
reader = PyPDF2.PdfFileReader(
    './toystory3.pdf')

#print(reader.documentInfo)

num_of_pages = reader.numPages
#print('Number of pages: ' + str(num_of_pages))

writer = PyPDF2.PdfFileWriter()

for page in range(0, 130):  # 토이스토리 총 페이지 수 130

    writer.addPage(reader.getPage(page))

output_filename = './table_of_contents.txt'

with open(output_filename, 'wb') as output:
    writer.write(output)

# 로컬에서 개발할 경우 import한 data_func.convert_pdf_to_string로 쓰면 됩니다.
text = convert_pdf_to_string(
    './table_of_contents.txt')

#print(text)

textLineCount = text.replace('.','')
textLineCount = text.replace('\x0c','') # 페이지 나눔 표시 제거(pdf에서 페이지가 바뀔 때 페이지 첫 문장에 \x0c가 붙는다.)
table_of_contents_raw = textLineCount.split('\n')
table_of_contents_raw = list(filter(None, table_of_contents_raw)) # 리스트 내 공백문자열 제거
# print(table_of_contents_raw[:10])
# print(len(table_of_contents_raw))

place_regex = re.compile("^\s*(INT\.|EXT\.)")
INT = 0
EXT = 0
for line in table_of_contents_raw :
    place_regex_result = place_regex.search(line)
    if place_regex_result:
        # print('Match found: ', place_regex_result.group())
        if place_regex_result.group() == "EXT." :
            EXT += 1
        elif place_regex_result.group() == "INT." :
            INT += 1
# print("실외 씬(EXT) :", EXT,", 실내 씬(INT) :", INT)

place_frequency_regex = re.compile("^\s*(INT\.|EXT\.)\s(\w*)(\W)?(\w*)?(\s)?(((\w*))?)*")
place_list = []

for line in table_of_contents_raw :
    place_frequency_regex_result = place_frequency_regex.search(line)
    if place_frequency_regex_result :
        place_list.append(place_frequency_regex_result.group())
# print(place_list)

place_list_kinds = []
for item in place_list :
    item = item[5:].replace("’S", "'S") # 대본에서 가져온 ’는 공백에 가까운 자리를 차지하여 'S 형태로 변환하였습니다.(ANDY’S 등을 ANDY'S 로)
    if item[-1] == ' ' :
        item = item[:-1] # 위의 정규표현식 결과 장소(원소)의 맨 뒤에 공백이 있는 경우가 있어 제거하였습니다.
    place_list_kinds.append(item)
# print(place_list_kinds)

place_list_kinds_set = set(place_list_kinds)
place_list_kinds_set.discard(' KEN')
place_list_kinds_set.discard('/ EXT')
# print(len(place_list_kinds_set))

try : # list는 set처럼 해당 값이 없어도 오류를 내지않고 무시하는 원소 제거 메서드가 없습니다. 그래서 try, except 문을 사용합니다.
    place_list_kinds.remove(' KEN')
    place_list_kinds.remove('/ EXT')
except :
    pass
counter_place_list_kinds = collections.Counter(place_list_kinds)
# print(counter_place_list_kinds)

dict_place_list_kinds = dict(collections.Counter(place_list_kinds))
sorted_dict_place_list_kinds = sorted(dict_place_list_kinds.items(), key=lambda x : x[1], reverse=True)
# print(sorted_dict_place_list_kinds)

# plt.figure(figsize=(20,15)) # x축(장소)가 많고 이름이 길어 작은 사이즈의 캔버스로는 글씨가 겹치는 문제가 발생합니다.
# keys = list(counter_place_list_kinds.keys()) # Counter 객체의 keys를 x축으로 설정합니다.
# values = list(counter_place_list_kinds.values()) # Counter 객체의 values를 x축으로 설정합니다.
# plt.xticks(rotation = 80 ) # 글씨가 겹치지 않도록 x축의 기울기를 설정합니다.
# sns.barplot(x=keys, y=values) # x,y축을 설정하고 barplot을 그립니다.
# # plt.show()

place_df = pd.DataFrame(sorted_dict_place_list_kinds, columns=["places", "freq"])
# print(place_df)

# plt.figure(figsize=(20,15))
# keys = place_df["places"] # 데이터 프레임(place_df)의 places column을 x축으로 설정합니다.
# values = place_df["freq"] # 데이터 프레임(place_df)의 freq column을 y축으로 설정합니다.
# plt.xticks(rotation = 80 )
# sns.barplot(x=keys, y=values)
# plt.show()

from model.models import Place
from init_app.init_app import db, create_app

app = create_app()
app.app_context().push()

# for index, row in place_df.iterrows():
#
#     place = Place(name = row['places'], freq=row['freq'])
#     db.session.add(place)
#     db.session.commit()





