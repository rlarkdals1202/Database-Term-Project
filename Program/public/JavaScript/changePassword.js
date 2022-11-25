const $newPassword = document.getElementById("newPassword");
const $newPasswordCheck = document.getElementById("newPasswordCheck");
const $changeButton = document.getElementById("changeButton");

$changeButton.addEventListener("click", (event) =>
{
    const newPasswordText = $newPassword.value;
    const newPassowrdCheckText = $newPasswordCheck.value;
    if(newPasswordText !== newPassowrdCheckText)
    {
        alert("Password, Checking 부분의 비밀번호가 서로 맞는지 확인해주세요.");
        event.preventDefault();
    }
});
