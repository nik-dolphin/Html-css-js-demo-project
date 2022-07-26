var emp_id = document.getElementById('emp_id');
var emp_name = document.getElementById("emp_name");
var emp_gender = document.getElementById("emp_gender");
var emp_salary = document.getElementById("emp_salary");
var activeCheck = document.getElementById("activeCheck");

// get id from url using document.URL
let url_str = document.URL;
let url = new URL(url_str);
let search_params = url.searchParams;
const employeeID = search_params.get('id');
// fetch data from localstorage
const updateData = JSON.parse(localStorage.getItem('EmployeeData'));

if (employeeID !== null) {
  // find all Detail of employeeID from data
  const updateRow = updateData.find((item) => item.emp_id === employeeID);
  emp_id.value = `${updateRow.emp_id}`;
  emp_name.value = `${updateRow.emp_name}`;
  emp_gender.value = `${updateRow.emp_gender}`;
  emp_salary.value = `${updateRow.emp_salary}`;
  if (updateRow.activeCheck === 'true') {
    activeCheck.checked = `${updateRow.activeCheck}`;
  } else {
    activeCheck.unchecked = `${updateRow.activeCheck}`;
  }
}