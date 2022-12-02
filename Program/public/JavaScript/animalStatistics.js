const $animalTypeTd = document.getElementById("animalTypeTd");
const $animalAgeTd = document.getElementById("animalAgeTd");
const $animalGenderTd = document.getElementById("animalGenderTd");
const context = document.getElementById("chartPicture");
context.getContext('2d');

let configObject = null;
let myChart = null;

$animalTypeTd.addEventListener("click", () =>
{
    console.log(1);
});

$animalAgeTd.addEventListener("click", async () =>
{
    if(myChart)
    {
        myChart.destroy();
    }
    const animalAgeInformation = await axios.get("http://localhost:8080/animal/statistics/animalAge", {withCredentials: true});
    configObject =
    {
        type: 'bar',
        data:
        {
            labels: ["0 ~ 5", "6 ~ 9", "10 ~ 14", "15 ~ 19", "19 ~"],
            datasets:
            [{
                label: 'animalAge',
                fill: false,
                data: 
                [
                    animalAgeInformation.data.x1,
                    animalAgeInformation.data.x2,
                    animalAgeInformation.data.x3,
                    animalAgeInformation.data.x4,
                    animalAgeInformation.data.x5,
                ],
                backgroundColor: 
                [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor:
                [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderWidth: 4,
            }],
        },
        options:
        {
            maintainAspectRatio: false,
            scales:
            {
                yAxes: 
                [{
                    ticks: 
                    {
                        beginAtZero: true,
                        fixedStepSize: 1,
                    }
                 }]
            }
        }
    }
    myChart = new Chart(context, configObject);
});

$animalGenderTd.addEventListener("click", async () =>
{
    if(myChart)
    {
        myChart.destroy();
    }
    const animalGenderInformation = await axios.get("http://localhost:8080/animal/statistics/animalGender", {withCredentials: true});
    configObject =
    {
        type: 'doughnut',
        data:
        {
            labels: ['Male', 'Female'],
            datasets: [
                {
                    label: 'Animal Gender',
                    data: [animalGenderInformation.data.male, animalGenderInformation.data.female],
                    backgroundColor: ['rgb(54, 162, 255)', 'rgb(255, 99, 132)'],
                    hoverOffset: 4,
                }
            ]
        },
        options:
        {
            maintainAspectRatio: false,
        }
    };
    myChart = new Chart(context, configObject);
});

//context.getContext('2d');
// const myChart = new Chart(context, configObject);
// const myChart = new Chart(context, {
//     type: 'bar', // 차트의 형태
//     data: { // 차트에 들어갈 데이터
//         labels: [
//             //x 축
//             '1','2','3','4','5','6','7'
//         ],
//         datasets: [
//             { //데이터
//                 label: 'test1', //차트 제목
//                 fill: false, // line 형태일 때, 선 안쪽을 채우는지 안채우는지
//                 data: [
//                     21,19,25,20,23,26,25 //x축 label에 대응되는 데이터 값
//                 ],
//                 backgroundColor: [
//                     //색상
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     //경계선 색상
//                     'rgba(255, 99, 132, 1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1 //경계선 굵기
//             }/* ,
//             {
//                 label: 'test2',
//                 fill: false,
//                 data: [
//                     8, 34, 12, 24
//                 ],
//                 backgroundColor: 'rgb(157, 109, 12)',
//                 borderColor: 'rgb(157, 109, 12)'
//             } */
//         ]
//     },
//     options: 
//     {
//         scales: 
//         {
//             yAxes: [
//                 {
//                     ticks: {
//                         beginAtZero: true
//                     }
//                 }
//             ]
//         },
//         maintainAspectRatio: false,
//     }
// });