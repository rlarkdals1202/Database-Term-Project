const $animalList = document.getElementById("animalList");
const $employeeIdText = document.getElementById("employeeIdText");
const $animalTypeText = document.getElementById("animalTypeText");
const $animalSortText = document.getElementById("animalSortText");
const $animalNameText = document.getElementById("animalNameText");
const $animalMemoText = document.getElementById("animalMemoText");
const $animalAgeText = document.getElementById("animalAgeText");
const $animalGenderText = document.getElementById("animalGenderText");

async function getList()
{
    const animalIds = await axios.get("http://localhost:8080/animal/information/ids");
    const tableHeight = 40 + (animalIds.data.length * 40);
    $animalList.style.height = `${tableHeight}px`;
    const $documentFregment = document.createDocumentFragment();
    for(const animalId of animalIds.data)
    {
        const $tr = document.createElement("tr");
        const $idTd = document.createElement("td");
        $idTd.textContent = animalId.animal_id;
        $tr.appendChild($idTd);
        
        const $sortTd = document.createElement("td");
        $sortTd.textContent = animalId.animal_sort;
        $tr.appendChild($sortTd);

        $tr.onclick = async () =>
        {
            const animalInfomation = await axios.get(`http://localhost:8080/animal/information/animalData?animalId=${$tr.firstElementChild.textContent}`);
            $employeeIdText.textContent = animalInfomation.data[0].employee_id;
            $animalTypeText.textContent = animalInfomation.data[0].animal_type;
            $animalSortText.textContent = animalInfomation.data[0].animal_sort;
            $animalMemoText.textContent = animalInfomation.data[0].animal_memo;
            $animalAgeText.textContent = animalInfomation.data[0].animal_age;
            $animalGenderText.textContent = animalInfomation.data[0].animal_gender;
            $animalNameText.textContent = animalInfomation.data[0].animal_name;
        };

        $documentFregment.appendChild($tr);
    }
    $animalList.firstElementChild.appendChild($documentFregment);
}

getList();