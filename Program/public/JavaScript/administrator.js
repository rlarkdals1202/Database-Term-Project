/*
    관리자 전용 페이지는 따로 구현하지 않고,
    console로만 관리할 수 있도록 한다.

    관리자 프로그램의 기능
    (1). 보호소 직원의 회원가입
    (2). 협력하는 동물 병원 아이디 기입
    (3). 직원 정보 보기
    (4). 보호소 건의사항, 프로그램 개선사항 보기
    (동물병원에 대한 정보는 미리 데이터베이스에 저장되어 있음.)
*/

import scanf from 'scanf';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const connectInformation =
{
    host: '192.168.162.101',
    port: '4567',
    user: 'kangminKim',
    password: '1234',
    database: 'abandoned_animal_care',
};

async function signUp(connection, shelterId)
{
    try
    {
        process.stdout.write("Enter employee ID(TEXT) : ");
        const employeeId = scanf("%s");
                
        process.stdout.write("Enter employee Password(TEXT) : ");
        const employeePassword = scanf("%s");

        // Password 암호화 (bcrypt 모듈 통해서)
        const hashedPassword = await bcrypt.hash(employeePassword, 7);
                
        process.stdout.write("Enter employee gender(male OR female) : ");
        const employeeGender = scanf("%s");
                
        process.stdout.write("Enter employee birthday(yyyy-mm-dd)  : ");
        const employeeBirthday = scanf("%s");

        process.stdout.write("Enter employee phone number  : ");
        const employeePhoneNumber = scanf("%s");
                
        const query = `INSERT INTO employee VALUES("${employeeId}", "${hashedPassword}", "${employeeGender}", "${employeeBirthday}", "${employeePhoneNumber}", "${shelterId}")`;
        try
        {
            const [result] = await connection.query(query);
            if(result)
            {
                console.log("Completed.\n");
            }
        }
        catch(error)
        {
             console.error(error+"\n");
        }
    }
    catch(error)
    {
        console.error(error+"\n");
    }
}

async function enterAnimalHospital(connection, shelterId)
{
    try
    {
        process.stdout.write("Enter animal hostpital ID that cooperates with the shelter : ");
        const animalHospitalId = scanf("%s");
        const query = `SELECT * FROM animal_hospital WHERE animal_hospital_id = "${animalHospitalId}"`;
        const [result] = await connection.query(query);
        if(result.length === 0)
        {
            console.log("There is no animal hospital id you entered. Please try again.\n");
            return;
        }
        const insertQuery = `INSERT INTO cooperation(shelter_id, animal_hospital_id) VALUES("${shelterId}", "${animalHospitalId}")`;
        const [insertResult] = await connection.query(insertQuery);
        if(insertResult)
        {
            console.log("Completed.\n");
        }
    }
    catch(error)
    {
        console.error(error + "\n");
    }
}

async function showEmployeeInformation(connection)
{
    try
    {
        const query = `SELECT employee_id, employee_gender, employee_birthday, employee_phone_number FROM employee`;
        const [result] = await connection.query(query);
        if(result)
        {
            console.log("\n=============<<<EMPLOYEE LIST>>>=============");
            for(const employee of result)
            {
                console.log(`Employee ID : ${employee.employee_id}`);
                console.log(`Employee birthday : ${employee.employee_birthday}`);
                console.log(`Employee gender : ${employee.employee_gender}`);
                console.log(`Employee phone number : ${employee.employee_phone_number}`);
                console.log("=============================================");
            }
            console.log();
        }
    }
    catch(error)
    {
        console.error(error + "\n");
    }
}

async function administrate(connection, shelterId, shelterAddress)
{
    let shelterName = null;
    try
    {
        const query = `SELECT shelter_name FROM shelter_address_book WHERE shelter_address = "${shelterAddress}"`;
        const [result] = await connection.query(query);
        if(result)
        {
            shelterName = result[0].shelter_name; 
        }
    }
    catch(error)
    {
        console.error(error + "\n");
        return;
    }
    console.log("Hello administrator.");
    console.log(`(Shelter name : ${shelterName}, Shelter address : ${shelterAddress})\n`);
    while(true)
    {
        console.log("1. Employee SignUp");
        console.log("2. Delete employee information");
        console.log("3. Update employee information");
        console.log("4. Show employee information");
        console.log("5. Enter animal hospital");
        console.log("6. Delete animal hospital");
        console.log("7. Show shelter suggestion");
        console.log("8. Show program improvements");
        console.log("9. Exit");
        process.stdout.write("> ");
        const answer = scanf("%d");
        switch(answer)
        {
            case 1:
                await signUp(connection, shelterId);
                break;

            case 2:
                break;
            
            case 3:
                break;

            case 4:
                await showEmployeeInformation(connection);
                break;

            case 5:
                await enterAnimalHospital(connection, shelterId);
                break;

            case 6:
                break;

            case 7:
                break;

            case 8:
                break;

            case 9:
                return;

            default:
                console.warn("Please enter right number.");
                break;
        }
    }
}

async function main()
{
    try
    {
        let shelterId = null;
        let shelterAddress = null;
        let isShelterIdExist = false;
        const connection = await mysql.createConnection(connectInformation);
        while(true)
        {
            process.stdout.write("\nPlease enter the SHELTER ID > ");
            shelterId = scanf("%s");
            const query = `SELECT shelter_id, shelter_address FROM shelter`;
            const [queryResult] = await connection.query(query);
            if(queryResult)
            {
                for(const shelter of queryResult)
                {
                    if(shelter.shelter_id === shelterId)
                    {
                        isShelterIdExist = true;
                        shelterAddress = shelter.shelter_address;
                    }
                }
                if(isShelterIdExist)
                {
                    break;
                }
                else
                {
                    console.log("\nThe shelter ID does not exist.");
                    process.stdout.write(`Try again?("yes" or "no") > `);
                    const answer = scanf("%s");
                    if(answer === "no")
                    {
                        connection.end();
                        console.log("Bye.");
                        break;
                    }
                    else
                    {
                        console.log("\n");
                    }
                }
            }
        }
        if(isShelterIdExist)
        {
            await administrate(connection, shelterId, shelterAddress);
            connection.end();
            console.log("Bye.");
        }
    }
    catch(error)
    {
        console.error(error);
    }
}

main().catch(console.error);