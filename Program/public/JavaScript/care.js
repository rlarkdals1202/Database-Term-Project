const $animalList = document.getElementById("animalList");
const $animalSortText = document.getElementById("animalSortText");
const $animalTypeText = document.getElementById("animalTypeText");
const $animalNameText = document.getElementById("animalNameText");
const $animalMemoText = document.getElementById("animalMemoText");
const $animalAgeText = document.getElementById("animalAgeText");
const $animalGenderText = document.getElementById("animalGenderText");

async function getAnimalList()
{
    const animalList = await axios.get("http://localhost:8080/care/animalList", {withCredentials:true});
    const tableHeight = 20 + (animalList.data.length * 20);
    $animalList.style.height = `${tableHeight}px`;
    const $documentFregment = document.createDocumentFragment();
    for(const animal of animalList.data)
    {
        const $tr = document.createElement("tr");
        const $idTd = document.createElement("td");
        $idTd.textContent = animal.animal_id;
        $tr.appendChild($idTd);

        const $sortTd = document.createElement("td");
        $sortTd.textContent = animal.animal_sort;
        $tr.appendChild($sortTd);

        $tr.onclick = async () =>
        {
            const animalInformation = await axios.get(`http://localhost:8080/care/animalInformation?animalId=${$tr.firstElementChild.textContent}`, {withCredentials: true});
            const animalSort = animalInformation.data[0].animal_sort;
            const animalName = animalInformation.data[0].animal_name;
            const animalMemo = animalInformation.data[0].animal_memo;
            const animalAge = animalInformation.data[0].animal_age;
            const animalGender = animalInformation.data[0].animal_gender;
            let animalType = await axios.get(`http://localhost:8080/care/animalType?animalSort=${animalSort}`);
            animalType = animalType.data[0].animal_type;

            $animalTypeText.textContent = animalType;
            $animalSortText.textContent = animalSort;
            $animalNameText.textContent = animalName;
            $animalMemoText.textContent = animalMemo;
            $animalAgeText.textContent = animalAge;
            $animalGenderText.textContent = animalGender;
        };

        $documentFregment.appendChild($tr);
    }
    $animalList.firstElementChild.appendChild($documentFregment);
}

getAnimalList();