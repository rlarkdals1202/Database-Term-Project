const $suggestionTable = document.getElementById("suggestionTable");
const $boardTitle = document.getElementById("boardTitle");
const $boardCategory = document.getElementById("boardCategory");
const $boardDate = document.getElementById("boardDate");
const $boardContent = document.getElementById("boardContent");

async function getBoard()
{
    const boards = await axios.get("http://localhost:8080/suggestion/information", {withCredentials: true});
    console.log(boards);
    const tableHeight = 20 + (boards.data.length);
    $suggestionTable.style.height = `${tableHeight}px`
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
            const boardInformation = await axios.get(`http://localhost:8080/suggestion/content?id=${$tr.firstElementChild.textContent}`, {withCredentials: true});
            $boardTitle.textContent = boardInformation.data[0].board_title;
            $boardContent.textContent = boardInformation.data[0].board_content;
            $boardDate.textContent = boardInformation.data[0].board_date.substring(0, 10);
            $boardCategory.textContent = '#' + boardInformation.data[0].board_category;
        };

        $documentFregment.appendChild($tr);
    }
    $suggestionTable.firstElementChild.appendChild($documentFregment);
}

getBoard();