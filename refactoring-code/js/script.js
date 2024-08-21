// Fetching data
async function getUser() {
    return await fetch('https://jsonplaceholder.org/users').then(response => response.json()).catch((error) => console.error('Error fetching data', error.message))
}
// Get all value from input tag
const bSearch = document.querySelector('.btn-outline-primary');
bSearch.addEventListener('click', async function () {
    const inputValue = document.querySelector('.form-control').value.trim().toLowerCase();
    usersData = await getUser();
    // Filtering data from usersData variabel
    const filteredResult = usersData.filter(e => {
        return (e.firstname.includes(inputValue) || e.lastname.includes(inputValue))
    })
    getData(filteredResult);
})

function getData(userResult) {
    const container = document.querySelector(".row");
    container.innerHTML = userResult.length > 0 ?
        userResult.map(e => showCards(e)).join('') :
        `<p>Data Karyawan tidak ditemukan</p>`;
    applyDetailsEventListeners();
}

function showCards(e) {
    return `<div class="col my-2 text-center">
        <div class="card h-100 d-flex flex-column">
            <div class="card-body flex-grow-1">
                <h5 class="card-title">${e.firstname} ${e.lastname}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${e.company.name}</h6>
                <p class="card-text">${e.company.catchPhrase}</p>
            </div>
            <div class="card-footer mt-auto">
                <a href="#" data-employee="${e.id}" class="btn btn-primary details" data-bs-toggle="modal" data-bs-target="#detail-cards">Show Details</a>
            </div>
        </div>
    </div>`
}
// Retrieve all .details classes in every button element
function applyDetailsEventListeners() {
    const btnShow = document.querySelectorAll('.details');
    btnShow.forEach(event => {
        event.addEventListener('click', handleDetailsClick);
    })
}

function handleDetailsClick() {
    const numberId = this.getAttribute("data-employee");
    const selectedUser = usersData.find(user => user.id.toString() === numberId);
    if (selectedUser) {
        renderModalContent(selectedUser, numberId);
    }
}
// get parameter from handleDetailsClick
function renderModalContent(user, numberId) {
    const foxImageURL = `https://randomfox.ca/images/${numberId}.jpg`;
    const modalContent = `
        <div class="rnd-image text-center">
            <img src="${foxImageURL}" alt="Random Fox Image" class="rounded text-center">
        </div>
        <ul class="list-group mt-2">
            <li class="list-group-item active text-center">${user.firstname} ${user.lastname}</li>
                <li class="list-group-item">Tanggal lahir: ${user.birthDate}</li>
            <li class="list-group-item">Alamat: ${user.address.street}, ${user.address.city}, ${user.address.zipcode}</li>
            <li class="list-group-item">Perusahaan: ${user.company.name}</li>
            <li class="list-group-item">Slogan: ${user.company.catchPhrase}</li>
            <li class="list-group-item">Email: ${user.email}</li>
            <li class="list-group-item">Telepon: ${user.phone}</li>
        </ul>`;

    document.querySelector(".modal-body").innerHTML = modalContent;
}
console.log(typeof (usersData))