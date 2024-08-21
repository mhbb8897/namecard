let usersData = [];
$(".btn-outline-secondary").on("click", function () {
    const inputValue = $(".form-control").val().trim().toLowerCase();
    $.ajax({
        url: 'https://jsonplaceholder.org/users',
        success: result => {
            usersData = result;
            let output = "";

            const filteredResults = result.filter(e => {
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

            $(".row").html(output);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});

$(document).on("click", ".btn-show", function () {
    let out = "";
    const numberId = $(this).data("employee").toString();
    $.ajax({
        url: `https://randomfox.ca/images/${numberId}.jpg`,
        success: response => {

            out += foxImages(numberId);

            $(".modal-body").html(out);
        },
        error: function (xhr, status, error) {
            console.error("Error fetching data:", status, error);
        }
    });
});


function showCards(e) {
    return `<div class="col my-2 text-center">
        <div class="card h-100 d-flex flex-column">
            <div class="card-body flex-grow-1">
                <h5 class="card-title">${e.firstname} ${e.lastname}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${e.company.name}</h6>
                <p class="card-text">${e.company.catchPhrase}</p>
            </div>
            <div class="card-footer mt-auto">
                <a href="#" data-employee="${e.id}" class="btn btn-primary btn-show" data-toggle="modal" data-target="#detail-cards">Show Details</a>
            </div>
        </div>
    </div>`
}

function foxImages(numberId) {
    const imgHTML = `<img src="https://randomfox.ca/images/${numberId}.jpg" alt="Random Fox Image" class="rounded text-center"> `;
    const selectedUser = usersData.find(user => user.id.toString() === numberId);

    return `<div class="rnd-image text-center">${imgHTML}</div>;
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
