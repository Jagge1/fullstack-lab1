
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
            <td>${(data[i].ingredients).join('')  }. </td>
            <td>${(data[i].cookingSteps).join('')  }</td>
            <td>${data[i].cookingTime}</td>
            <td>${data[i].flavorProfile.join(' ') }</td> 
            <td>${data[i].origin}</td>      
          <div class="button-container">
            <button class="modal-btn update-btn" data-name="${data[i].name}">Update</button>  <button class="modal-btn delete-btn" data-name="${data[i].name}">Delete</button>
            </div>

          </tr> 
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

function showModal(){

  let title = document.getElementById('modal-title');
  let form = document.getElementById('update-form');
  let yesButton = document.getElementById('yes-btn');
  let noButton = document.getElementById('no-btn');
  let description = document.getElementById('modal-description');
  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Update Dish' 
      form.style.display = 'block'
    }
  });

  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Delete dish'
      description.innerText = 'Are you sure want to delete this dish?' 
      form.style.display = 'none'
      yesButton.style.display = 'inline-block'
      noButton.style.display = 'inline-block'   
    }
  });
  
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}

showModal();



