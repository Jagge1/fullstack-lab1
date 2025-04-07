
async function getDishes() {
   const response = await fetch('/api/dishes', {

    headers: {
      'Accept': 'application/json'
    },
    method: 'GET'
  });
  
  const data = await response.json();

  let table = document.getElementById('dish-table');

  for (let i = 0; i < data.length; i++) {
    let row = `
      
          <tr>
            <td>${data[i].name}</td>
            <td>${(data[i].ingredients).join('')  }</td>
            <td>${(data[i].cookingSteps).join('')  }</td>
            <td>${data[i].cookingTime}</td>
            <td>${data[i].flavorProfile.join(' ') }</td> 
            <td>${data[i].origin}</td>      
          </tr> 
          <div class="button-container">
            <button id="update-btn">Update</button>  <button id="delete-btn">Delete</button>
            </div>
    
    `;
    table.innerHTML += row;
  }

}

getDishes()

async function deleteDish() {

  const response = await fetch('/api/dishes/:name', {

    headers: {
      'Accept': 'application/json'
    },
    method: 'DELETE'
  });

  const data = await response.json();
}
