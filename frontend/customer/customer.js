$(document).ready(function () {
    $('#add-user').on('submit', function (event) {
        event.preventDefault();
        addNewCustomer();
    });

    $('#update-user').on('submit', function (event) {
        event.preventDefault();
        const id = $('#update-user').data('id');
        updateUser(id);
    });

    $('#display').on('click', function () {
        displayCustomerList();
    });

    $('#display-create').on('click', function () {
        displayFormCreate();
    });

    $('#search-user').on('submit', function (event) {
        event.preventDefault();
        searchUser();
    });

    let user = docLocalStorage();
    if (!user) {
        window.location.href = "../login/login.html";
    } else {
        token = user.token;
    }
});

function docLocalStorage() {
    let userString = localStorage.getItem("u");
    return JSON.parse(userString);
}

async function addNewCustomer() {
    event.preventDefault(); // Chặn sự kiện mặc định của thẻ

    const name = $('#create-name').val();
    const email = $('#create-email').val();
    const gender = $('#create-gender').val();
    const address = $('#create-address').val();
    const age = $('#create-age').val();
    const phoneNumber = $('#create-phoneNumber').val();

    const newCustomer = {
        name: name,
        email: email,
        gender: gender,
        address: address,
        age: age,
        phoneNumber: phoneNumber
    };

    try {
        await $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "POST",
            data: JSON.stringify(newCustomer),
            url: "http://localhost:8080/api/customers",
            success: function () {
                displayCustomerList();
                $('#add-user')[0].reset();
            }
        });
    } catch (error) {
        console.error('Error adding new user:', error);
    }
}

function displayFormUpdate(customer) {
    $('#update-user').data('id', customer.id);
    $('#update-name').val(customer.name);
    $('#update-email').val(customer.email);
    $('#update-gender').val(customer.gender);
    $('#update-address').val(customer.address);
    $('#update-age').val(customer.age);
    $('#update-phoneNumber').val(customer.phoneNumber);
    $('#customerList').hide();
    $('#add-user').hide();
    $('#update-user').show();
    $('#display-create').hide();
    $('#title').hide();
}

async function updateUser(id) {
    const name = $('#update-name').val();
    const email = $('#update-email').val();
    const gender = $('#update-gender').val();
    const address = $('#update-address').val();
    const age = $('#update-age').val();
    const phoneNumber = $('#update-phoneNumber').val();

    const updateCustomer = {
        id: id,
        name: name,
        email: email,
        gender: gender,
        address: address,
        age: age,
        phoneNumber: phoneNumber
    };

    try {
        await $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "PUT",
            data: JSON.stringify(updateCustomer),
            url: `http://localhost:8080/api/customers/${id}`,
            success: function () {
                displayCustomerList();
                $('#update-user').hide();
                $('#update-user')[0].reset();
                $('#customerList').show();
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

function getcustomer(customer) {
    const deleteText = $('#customerList').data('delete-text');
    const updateText = $('#customerList').data('update-text');
    
    return `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.gender}</td>
            <td>${customer.address}</td>
            <td>${customer.age}</td>
            <td>${customer.phoneNumber}</td>
            <td>
                <button class="deleteUser" onclick="deleteUser(${customer.id})">${deleteText}</button>
            </td>
            <td>
                <button class="updateUser" onclick='displayFormUpdate(${JSON.stringify(customer)})'>${updateText}</button>
            </td>
        </tr>`;
}

function updateCustomerList(data) {
    let content = '<table id="display-list" border="1"><tr>' +
        '<th>Name</th>' +
        '<th>Email</th>' +
        '<th>Gender</th>' +
        '<th>Address</th>' +
        '<th>Age</th>' +
        '<th>PhoneNumber</th>' +
        '</tr>';

    data.forEach(customer => {
        content += getcustomer(customer);
    });

    content += "</table>";
    $('#customerList').html(content);
}

async function displayCustomerList() {
    try {
        const response = await $.ajax({
            headers: {
                'Accept': 'application/json',
                "Authorization": "Bearer " + token
            },
            type: "GET",
            url: "http://localhost:8080/api/customers",
        });
        updateCustomerList(response);
    } catch (error) {
        console.error('Error fetching customer list:', error);
    }
}

async function deleteUser(id) {
    try {
        await $.ajax({
            headers: {
                "Authorization": "Bearer " + token
            },
            type: "DELETE",
            url: `http://localhost:8080/api/customers/${id}`
        });
        displayCustomerList();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}
