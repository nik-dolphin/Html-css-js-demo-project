const tbody = document.getElementById("tbody");
var emp_id = document.getElementById('emp_id');
var emp_name = document.getElementById("emp_name");
var emp_gender = document.getElementById("emp_gender");
var emp_salary = document.getElementById("emp_salary");
var activeCheck = document.getElementById("activeCheck");

const data = localStorage.getItem('EmployeeData');
const result = JSON.parse(data);
insertData(result);
// console.log(result);
function insertData(result) {
  const tableData = result.map((items) => (
    `<tr>
      <th scope="row">${items.emp_id}</th>
      <td>${items.emp_name}</td>
      <td>${items.emp_gender}</td>
      <td>${items.emp_salary}</td>
      <td>${items.activeCheck}</td>
      <td class="text-center">
        <i class="fa-solid fa-trash-can p-1" id='${items.emp_id}' onClick="deleteItem('${items.emp_id}')" data-toggle="tooltip" title="Delete"></i>
        <a href="/index.html?id=${items.emp_id}"><i class="fa-solid fa-pen-to-square p-1" data-toggle="tooltip" title="Update"></i></a>
        <a href="/viewForm.html?id=${items.emp_id}"><i class="fa-solid fa-eye p-1" data-toggle="tooltip" title="View"></i></a>
      </td>
    </tr>`
  )).join('');
  tbody.innerHTML = tableData;
}

function deleteItem(id) {
  if(confirm(`Do you Want to Delete ${id}'s Detail ?`)) {
    const index = result.findIndex((item) => item.emp_id === id);
    result.splice(index, 1);
    const updateResult = JSON.stringify(result);
    localStorage.setItem("EmployeeData", updateResult);
    insertData(result);
  }
};
