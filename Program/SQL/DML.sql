# 품종 정보 삽입
INSERT INTO animal_sort_information VALUES("말티즈", "개");
INSERT INTO animal_sort_information VALUES("푸들", "개");
INSERT INTO animal_sort_information VALUES("치와와", "개");
INSERT INTO animal_sort_information VALUES("시츄", "개");
INSERT INTO animal_sort_information VALUES("포메라니안", "개");
INSERT INTO animal_sort_information VALUES("스피츠", "개");
INSERT INTO animal_sort_information VALUES("요크셔테리어", "개");
INSERT INTO animal_sort_information VALUES("불독", "개");
INSERT INTO animal_sort_information VALUES("비숑 프리제", "개");
INSERT INTO animal_sort_information VALUES("리트리버", "개");
INSERT INTO animal_sort_information VALUES("닥스훈트", "개");
INSERT INTO animal_sort_information VALUES("러시안 블루", "고양이");
INSERT INTO animal_sort_information VALUES("랙돌", "고양이");
INSERT INTO animal_sort_information VALUES("먼치킨", "고양이");
INSERT INTO animal_sort_information VALUES("샴", "고양이");
INSERT INTO animal_sort_information VALUES("페르시안", "고양이");

# 보호소 정보 삽입
# (주소는 의미없는 주소이다.)
INSERT INTO shelter VALUES("SEOULGWAN-1", "서울특별시 관악구 12345-1");
INSERT INTO shelter VALUES("SEOULDONG-1", "서울특별시 동작구 22339-5");
INSERT INTO shelter_address_book VALUES("서울특별시 관악구 12345-1", "관악구 유기동물 보호센터");
INSERT INTO shelter_address_book VALUES("서울특별시 동작구 22339-5", "흑석동 유기동물 보호센터");

# 동물 병원 정보 삽입
# (주소는 의미없는 주소이다.)
INSERT INTO animal_hospital VALUES("SEOULGWANHOS-1", "서울특별시 관악구 50000-1");
INSERT INTO animal_hospital VALUES("SEOULGWANHOS-2", "서울특별시 관악구 50000-2");
INSERT INTO animal_hospital_address_book VALUES("서울특별시 관악구 50000-1", "관악 동물병원", "02-888-0000", "24시간 운영하는 동물병원입니다. 최선을 다해 진료하겠습니다.");
INSERT INTO animal_hospital_address_book VALUES("서울특별시 관악구 50000-2", "행복한 동물병원", "02-888-0022", "24시간 운영하는 동물병원입니다. 최선을 다해 진료하겠습니다.");

# 다른 데이터들은 관리자 프로그램이나 웹을 통해서 삽입할 수 있다.