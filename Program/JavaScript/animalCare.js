const $animalInformationAddButton = document.getElementById("animalInformationAddButton");
const $animalInformationUpdateButton = document.getElementById("animalInformationUpdateButton");
const $animalInformationDeleteButton = document.getElementById("animalInformationDeleteButton");

$animalInformationAddButton.addEventListener("click", () =>
{
    window.location.href = "http://localhost:8080/animal/care/add"; 
});

$animalInformationUpdateButton.addEventListener("click", () =>
{
    window.location.href = "http://localhost:8080/animal/care/update";
});

$animalInformationDeleteButton.addEventListener("click", () =>
{
    window.location.href = "http://localhost:8080/animal/care/delete";
});

