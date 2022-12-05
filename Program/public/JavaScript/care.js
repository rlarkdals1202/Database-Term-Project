const $animalList = document.getElementById("animalList");
const $animalSortText = document.getElementById("animalSortText");
const $animalTypeText = document.getElementById("animalTypeText");
const $animalNameText = document.getElementById("animalNameText");
const $animalMemoText = document.getElementById("animalMemoText");
const $animalAgeText = document.getElementById("animalAgeText");
const $animalGenderText = document.getElementById("animalGenderText");
const $animalIdText = document.getElementById("animalIdText");
const $animalInformationDeleteButton = document.getElementById("animalInformationDeleteButton");
const $animalInformationUpdateButton = document.getElementById("animalInformationUpdateButton");

async function getAnimalList()
{
    const animalList = await axios.get("http://localhost:8080/care/animalList", {withCredentials:true});
    const tableHeight = 40 + (animalList.data.length * 40);
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
            $animalAgeText.textContent = animalAge + "살";
            $animalGenderText.textContent = animalGender;
            $animalIdText.textContent = '#' + $tr.firstElementChild.textContent;
        };

        $documentFregment.appendChild($tr);
    }
    $animalList.firstElementChild.appendChild($documentFregment);
}

getAnimalList();

$animalInformationDeleteButton.addEventListener("click", (event) =>
{
    if($animalIdText.textContent === "")
    {
        event.preventDefault();
    }
    else
    {
        const answer = confirm("정말 동물 정보를 삭제하시겠습니까?");
        if(answer)
        {
            axios.delete("http://localhost:8080/care/delete",
            {
                data:
                {
                    animalId: $animalIdText.textContent.substring(1),
                },
                withCredentials: true,
            })
            .then(() =>
            {
                alert("동물 정보를 삭제하였습니다.");
                window.location.href = "http://localhost:8080/care";
            })
            .catch(() =>
            {
                alert("오류가 발생했습니다.");
                window.location.href = "http://localhost:8080/care";
            });
        }
    }
});

$animalInformationUpdateButton.addEventListener("click", (event) =>
{
    if($animalIdText.textContent === "")
    {
        event.preventDefault();
    }
    else
    {
        const animalId = $animalIdText.textContent.substring(1);
        window.location.href = `http://localhost:8080/care/update?animalId=${animalId}`;
    }
});