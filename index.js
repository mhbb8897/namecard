let usersData = [];
$(".btn-outline-secondary").on("click", function () {
    const inputValue = $(".form-control").val().trim().toLowerCase(); // Ambil input value dan format
    $.ajax({
        url: 'https://jsonplaceholder.org/users', // URL API yang benar
        success: result => {
            usersData = result; // Simpan data pengguna
            let output = "";

            // Filter data berdasarkan input value
            const filteredResults = result.filter(e => {
                return (
                    e.firstname.toLowerCase().includes(inputValue) ||
                    e.lastname.toLowerCase().includes(inputValue) // Misalnya, bisa juga menggunakan username
                );
            });

            // Mengecek apakah hasil filter kosong
            if (filteredResults.length === 0) {
                output += `<p>Data Karyawan tidak ditemukan</p>`;
            } else {
                // Mengenerate HTML untuk data yang difilter
                filteredResults.forEach(e => {
                    output += `<div class="col my-2 text-center">
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
                                </div>`;
                });
            }

            // Menampilkan hasil ke elemen dengan kelas row
            $(".row").html(output);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
});

$(document).on("click", ".btn-show", function () {
    const numberId = $(this).data("employee").toString();
    console.log(numberId); // Pastikan ini mengembalikan nilai yang benar
    let out = "";

    // Temukan user yang sesuai dengan numberId
    const selectedUser = usersData.find(user => user.id.toString() === numberId);

    if (selectedUser) {
        // Load gambar fox terlebih dahulu
        $.ajax({
            url: `https://randomfox.ca/images/${numberId}.jpg`, // Pastikan URL ini valid
            success: response => {
                // Tambahkan gambar fox di atas template literals
                const imgHTML = `<img src="https://randomfox.ca/images/${numberId}.jpg" alt="Random Fox Image" class="rounded text-center"> `;

                // Gunakan data dari usersData
                out += `<div class="rnd-image text-center">${imgHTML}</div>`;
                out += `<ul class="list-group mt-2">
                                <li class="list-group-item active">${selectedUser.firstname} ${selectedUser.lastname}</li>
                                <li class="list-group-item">Perusahaan: ${selectedUser.company.name}</li>
                                <li class="list-group-item">Catchphrase: ${selectedUser.company.catchPhrase}</li>
                                <li class="list-group-item">Email: ${selectedUser.email}</li>
                                <li class="list-group-item">Telepon: ${selectedUser.phone}</li>
                            </ul>`;

                // Tambahkan gambar dan data user ke dalam modal
                $(".modal-body").html(out);
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data:", status, error);
            }
        });
    }
});


