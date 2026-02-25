// ================== APP STATE ==================
let isLoggedIn = false;
const ADMIN_EMAIL = "admin@example.com";

// Simulated DB
window.db = {
    accounts: JSON.parse(localStorage.getItem("db_accounts") || "[]")
};
let employees = [];
let departments = [];
let accounts = []; // simulated account database

// ================== DOM ELEMENTS ==================
const guestLinks = document.getElementById("guestLinks");
const userLinks = document.getElementById("userLinks");
const navbarUsername = document.getElementById("navbarUsername");
const roleAdminLinks = document.querySelectorAll(".role-admin");

const homeSection = document.getElementById("homeSection");
const registerSection = document.getElementById("registerSection");
const verifySection = document.getElementById("verifySection");
const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");
const employeesView = document.getElementById("employeesView");
const departmentsView = document.getElementById("departmentsView");
const accountsView = document.getElementById("accountsView");
const myRequestView = document.getElementById("myRequestView");
const myRequestsLink = document.getElementById("myRequestsLink");

const getStartedBtn = document.getElementById("getStartedBtn");
const cancelRegisterBtn = document.getElementById("cancelRegisterBtn");
const signUpBtn = document.getElementById("signUpBtn");
const simulateVerifyBtn = document.getElementById("simulateVerifyBtn");
const backToLoginBtn = document.getElementById("backToLoginBtn");
const cancelLoginBtn = document.getElementById("cancelLoginBtn");

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const verifiedMsg = document.getElementById("verifiedMsg");

const logoutBtn = document.getElementById("logoutBtn");

const registerForm = document.getElementById("registerForm");
const regFirstName = document.getElementById("regFirstName");
const regLastName = document.getElementById("regLastName");
const regEmail = document.getElementById("regEmail");
const regPassword = document.getElementById("regPassword");
const toggleRegPassword = document.getElementById("toggleRegPassword");
const toggleLoginPassword = document.getElementById("toggleLoginPassword");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profileRole = document.getElementById("profileRole");
const editProfileBtn = document.getElementById("editProfileBtn");

const addEmployeeBtn = document.getElementById("addEmployeeBtn");
const saveEmployeeBtn = document.getElementById("saveEmployeeBtn");
const cancelEmployeeBtn = document.getElementById("cancelEmployeeBtn");
const empID = document.getElementById("empID");
const empName = document.getElementById("empName");
const empPosition = document.getElementById("empPosition");
const empDepartment = document.getElementById("empDepartment");
const empHireDate = document.getElementById("empHireDate");
const employeesTableBody = document.getElementById("employeesTableBody");
const employeeForm = document.getElementById("employeeForm");

const addDepartmentBtn = document.getElementById("addDepartmentBtn");
const saveDepartmentBtn = document.getElementById("saveDepartmentBtn");
const cancelDepartmentBtn = document.getElementById("cancelDepartmentBtn");
const deptName = document.getElementById("deptName");
const deptDescription = document.getElementById("deptDescription");
const departmentsTableBody = document.getElementById("departmentsTableBody");
const departmentForm = document.getElementById("departmentForm");

const addAccountBtn = document.getElementById("addAccountBtn");
const saveAccountBtn = document.getElementById("saveAccountBtn");
const cancelAccountBtn = document.getElementById("cancelAccountBtn");
const accFirstName = document.getElementById("accFirstName");
const accLastName = document.getElementById("accLastName");
const accEmail = document.getElementById("accEmail");
const accRole = document.getElementById("accRole");
const accPassword = document.getElementById("accPassword");
const accVerified = document.getElementById("accVerified");
const accountsTableBody = document.getElementById("accountsTableBody");
const accountForm = document.getElementById("accountForm");

const itemsContainer = document.getElementById("itemsContainer");
const addItemBtn = document.getElementById("addItemBtn");

// ================== VIEW CONTROL ==================
function showSection(section) {
    [homeSection, registerSection, verifySection, loginSection, profileSection, employeesView, departmentsView,  accountsView, myRequestView]
        .forEach(sec => sec.style.display = "none");

    if (section) section.style.display = "block";
}

function updateNavbar() {
    guestLinks.style.display = isLoggedIn ? "none" : "flex";
    userLinks.style.display = isLoggedIn ? "flex" : "none";
}

// ================== AUTH ==================
function setAuthState(auth, user = null) {
    isLoggedIn = auth;

    if (auth && user) {
        user.role = (user.email === ADMIN_EMAIL) ? "Admin" : "User";
        navbarUsername.textContent = user.role === "Admin" ? "Admin" : "User";

        roleAdminLinks.forEach(link => {
            link.style.display = user.role === "Admin" ? "block" : "none";
        });

        profileName.textContent = user.role === "Admin" ? "Admin User" : "Regular User";
        profileEmail.textContent = user.email;
        profileRole.textContent = user.role;

        showSection(profileSection);
    } else {
        showSection(homeSection);
    }

    updateNavbar();
}

// Render Employees Table
function renderEmployees() {
    employeesTableBody.innerHTML = "";

    if (employees.length === 0) {
        employeesTableBody.innerHTML = `<tr><td colspan="6">No employees.</td></tr>`;
        return;
    }

    employees.forEach((emp, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.position}</td>
            <td>${emp.department}</td>
            <td>${emp.hireDate}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editEmployee(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${index})">Delete</button>
            </td>
        `;
        employeesTableBody.appendChild(row);
    });
}

// Edit Employee
function editEmployee(index) {
    empID.value = employees[index].id;
    empName.value = employees[index].name;
    empPosition.value = employees[index].position;
    empDepartment.value = employees[index].department;
    empHireDate.value = employees[index].hireDate;

    employeeForm.style.display = "block";
    employees.splice(index, 1); // remove old entry
    renderEmployees();
}

// Delete Employee
function deleteEmployee(index) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees.splice(index, 1);
        renderEmployees();
    }
}

// Render Accounts Table
function renderAccounts() {
    accountsTableBody.innerHTML = "";

    if (accounts.length === 0) {
        accountsTableBody.innerHTML = `<tr><td colspan="5">No accounts.</td></tr>`;
        return;
    }

    accounts.forEach((acc, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${acc.firstName} ${acc.lastName}</td>
            <td>${acc.email}</td>
            <td>${acc.role}</td>
            <td>${acc.verified ? "Yes" : "No"}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editAccount(${index})">Edit</button>
                <button class="btn btn-sm btn-warning me-1" onclick="resetPassword(${index})">Reset Password</button>
                <button class="btn btn-sm btn-danger" onclick="deleteAccount(${index})">Delete</button>
            </td>
        `;
        accountsTableBody.appendChild(row);
    });
}

// Edit Account
function editAccount(index) {
    const acc = accounts[index];
    accFirstName.value = acc.firstName;
    accLastName.value = acc.lastName;
    accEmail.value = acc.email;
    accRole.value = acc.role;
    accPassword.value = acc.password;
    accVerified.checked = acc.verified;

    accountForm.style.display = "block";
    accounts.splice(index, 1); // remove old entry
    renderAccounts();
}

// Reset Password
function resetPassword(index) {
    const newPass = prompt("Enter new password:");
    if (newPass) {
        accounts[index].password = newPass;
        alert("Password reset successfully.");
    }
}

// Delete Account
function deleteAccount(index) {
    if (confirm("Are you sure you want to delete this account?")) {
        accounts.splice(index, 1);
        renderAccounts();
    }
}

// Render table
function renderDepartments() {
    departmentsTableBody.innerHTML = "";

    if (departments.length === 0) {
        departmentsTableBody.innerHTML = `<tr><td colspan="3">No departments.</td></tr>`;
        return;
    }

    departments.forEach((dept, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${dept.name}</td>
            <td>${dept.description}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editDept(${index})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteDept(${index})">Delete</button>
            </td>
        `;
        departmentsTableBody.appendChild(row);
    });
}

// Edit Department
function editDept(index) {
    deptName.value = departments[index].name;
    deptDescription.value = departments[index].description;
    departmentForm.style.display = "block"; // show form when editing

    // Remove the old entry to replace it after saving
    departments.splice(index, 1);
    renderDepartments();
}

// Delete Department
function deleteDept(index) {
    if (confirm("Are you sure you want to delete this department?")) {
        departments.splice(index, 1);
        renderDepartments();
    }
}

// ================== EVENT LISTENERS ==================

// Home → Register
getStartedBtn.addEventListener("click", () => showSection(registerSection));

// Cancel Register → Home
cancelRegisterBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents form submission
    showSection(homeSection);
});

cancelLoginBtn.addEventListener("click", (e) => {
    e.preventDefault(); // prevents form submission
    verifiedMsg.style.display = "none";
    showSection(homeSection);
});

// Sign Up
signUpBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = regFirstName.value.trim();
    const lastName = regLastName.value.trim();
    const email = regEmail.value.trim();
    const password = regPassword.value;

    if (!firstName || !lastName || !email || !password) return alert("Fill all fields");
    if (password.length < 6) return alert("Password too short");

    if (window.db.accounts.find(acc => acc.email === email)) return alert("Email exists");

    const newAccount = { firstName, lastName, email, password, verified: false };
    window.db.accounts.push(newAccount);
    localStorage.setItem("db_accounts", JSON.stringify(window.db.accounts));
    localStorage.setItem("unverified_email", email);

    registerForm.reset();
    document.getElementById("verifyMessage").textContent = `Verification sent to ${email}`;
    showSection(verifySection);
});

// Simulate Email Verification
simulateVerifyBtn.addEventListener("click", () => {
    const email = localStorage.getItem("unverified_email");
    if (!email) return alert("No email found");

    const account = window.db.accounts.find(acc => acc.email === email);
    if (!account) return alert("Account not found");

    account.verified = true;
    localStorage.setItem("db_accounts", JSON.stringify(window.db.accounts));
    localStorage.removeItem("unverified_email");

    verifiedMsg.style.display = "block";
    showSection(loginSection);
});

// Back to Login
backToLoginBtn.addEventListener("click", () => {
    verifiedMsg.style.display = "block";
    showSection(loginSection);
});

// Login
loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim();
    const password = loginPassword.value;

    if (!email || !password) return alert("Fill both fields");

    const account = window.db.accounts.find(acc => acc.email === email && acc.password === password && acc.verified);
    if (!account) return alert("Invalid login or not verified");

    localStorage.setItem("auth_token", email);
    setAuthState(true, account);

    loginEmail.value = "";
    loginPassword.value = "";
});

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("auth_token");
    setAuthState(false);
    showSection(homeSection);
    verifiedMsg.style.display = "none";
});

departmentsLink.addEventListener("click", () => {
    // Hide other sections
    showSection(departmentsView); // you need a <div id="departmentsView"> in HTML
});

addDepartmentBtn.addEventListener("click", () => {
    deptName.value = "";
    deptDescription.value = "";
    departmentForm.style.display = "block"; // show the form
});

// Save Employee
saveEmployeeBtn.addEventListener("click", () => {
    if (!empID.value || !empName.value || !empPosition.value || !empDepartment.value || !empHireDate.value) {
        alert("Please fill in all fields.");
        return;
    }

    const newEmp = {
        id: empID.value,
        name: empName.value,
        position: empPosition.value,
        department: empDepartment.value,
        hireDate: empHireDate.value
    };

    employees.push(newEmp);
    renderEmployees();
    employeeForm.style.display = "none";
});

// Cancel Employee
cancelEmployeeBtn.addEventListener("click", () => {
    empID.value = "";
    empName.value = "";
    empPosition.value = "";
    empDepartment.value = "";
    empHireDate.value = "";
    employeeForm.style.display = "none";
});

// Show form
addAccountBtn.addEventListener("click", () => {
    accFirstName.value = "";
    accLastName.value = "";
    accEmail.value = "";
    accRole.value = "User";
    accPassword.value = "";
    accVerified.checked = false;
    accountForm.style.display = "block";
});

// Save Account
saveAccountBtn.addEventListener("click", () => {
    if (!accFirstName.value || !accLastName.value || !accEmail.value || !accPassword.value) {
        alert("Please fill in all fields.");
        return;
    }

    const newAcc = {
        firstName: accFirstName.value,
        lastName: accLastName.value,
        email: accEmail.value,
        role: accRole.value,
        password: accPassword.value,
        verified: accVerified.checked
    };

    accounts.push(newAcc);
    renderAccounts();
    accountForm.style.display = "none";
});

// Cancel Account
cancelAccountBtn.addEventListener("click", () => {
    accFirstName.value = "";
    accLastName.value = "";
    accEmail.value = "";
    accRole.value = "User";
    accPassword.value = "";
    accVerified.checked = false;
    accountForm.style.display = "none";
});

accountsLink.addEventListener("click", () => {
    showSection(accountsView);
});

// Save Department
saveDepartmentBtn.addEventListener("click", () => {
    if (!deptName.value || !deptDescription.value) {
        alert("Please enter Name and Description.");
        return;
    }

    // Add new department
    const newDept = { name: deptName.value, description: deptDescription.value };
    departments.push(newDept);
    renderDepartments();

    // Hide form after saving
    departmentForm.style.display = "none";
});


// Cancel Department
cancelDepartmentBtn.addEventListener("click", () => {
    deptName.value = "";
    deptDescription.value = "";
    departmentForm.style.display = "none"; // hide form
});

editProfileBtn.addEventListener("click", () => {
    alert("Edit Profile clicked! You can implement editing logic here.");
});

addEmployeeBtn.addEventListener("click", () => {
    empID.value = "";
    empName.value = "";
    empPosition.value = "";
    empDepartment.value = "";
    empHireDate.value = "";
    employeeForm.style.display = "block"; // show the form
});

myRequestsLink.addEventListener("click", () => {
    showSection(myRequestView);
});


// Toggle Password
toggleRegPassword.addEventListener("click", () => {
    if (regPassword.type === "password") { regPassword.type = "text"; toggleRegPassword.textContent = "🙈"; }
    else { regPassword.type = "password"; toggleRegPassword.textContent = "👁"; }
});
toggleLoginPassword.addEventListener("click", () => {
    if (loginPassword.type === "password") { loginPassword.type = "text"; toggleLoginPassword.textContent = "🙈"; }
    else { loginPassword.type = "password"; toggleLoginPassword.textContent = "👁"; }
});

// Add first row when modal opens
document.getElementById("requestModal").addEventListener("shown.bs.modal", () => {
    if (itemsContainer.children.length === 0) {
        addItemRow();
    }
});

// Add item button
addItemBtn.addEventListener("click", addItemRow);

function addItemRow() {
    const row = document.createElement("div");
    row.className = "d-flex gap-2 mb-2";

    row.innerHTML = `
        <input type="text" class="form-control" placeholder="Item name">
        <input type="number" class="form-control" value="1" style="max-width:80px;">
        <button class="btn btn-outline-danger btn-sm">✕</button>
    `;

    // Remove row
    row.querySelector("button").addEventListener("click", () => {
        row.remove();
    });

    itemsContainer.appendChild(row);
}

// Submit Request
document.getElementById("submitRequestBtn").addEventListener("click", () => {
    const type = document.getElementById("requestType").value;

    const items = [];
    itemsContainer.querySelectorAll(".d-flex").forEach(row => {
        const name = row.children[0].value;
        const qty = row.children[1].value;

        if (name.trim() !== "") {
            items.push({ name, qty });
        }
    });

    console.log("Request Type:", type);
    console.log("Items:", items);

    alert("Request submitted!");

    // Reset form
    document.getElementById("requestType").value = "";
    itemsContainer.innerHTML = "";

    bootstrap.Modal.getInstance(document.getElementById("requestModal")).hide();
});

// Navbar links
loginLink.addEventListener("click", () => { showSection(loginSection); verifiedMsg.style.display = "none"; });
registerLink.addEventListener("click", () => { showSection(registerSection); verifiedMsg.style.display = "none"; registerForm.reset(); });
document.getElementById("profileLink").addEventListener("click", () => showSection(profileSection));
document.getElementById("employeesLink").addEventListener("click", () => showSection(employeesView));

// Initialize
updateNavbar();
