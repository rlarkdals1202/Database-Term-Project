const $hospitalTable = document.getElementById("hospitalTable");
const $hospitalNameText = document.getElementById("hospitalNameText");
const $hospitalAddressText = document.getElementById("hospitalAddressText");
const $hospitalPhoneText = document.getElementById("hospitalPhoneText");
const $hospitalInfoText = document.getElementById("hospitalInfoText");

async function getList()
{
    const hospitalIds = await axios.get("http://localhost:8080/animal/hospital/ids", {withCredentials: true});
    const tableHeight = 20 + (hospitalIds.data.length * 20);
    $hospitalTable.style.height = `${tableHeight}px`;
    const $documentFregment = document.createDocumentFragment();
    console.log(hospitalIds.data);
    for(const hospitalId of hospitalIds.data)
    {
        const hospitalAddresses = await axios.get(`http://localhost:8080/animal/hospital/addresses?hospitalId=${hospitalId.animal_hospital_id}`);
        const hospitalName = await axios.get(`http://localhost:8080/animal/hospital/names?hospitalAddress=${hospitalAddresses.data[0].animal_hospital_address}`, {withCredentials: true});
        console.log(hospitalName.data);
        const $tr = document.createElement("tr");
        const $addressTd = document.createElement("td");
        $addressTd.textContent = hospitalAddresses.data[0].animal_hospital_address;
        $tr.appendChild($addressTd);

        const $nameTd = document.createElement("td");
        $nameTd.textContent = hospitalName.data[0].animal_hospital_name;
        $tr.appendChild($nameTd);

        $tr.onclick = async () =>
        {
            const hospitalInformation = await axios.get(`http://localhost:8080/animal/hospital/content?address=${$tr.firstElementChild.textContent}`, {withCredentials: true});
            $hospitalNameText.textContent = hospitalInformation.data[0].animal_hospital_name;
            $hospitalAddressText.textContent = hospitalInformation.data[0].animal_hospital_address;
            $hospitalPhoneText.textContent = hospitalInformation.data[0].animal_hospital_contact;
            $hospitalInfoText.textContent = hospitalInformation.data[0].animal_hospital_information;
        };

        $documentFregment.appendChild($tr);
    }
    $hospitalTable.firstElementChild.appendChild($documentFregment);
}

getList();