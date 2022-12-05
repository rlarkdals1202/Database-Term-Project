# 데이터베이스 생성
CREATE DATABASE abandoned_animal_care;

# 데이터베이스 변경
USE abandoned_animal_care;

# 보호소 테이블
CREATE TABLE shelter
(
    shelter_id VARCHAR(500) NOT NULL PRIMARY KEY,
    shelter_address VARCHAR(500),
    FOREIGN KEY(shelter_address) REFERENCES shelter_address_book(shelter_address),
    UNIQUE(shelter_address)
);

# 보호소 주소록 테이블
CREATE TABLE shelter_address_book
(
    shelter_address VARCHAR(500) NOT NULL PRIMARY KEY,
    shelter_name VARCHAR(1000)
);

# 동물 병원 테이블
CREATE TABLE animal_hospital
(
    animal_hospital_id VARCHAR(500) NOT NULL PRIMARY KEY,
    animal_hospital_address VARCHAR(500),
    FOREIGN KEY(animal_hospital_address) REFERENCES animal_hospital_address_book(animal_hospital_address),
    UNIQUE(animal_hospital_address)
);

# 동물 병원 주소록 테이블
CREATE TABLE animal_hospital_address_book
(
    animal_hospital_address VARCHAR(500) NOT NULL PRIMARY KEY,
    animal_hospital_name VARCHAR(1000),
    animal_hospital_contact VARCHAR(50),
    animal_hospital_information TEXT
);

# 협력 테이블
CREATE TABLE cooperation
(
    shelter_id VARCHAR(500),
    animal_hospital_id VARCHAR(500),
    FOREIGN KEY(shelter_id) REFERENCES shelter(shelter_id),
    FOREIGN KEY(animal_hospital_id) REFERENCES animal_hospital(animal_hospital_id)
);

# 직원 테이블
CREATE TABLE employee
(
    employee_id VARCHAR(100) NOT NULL PRIMARY KEY,
    employee_password VARCHAR(100),
    employee_gender VARCHAR(10),
    employee_birthday DATE,
    employee_phone_number VARCHAR(50),
    shelter_id VARCHAR(500) NOT NULL,
    FOREIGN KEY(shelter_id) REFERENCES shelter(shelter_id)
);

# 동물 테이블
CREATE TABLE animal
(
    animal_id VARCHAR(100) NOT NULL PRIMARY KEY,
    animal_sort VARCHAR(90),
    animal_gender VARCHAR(10),
    animal_age INTEGER,
    employee_id VARCHAR(100),
    animal_memo TEXT,
    animal_name VARCHAR (100),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE ON UPDATE CASCADE 
);

# 동물 품종 정보 테이블
CREATE TABLE animal_sort_information
(
    animal_sort VARCHAR(90),
    animal_type VARCHAR(90) DEFAULT "동물"
);

# 프로그램 개선사항 게시물 테이블
CREATE TABLE program_improvements
(
    board_id INTEGER
    board_title VARCHAR(300),
    board_category VARCHAR(100),
    board_date VARCHAR(50),
    board_content MEDIUMTEXT,
    employee_id VARCHAR(100),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE ON UPDATE CASCADE
    PRIMARY KEY(board_id, employee_id)
);

# 보호소 건의사항 게시물 테이블
CREATE TABLE shelter_suggestions
(
    board_id INTEGER
    board_title VARCHAR(300),
    board_category VARCHAR(100),
    board_date VARCHAR(50),
    board_content MEDIUMTEXT,
    employee_id VARCHAR(100),
    FOREIGN KEY(employee_id) REFERENCES employee(employee_id) ON DELETE CASCADE ON UPDATE CASCADE
    PRIMARY KEY(board_id, employee_id)
);