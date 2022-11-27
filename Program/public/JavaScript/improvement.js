const $improvementTable = document.getElementById("improvementTable");
const $boardId = document.getElementById("boardId");
const $boardTitle = document.getElementById("boardTitle");
const $boardCategory = document.getElementById("boardCategory");
const $boardDate = document.getElementById("boardDate");
const $boardContent = document.getElementById("boardContent");
const $boardDeleteButton = document.getElementById("boardDeleteButton");
const $boardUpdateButton = document.getElementById("boardUpdateButton");

async function getBoard()
{
    const boards = await axios.get("http://localhost:8080/improvement/information", {withCredentials: true});
    const tableHeight = 20 + (boards.data.length);
    $improvementTable.style.height = `${tableHeight}px`
    const $documentFregment = document.createDocumentFragment();
    for(const board of boards.data)
    {
        const $tr = document.createElement("tr");
        const $idTd = document.createElement("td");
        $idTd.textContent = board.board_id;
        $tr.appendChild($idTd);

        const $dateTd = document.createElement("td");
        $dateTd.textContent = board.board_date.substring(0, 10);
        $tr.appendChild($dateTd);

        const $categoryTd = document.createElement("td");
        $categoryTd.textContent = board.board_category;
        $tr.appendChild($categoryTd);

        const $titleTd = document.createElement("td");
        $titleTd.textContent = board.board_title;
        $tr.appendChild($titleTd);

        $tr.onclick = async () =>
        {
            const boardInformation = await axios.get(`http://localhost:8080/improvement/content?id=${$tr.firstElementChild.textContent}`, {withCredentials: true});
            $boardId.textContent = '#' + boardInformation.data[0].board_id;
            $boardTitle.textContent = boardInformation.data[0].board_title;
            $boardContent.textContent = boardInformation.data[0].board_content;
            $boardDate.textContent = boardInformation.data[0].board_date.substring(0, 10);
            $boardCategory.textContent = '#' + boardInformation.data[0].board_category;
        };

        $documentFregment.appendChild($tr);
    }
    $improvementTable.firstElementChild.appendChild($documentFregment);
}

getBoard();

$boardDeleteButton.addEventListener("click", (event) =>
{
    if($boardContent.textContent === "")
    {
        event.preventDefault();
    }
    else
    {
        const answer = confirm("정말 게시물을 삭제하시겠습니까?");
        if(answer)
        {
            axios.delete('http://localhost:8080/improvement/delete', 
            {
                data:
                {
                    boardId: Number($boardId.textContent.substring(1)),
                },
                withCredentials: true
            }
            )
            .then(() =>
            {
                alert("게시글을 삭제하였습니다.");
                window.location.href = "http://localhost:8080/improvement";
            })
            .catch(() =>
            {
                alert("오류가 발생했습니다.");
                window.location.href = "http://localhost:8080/improvement";
            });
        }
    }
});

$boardUpdateButton.addEventListener("click", (event) =>
{
    if($boardContent.textContent === "")
    {
        event.preventDefault();
    }
    else
    {
        const boardId = $boardId.textContent.substring(1);
        window.location.href = `http://localhost:8080/improvement/update?boardId=${boardId}`;
    }
});