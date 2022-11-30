const $animalUpdateButton = document.getElementById("animalUpdateButton");
const $animalId = document.getElementById("animalId");
const $animalSort = document.getElementById("animalSort");
const $animalName = document.getElementById("animalName");
const $animalGenderSelect = document.getElementById("animalGenderSelect");
const $animalMemo = document.getElementById("animalMemo");
const $animalAge = document.getElementById("animalAge");
const urlSearch = new URLSearchParams(location.search);
const animalId = urlSearch.get('animalId');

async function getAnimalInformation()
{
    const animalInformation = await axios.get(`http://localhost:8080/care/animalInformation?animalId=${animalId}`);
    $animalId.value = animalInformation.data[0].animal_id;
    $animalSort.value = animalInformation.data[0].animal_sort;
    $animalName.value = animalInformation.data[0].animal_name;
    $animalGenderSelect.value = animalInformation.data[0].animal_gender;
    $animalMemo.value = animalInformation.data[0].animal_memo;
    $animalAge.value = animalInformation.data[0].animal_age;
}
$animalUpdateButton.addEventListener("click", () =>
{
    const animalId = $animalId.value;
    const animalSort = $animalSort.value;
    const animalName = $animalName.value;
    const animalGender = $animalGenderSelect.value;
    const animalMemo = $animalMemo.value;
    const animalAge = $animalAge.value;
    if(animalId === "" || animalSort === "" || animalName === "" || animalMemo === "" || animalAge === "")
    {
        alert("모든 항목을 입력해주세요.");
    }
    else
    {
        axios.put("http://localhost:8080/care/update/process",
        {
            animalId,
            animalSort,
            animalName,
            animalGender,
            animalMemo,
            animalAge,
            withCredentials: true,
        })
        .then(() =>
        {
            alert("수정이 완료되었습니다.");
            window.location.href = "http://localhost:8080/care";
        })
        .catch(() =>
        {
            alert("오류가 발생했습니다.");
            window.location.href = "http://localhost:8080/care";
        });
    }
});
getAnimalInformation();