const $updateButton = document.getElementById("updateButton");
const $title = document.getElementById("title");
const $writingArea = document.getElementById("writingArea");
const $category = document.getElementById("programImprovementSelect");
const urlSearch = new URLSearchParams(location.search);
const boardId = urlSearch.get('boardId');

async function getBoardInformation()
{
    const boardInfromation = await axios.get(`http://localhost:8080/improvement/content/?id=${boardId}`, {withCredentials: true});
    $title.value = boardInfromation.data[0].board_title;
    $writingArea.value = boardInfromation.data[0].board_content;
    $category.value = boardInfromation.data[0].board_category;
}

getBoardInformation();

$updateButton.addEventListener("click", () =>
{
    if($title.value === "" || $writingArea.value === "")
    {
        alert("모든 항목을 입력해주세요.");
    }
    else
    {
        axios.put("http://localhost:8080/improvement/update/process",
        {
            boardId: Number(boardId),
            boardTitle: $title.value,
            boardCategory: $category.value,
            boardContent: $writingArea.value,
            withCredentials: true,
        })
        .then(() =>
        {
            alert("수정이 완료되었습니다.");
            window.location.href="http://localhost:8080/improvement";
        })
        .catch(() =>
        {
            alert("오류가 발생했습니다.");
            window.location.href = "http://localhost:8080/improvement";
        })
    }
});