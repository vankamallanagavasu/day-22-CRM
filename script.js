// Load customers from local storage on page load
document.addEventListener("DOMContentLoaded", function() {
    displayCustomers();
});

function addCustomer() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    if (name.trim() !== "" && email.trim() !== "") {
        var customer = {
            name: name,
            email: email
        };

        var customers = JSON.parse(localStorage.getItem("customers")) || [];
        customers.push(customer);
        localStorage.setItem("customers", JSON.stringify(customers));

        displayCustomers();
        clearForm();
        alert("Customer added successfully!");
    } else {
        alert("Please enter both name and email.");
    }
}

function displayCustomers() {
    var customerList = document.getElementById("customer-list");
    customerList.innerHTML = "";

    var customers = JSON.parse(localStorage.getItem("customers")) || [];

    customers.forEach(function(customer, index) {
        var li = document.createElement("li");
        li.innerHTML = `
            <strong>Name:</strong> ${customer.name} <br>
            <strong>Email:</strong> ${customer.email} <br>
            <button onclick="editCustomer(${index})">Edit</button>
            <button onclick="deleteCustomer(${index})">Delete</button>
        `;
        customerList.appendChild(li);
    });
}

function editCustomer(index) {
    var newName = prompt("Enter new name:");
    var newEmail = prompt("Enter new email:");

    if (newName && newEmail) {
        var customers = JSON.parse(localStorage.getItem("customers"));
        customers[index].name = newName;
        customers[index].email = newEmail;
        localStorage.setItem("customers", JSON.stringify(customers));
        displayCustomers();
    }
}

function deleteCustomer(index) {
    var customers = JSON.parse(localStorage.getItem("customers"));
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
}
