var resultObj = {};
var finalResult = JSON.parse(localStorage.getItem('storageValues'));
if (finalResult == null) finalResult = [];
if (finalResult != null && finalResult.length > 0) loadValues();
var indexValue;
document.getElementById("edit").value = "Submit";

function loadValues() {
    let row;
    let table = document.getElementById("resultTable");
    finalResult.forEach(ele => {
        row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML = ele.name;
        row.insertCell(1).innerHTML = ele.email;
        row.insertCell(2).innerHTML = ele.contactNo;
        row.insertCell(3).innerHTML = ele.course;
        row.insertCell(4).innerHTML = '<u class="edit" onclick="editForm(this)">Edit</u> &nbsp; <u class="delete" onclick="deleteForm(this)">Delete</u>'
    })
}

formValidation = () => {
    const name = document.registrationForm.name;
    const email = document.registrationForm.email;
    const contactNo = document.registrationForm.contactNo;
    const age = document.registrationForm.age;
    const address = document.registrationForm.address;

    const genderArr = document.querySelectorAll("input[name = 'gender']:checked")
    let genderArray = '';
    const courseArr = document.querySelectorAll("input[name = 'course']:checked")
    let courseArray = '';

    if (genderArr.length > 0) {
        genderArr.forEach(ele => {
            genderArray += ele.value + ', '
        })
        // for (let i = 0; i < genderArr.length; i++) {
        //     genderArray += genderArr[i].value + ', '
        // }
    }
    if (courseArr.length > 0) {
        courseArr.forEach(ele => {
            courseArray += ele.value + ', '
        })
        // for (let i = 0; i < courseArr.length; i++) {
        //     courseArray += courseArr[i].value + ', '
        // }
    }

    if (name.value.trim() == '' || name.value.trim() == null) {
        alert('Please enter user name');
        name.focus()
        return false;
    }
    if (name.value.trim().length < 5 || name.value.trim().length > 15) {
        alert('Please enter user name should between 5 to 15');
        name.focus()
        return false;
    }
    if (!/^[a-zA-Z]*$/g.test(name.value.trim())) {
        alert("Invalid user name, only alphabets are allowed");
        name.focus();
        return false;
    }

    if (email.value.trim() == '' || email.value.trim() == null) {
        alert('Please enter Email');
        email.focus()
        return false;
    }
    // if (email.value.length < 5 || email.value.length > 25) {
    //     alert('Please enter Email should between 5 to 25');
    //     email.focus()
    //     return false;
    // }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value.trim())) {
        // if (!/^[a-zA-Z0-9+_]+@[a-zA-Z0-9.-]+$/g.test(email.value)) {
        alert("Invalid email");
        email.focus();
        return false;
    }

    if (contactNo.value.trim() == '' || contactNo.value.trim() == null) {
        alert('Please enter Contact No');
        contactNo.focus()
        return false;
    }
    if (contactNo.value.trim().length < 5 || contactNo.value.trim().length > 12) {
        alert('Please enter Contact No should between 5 to 12');
        contactNo.focus()
        return false;
    }
    if (!/^[0-9]*$/g.test(contactNo.value.trim())) {
        alert("Invalid Contact No, only numbers are allowed");
        contactNo.focus();
        return false;
    }

    if (genderArr.length == 0) {
        alert('Please select gender');
        return false;
    }

    if (courseArr.length == 0) {
        alert('Please select atleast one course');
        return false;
    }

    if (address.value.trim() == '' || address.value.trim() == null) {
        alert('Please enter address');
        address.focus()
        return false;
    }
    resultObj = {
        name: name.value.trim(),
        email: email.value.trim(),
        contactNo: contactNo.value.trim(),
        course: courseArray,
        age: age.value,
        address: address.value,
        gender: genderArray,
    }
    // showResult(resultObj);
    debugger;
    var table = document.getElementById("resultTable");
    if (document.getElementById("edit").value != "Submit") {
        finalResult.splice(indexValue, 1, resultObj)
        localStorage.setItem("storageValues", JSON.stringify(finalResult));
        var tempIndex = Number(indexValue) + 2
        document.getElementById("resultTable").deleteRow(tempIndex);
        var rowUpdate = table.insertRow(tempIndex);
        rowUpdate.insertCell(0).innerHTML = resultObj.name;
        rowUpdate.insertCell(1).innerHTML = resultObj.email;
        rowUpdate.insertCell(2).innerHTML = resultObj.contactNo;
        rowUpdate.insertCell(3).innerHTML = resultObj.course;
        rowUpdate.insertCell(4).innerHTML = '<u class="edit" onclick="editForm(this)">Edit</u> &nbsp; <u class="delete" onclick="deleteForm(this)">Delete</u>'
    } else {
        finalResult.push(resultObj)
        localStorage.setItem("storageValues", JSON.stringify(finalResult));
        var row = table.insertRow(table.rows.length);
        row.insertCell(0).innerHTML = resultObj.name;
        row.insertCell(1).innerHTML = resultObj.email;
        row.insertCell(2).innerHTML = resultObj.contactNo;
        row.insertCell(3).innerHTML = resultObj.course;
        row.insertCell(4).innerHTML = '<u class="edit" onclick="editForm(this)">Edit</u> &nbsp; <u class="delete" onclick="deleteForm(this)">Delete</u>'
    }
    document.getElementById("registrationForm").reset()
    document.getElementById("edit").value = "Submit";
    return true;
}

deleteForm = obj => {
    var confirmDelete = confirm("Are you sure to delete the record ? ")
    if (confirmDelete) {
        var index = obj.parentNode.parentNode.rowIndex;
        document.getElementById("resultTable").deleteRow(index);
        finalResult.splice(index - 2, 1);
        localStorage.setItem("storageValues", JSON.stringify(finalResult));
        document.getElementById("registrationForm").reset()
        document.getElementById("edit").value = "Submit";
    }
}

editForm = obj => {
    // function editForm(obj) {
    document.getElementById("edit").value = "Update";
    var indx = obj.parentNode.parentNode.rowIndex;
    var editRow = finalResult[indx - 2]
    indexValue = indx - 2;
    document.getElementById("name").value = editRow.name;
    document.getElementById("email").value = editRow.email;
    document.getElementById("contactNo").value = editRow.contactNo;
    document.getElementById("age").value = editRow.age;
    document.getElementById("address").value = editRow.address;
    var genderTemp = editRow.gender.split(", ")
    var courseTemp = editRow.course.split(", ")
    genderTemp.forEach(ele => {
        if (ele !== '') {
            document.getElementById(ele.toLowerCase()).checked = true;
        }
    })

    const courseArr = document.querySelectorAll("input[name = 'course']")
    courseArr.forEach(ele => {
        document.getElementById(ele.value.toLowerCase()).checked = false;

    })
    courseTemp.forEach(ele => {
        if (ele !== '') {
            document.getElementById(ele.toLowerCase()).checked = true;
        }
    })
    
}

reset = () => {
    document.getElementById("edit").value = "Submit";
}
