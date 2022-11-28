/*
    회원가입 페이지는 따로 구현하지 않고,
    console로만 회원가입을 할 수 있도록 함.
    (보호소 직원 관리자가 회원가입 해준다.)
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

async function main()
{
    try
    {
        const connection = await mysql.createConnection(connectInformation);
        while(true)
        {
            console.log("1. Insert employee INFORMATION('Sign UP')");
            console.log("2. EXIT");
            process.stdout.write("> ");
            const answer = scanf("%d");
    
            if(answer === 1)
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

                process.stdout.write("Enter SHELTER ID : ");
                const shelterId = scanf("%s");
                
                const query = `INSERT INTO employee VALUES("${employeeId}", "${hashedPassword}", "${employeeGender}", "${employeeBirthday}", "${employeePhoneNumber}", "${shelterId}")`;
                try
                {
                    const [result, fields] = await connection.query(query);
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
            else if(answer === 2)
            {
                console.log("Bye.\n");
                connection.end();
                break;
            }
            else
            {
                console.warn("1부터 2사이의 숫자만 입력해주세요.\n");
            }
        }
    }
    catch(error)
    {
        console.error(error+"\n");
    }
}

main().catch(console.error);