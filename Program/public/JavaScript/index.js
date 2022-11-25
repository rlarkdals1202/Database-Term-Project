const $logoutButton = document.getElementById("logoutButton");
const $passwordChangeButton = document.getElementById("passwordChangeButton");
const $employeeName = document.getElementById("employeeName");

async function getName()
{
    const employeeName = await axios.get('http://localhost:8080/index/employeeName', {withCredentials: true});
    $employeeName.textContent = String(employeeName.data);
}

getName();

$logoutButton.addEventListener("click", () =>
{
    axios.get("http://localhost:8080/login/logout", {withCredentials: true})
        .then(() =>
        {
            window.location.href="http://localhost:8080/login";
        });
});

$passwordChangeButton.addEventListener("click", () =>
{
    window.location.href = "http://localhost:8080/password";
});