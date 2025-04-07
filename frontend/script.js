
async function getDishes() {
   const response = await fetch('/api/dishes', {

    headers: {
      'Accept': 'application/json'
    },
    method: 'GET'
  });
  
  const data = await response.json()

  let table = document.getElementById('dish-table');

  for (let i = 0; i < data.length; i++) {
    let row = `
      <tr>
        <td>${data[i].name}</td>
        <td>${(data[i].ingredients).join(', ')}</td>
        <td>${(data[i].cookingSteps).join(', ')}</td>
        <td>${data[i].cookingTime}</td>
        <td>${data[i].flavorProfile}</td> 
        <td>${data[i].origin}</td>      
      </tr>
    
    `;
    table.innerHTML += row;
  }

}

getDishes()