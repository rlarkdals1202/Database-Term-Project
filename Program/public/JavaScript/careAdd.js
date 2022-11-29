const $animalAddButton = document.getElementById("animalAddButton");
const $animalId = document.getElementById("animalId");
const $animalSort = document.getElementById("animalSort");
const $animalName = document.getElementById("animalName");
const $animalGenderSelect = document.getElementById("animalGenderSelect");
const $animalMemo = document.getElementById("animalMemo");
const $animalAge = document.getElementById("animalAge");

$animalAddButton.addEventListener("click", async () =>
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
        const storedAnimalIds = await axios.get("http://localhost:8080/care/animalId", {withCredentials: true});
        for(const storedAnimalId of storedAnimalIds.data)
        {
            if(animalId === storedAnimalId.animal_id)
            {
                alert("동물 아이디가 중복됩니다. 다시 한 번 시도해주세요.");
                return;
            }
        }
        axios.post("http://localhost:8080/care/add/submit",
        {
            animalId: animalId,
            animalSort: animalSort,
            animalName: animalName,
            animalGender: animalGender,
            animalMemo: animalMemo,
            animalAge: animalAge,
            withCredentials: true,
        })
        .then(() =>
        {
            alert("동물을 성공적으로 추가하였습니다.");
            window.location.href = "http://localhost:8080/care";
        })
        .catch(() =>
        {
            alert("오류가 발생했습니다.");
            window.location.href = "http://localhost:8080/care";
        });
    }
});