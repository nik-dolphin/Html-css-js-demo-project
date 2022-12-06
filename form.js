var submit = document.getElementById("submit");
var emp_id = document.getElementById("emp_id");
var emp_name = document.getElementById("emp_name");
var emp_gender = document.getElementById("emp_gender");
var emp_salary = document.getElementById("emp_salary");
var activeCheck = document.getElementById("activeCheck");

// get id from url using document.URL
let url_str = document.URL;
let url = new URL(url_str);
let search_params = url.searchParams;
const employeeID = search_params.get("id");
// fetch data from localstorage
const updateData = JSON.parse(localStorage.getItem("EmployeeData"));

if (employeeID !== null) {
  // find all Detail of employeeID from data
  const updateRow = updateData.find((item) => item.emp_id === employeeID);
  emp_id.value = `${updateRow.emp_id}`;
  emp_id.disabled = true;
  emp_name.value = `${updateRow.emp_name}`;
  emp_gender.value = `${updateRow.emp_gender}`;
  emp_salary.value = `${updateRow.emp_salary}`;
  if (updateRow.activeCheck === "true") {
    activeCheck.checked = `${updateRow.activeCheck}`;
  } else {
    activeCheck.unchecked = `${updateRow.activeCheck}`;
  }
}

// clear data after submit form
function clearForm() {
  emp_id.value = "";
  emp_name.value = "";
  emp_gender.value = "";
  emp_salary.value = "";
  activeCheck.checked = "";
}

// submit event function
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // create array variable
  var dataArray = [];
  const updateData = JSON.parse(localStorage.getItem("EmployeeData"));
  console.log(updateData);
  // store form detail into data variable
  const data = {
    emp_id: `${emp_id.value}`,
    emp_name: `${emp_name.value}`,
    emp_gender: `${emp_gender.value}`,
    emp_salary: `${emp_salary.value}`,
    activeCheck: `${activeCheck.checked}`,
  };
  // check data is empty or not
  if (emp_id.value && emp_name.value && emp_gender.value && emp_salary.value) {
    if (updateData !== null) {
      updateData.map((items) => {
        if (items.emp_id === employeeID) {
          // call update function
          updateEmployeeRow();
        }
      });
    }
    if (emp_id.value !== employeeID) {
      if (updateData !== null) {
        for (let i = 0; i < updateData.length; i++) {
          if (updateData[i].emp_id === emp_id.value) {
            alert("User Id already used, Try different !");
            return (emp_id.value = "");
          }
        }
      }
      // form validation
      if (
        emp_id.value &&
        emp_name.value &&
        emp_gender.value &&
        emp_salary.value
      ) {
        const res = /^[a-zA-Z0-9_\.]+$/.exec(emp_id.value);
        if (res) {
          if (emp_name.value.length > 2) {
            if (
              emp_salary.value >= 0 &&
              (emp_gender.value === "male" || emp_gender.value === "female")
            ) {
              // insert form data into array variable
              dataArray.push(data);
              dataArray = dataArray.concat(
                JSON.parse(localStorage.getItem("EmployeeData") || "[]")
              );
              const result = JSON.stringify(dataArray);
              // store data into localstorage
              localStorage.setItem("EmployeeData", result);
              alert("Your data inserted Successfully !");
              clearForm();
            } else {
              alert("you insert wrong detail.");
            }
          } else {
            alert("Character must be more than 3");
          }
        } else {
          alert(
            "UserID Invalid, you should fill with Lowercase Letters (a-z), Uppercase Letters (A-Z), Numbers (0-9), Dots (.) and, Underscores (_)."
          );
        }
      }
    }
  } else {
    alert("You must have to fill all form values.");
  }
});

// update employee data function
function updateEmployeeRow() {
  // find index of update row
  const index = updateData.findIndex((item) => item.emp_id === employeeID);
  // store updated data into variable
  const updatedData = {
    emp_id: `${emp_id.value}`,
    emp_name: `${emp_name.value}`,
    emp_gender: `${emp_gender.value}`,
    emp_salary: `${emp_salary.value}`,
    activeCheck: `${activeCheck.checked}`,
  };
  // form validation for update detail
  if (
    emp_salary.value >= 0 &&
    (emp_gender.value === "male" || emp_gender.value === "female")
  ) {
    // update index
    updateData[index] = {
      ...updateData[index],
      ...updatedData,
    };
    // store data updated data into localstorage
    localStorage.setItem("EmployeeData", JSON.stringify(updateData));
    alert("Data Updated Successfully");
    window.location.href = "EmployeeTable.html";
  } else {
    alert("You insert wrong detail.");
  }
}
