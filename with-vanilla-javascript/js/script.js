let usersData = [];

const btn = document.querySelector('.btn-outline-primary');
btn.addEventListener('click', function () {
    const inputValue = document.querySelector('.form-control').value.trim().toLowerCase();
    fetch('https://jsonplaceholder.org/users')
        .then(response => response.json())
        .then(data => {
            usersData = data;
            let output = "";
            const filteredResults = data.filter(e => {
                return (
                    e.firstname.toLowerCase().includes(inputValue) ||
                    e.lastname.toLowerCase().includes(inputValue)
                );
            });

            if (filteredResults.length === 0) {
                output += `<p>Data Karyawan tidak ditemukan</p>`;
            } else {
                filteredResults.forEach(e => {
                    output += showCards(e);
                });
            }
            document.querySelector(".row").innerHTML = output;
            const btnShow = document.querySelectorAll('.details');
            btnShow.forEach(event => {
                event.addEventListener('click', function () {
                    let out = "";

                    const numberId = this.getAttribute("data-employee");
                    fetch(`https://randomfox.ca/images/${numberId}.jpg`)
                        .then(result => result)
                        .then(res => {
                            out += foxImages(numberId);
                            document.querySelector(".modal-body").innerHTML = out;
                        })
                })
            })
        })

})

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

function foxImages(numberId) {
    const imgHTML = `<img src="https://randomfox.ca/images/${numberId}.jpg" alt="Random Fox Image" class="rounded text-center"> `;
    const selectedUser = usersData.find(user => user.id.toString() === numberId);

    return `<div class="rnd-image text-center">${imgHTML}</div>
            <ul class="list-group mt-2">
                <li class="list-group-item active text-center">${selectedUser.firstname} ${selectedUser.lastname}</li>
                <li class="list-group-item">Tanggal lahir: ${selectedUser.birthDate}</li>
                <li class="list-group-item">Alamat: ${selectedUser.address.street}, ${selectedUser.address.city}, ${selectedUser.address.zipcode} </li>
                <li class="list-group-item">Perusahaan: ${selectedUser.company.name}</li>
                <li class="list-group-item">Slogan: ${selectedUser.company.catchPhrase}</li>
                <li class="list-group-item">Email: ${selectedUser.email}</li>
                <li class="list-group-item">Telepon: ${selectedUser.phone}</li>
            </ul>`
}