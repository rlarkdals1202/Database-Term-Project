const $animalTypeTd = document.getElementById("animalTypeTd");
const $animalAgeTd = document.getElementById("animalAgeTd");
const $animalGenderTd = document.getElementById("animalGenderTd");
const $animalDogSortTd = document.getElementById("animalDogSortTd");
const $animalCatSortTd = document.getElementById("animalCatSortTd");
const context = document.getElementById("chartPicture");
context.getContext('2d');

let configObject = null;
let myChart = null;

$animalTypeTd.addEventListener("click", async () =>
{
    if(myChart)
    {
        myChart.destroy();
    }
    const animalTypeInformation = await axios.get("http://localhost:8080/animal/statistics/typeInformation");
    const animalType = [];
    const numberOfAnimalType = [];
    const rgbArray = [];
    for(const information of animalTypeInformation.data)
    {
        animalType.push(information.type);
        numberOfAnimalType.push(information.number);
        rgbArray.push(`rgb(${Math.trunc(Math.random() * 256)}, ${Math.trunc(Math.random() * 256)}, ${Math.trunc(Math.random() * 256)})`);
    }
    configObject =
    {
        type: 'pie',
        data:
        {
            labels: animalType,
            datasets:
            [
                {
                    label: "Animal Type",
                    data: numberOfAnimalType,
                    backgroundColor: rgbArray,
                }
            ],
        },
        options:
        {
            maintainAspectRatio: false,
        }
    }
    myChart = new Chart(context, configObject);
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
                label: 'Animal Age',
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
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 206, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
            }],
        },
        options:
        {
            maintainAspectRatio: false,
            scales:
            {
                y:
                {
                    ticks:
                    {
                        precision: 0,
                    },
                }
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

$animalDogSortTd.addEventListener("click", async () =>
{
    if(myChart)
    {
        myChart.destroy();
    }
    const dogSortInformation = await axios.get("http://localhost:8080/animal/statistics/dogSort");
    const dogSort = [];
    const numberOfSort = [];
    const rgbArray = [];
    const rgbBorderArray = [];
    for(const information of dogSortInformation.data)
    {
        dogSort.push(information.sort);
        numberOfSort.push(information.number);
        const red = Math.trunc(Math.random() * 256);
        const green = Math.trunc(Math.random() * 256);
        const blue = Math.trunc(Math.random() * 256);
        rgbArray.push(`rgba(${red}, ${green}, ${blue}, 0.2)`);
        rgbBorderArray.push(`rgb(${red}, ${green}, ${blue})`);
    }
    configObject =
    {
        type: 'bar',
        data:
        {
            labels: dogSort,
            datasets:
            [
                {
                    axis: 'y',
                    label: 'Dog Sort',
                    data:  numberOfSort,
                    fill: false,
                    backgroundColor: rgbArray,
                    borderColor: rgbBorderArray,
                    borderWidth: 1,
                }
            ],
        },
        options:
        {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales:
            {
                x:
                {
                    ticks:
                    {
                        precision: 0,
                    },
                }
            }
        }
    };
    myChart = new Chart(context, configObject);
});

$animalCatSortTd.addEventListener("click", async () =>
{
    if(myChart)
    {
        myChart.destroy();
    }
    const catSortInformation = await axios.get("http://localhost:8080/animal/statistics/catSort");
    const catSort = [];
    const numberOfSort = [];
    const rgbArray = [];
    const rgbBorderArray = [];
    for(const information of catSortInformation.data)
    {
        catSort.push(information.sort);
        numberOfSort.push(information.number);
        const red = Math.trunc(Math.random() * 256);
        const green = Math.trunc(Math.random() * 256);
        const blue = Math.trunc(Math.random() * 256);
        rgbArray.push(`rgba(${red}, ${green}, ${blue}, 0.2)`);
        rgbBorderArray.push(`rgb(${red}, ${green}, ${blue})`);
    }
    configObject =
    {
        type: 'bar',
        data:
        {
            labels: catSort,
            datasets:
            [
                {
                    axis: 'y',
                    label: 'Cat Sort',
                    data:  numberOfSort,
                    fill: false,
                    backgroundColor: rgbArray,
                    borderColor: rgbBorderArray,
                    borderWidth: 1,
                }
            ],
        },
        options:
        {
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales:
            {
                x:
                {
                    ticks:
                    {
                        precision: 0,
                    },
                }
            }
        }
    };
    myChart = new Chart(context, configObject);
});