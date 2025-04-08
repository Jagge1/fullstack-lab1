
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
          </tr> 
          <div class="button-container">
            <button class="modal-btn update-btn" data-id="${data[i]._id}">Update</button>
            <button class="modal-btn delete-btn" data-id="${data[i]._id}">Delete</button>
            </div>
    `;
    table.innerHTML += row;
  }
}

async function deleteDish(id) {

  const response = await fetch(`/api/dishes/${encodeURIComponent(id)}`, {

    headers: {
      'Accept': 'application/json'
    },
    method: 'DELETE',

  });

  if (response.ok) {
    console.log('Dish was deleted')
  }
  
}

function updateDish() {

  document.getElementById('update-form').addEventListener('submit', async (e)=> {
    e.preventDefault();

    let name = document.getElementById('name-input').value;
    let ingredients = document.getElementById('ingredients-input').value.split(',');
    let cookingSteps = document.getElementById('cooking-steps-input').value.split(',');
    let cookingTime = document.getElementById('cooking-time-input').value;
    let flavorProfile = document.getElementById('flavor-profile-input').value.split(',');
    let origin = document.getElementById('origin-input').value;

    const updatedDish = {
      name: name,
      ingredients: ingredients,
      cookingSteps: cookingSteps,
      cookingTime: cookingTime,
      flavorProfile: flavorProfile,
      origin: origin
    };

    const response = await fetch(`/api/dishes/${encodeURIComponent(name)}`, {

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedDish)
  
    });
});
}

function showModal(){

  let title = document.getElementById('modal-title');
  let form = document.getElementById('update-form');
  let yesButton = document.getElementById('yes-btn');
  let noButton = document.getElementById('no-btn');
  let description = document.getElementById('modal-description');
  let modal = document.getElementById('myModal');
  let dishToDelete = '';

  
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Update Dish' ;
      form.style.display = 'block';
      yesButton.style.display = 'none';
      noButton.style.display = 'none'; 
      description.style.display = 'none';  
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
      dishToDelete = e.target.getAttribute('data-id');  
    }
  });

  yesButton.addEventListener('click', ()=> {
    console.log('Yes click')
    deleteDish(dishToDelete);
    modal.style.display = 'none';
    window.location.reload()
  })

  
  document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
  });

  noButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  });
}


getDishes();
updateDish();
showModal();