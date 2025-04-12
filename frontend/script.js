//Function to load dishes to a table
async function getDishes() {

  //Uses fetch with the get function to get dishes
   const response = await fetch('/api/dishes', {

    headers: {
      'Accept': 'application/json'
    },
    method: 'GET'
  });
  
  const data = await response.json();

  let table = document.getElementById('dish-table');

  //Looping through the data and adds the data to table
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

//Function to delete dishes from database and table
async function deleteDish(id) {

  const response = await fetch(`/api/dishes/${encodeURIComponent(id)}`, { //Uses id from database to delete

    headers: {
      'Accept': 'application/json'
    },
    method: 'DELETE',

  });

  if (response.ok) {
    console.log('Dish was deleted')
    window.location.reload()
  } 
}

//Function to update dish 
function updateDish(id) {

  let form = document.getElementById('update-form');

  form.onsubmit = async function (e) {
 
    e.preventDefault();

    //Values from user input
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

    const response = await fetch(`/api/dishes/${encodeURIComponent(id)}`, {

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(updatedDish)
  
    });

    if (response.ok) {
      console.log('Dish was updated');
      window.location.reload();
    }
  }
}

//Function adds new dish to the table, similar logic to the update function
function addDish(id) {

  let form = document.getElementById('update-form');
  form.onsubmit = null;

  form.onsubmit = async function (e) {
 
    e.preventDefault();

    let name = document.getElementById('name-input').value;
    let ingredients = document.getElementById('ingredients-input').value.split(',');
    let cookingSteps = document.getElementById('cooking-steps-input').value.split(',');
    let cookingTime = document.getElementById('cooking-time-input').value;
    let flavorProfile = document.getElementById('flavor-profile-input').value.split(',');
    let origin = document.getElementById('origin-input').value;

    const newDish = {
      name: name,
      ingredients: ingredients,
      cookingSteps: cookingSteps,
      cookingTime: cookingTime,
      flavorProfile: flavorProfile,
      origin: origin
    };

    const response = await fetch(`/api/dishes`, {

      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newDish)
  
    });

    if (response.ok) {
      console.log('Dish was added');
      window.location.reload();
    }
  }
}

//Function to handle modal
function showModal(){

  //Variables to modify modal
  let title = document.getElementById('modal-title');
  let form = document.getElementById('update-form');
  let yesButton = document.getElementById('yes-btn');
  let noButton = document.getElementById('no-btn');
  let description = document.getElementById('modal-description');
  let modal = document.getElementById('myModal');
  let dishToDelete = '';
  let dishToUpdate = '';

  //If the user clicks "update"
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('update-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Update Dish' ;
      form.style.display = 'block';
      yesButton.style.display = 'none';
      noButton.style.display = 'none'; 
      description.style.display = 'none'; 
      dishToUpdate = e.target.getAttribute('data-id');
      updateDish(dishToUpdate);
    }
  });

  //If the user clicks "add dish"
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-dish-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Add new dish' ;
      form.style.display = 'block';
      yesButton.style.display = 'none';
      noButton.style.display = 'none'; 
      description.style.display = 'none'; 

      document.getElementById('name-input').value = '';
      document.getElementById('ingredients-input').value = '';
      document.getElementById('cooking-steps-input').value = '';
      document.getElementById('cooking-time-input').value = '';
      document.getElementById('flavor-profile-input').value = '';
      document.getElementById('origin-input').value = '';

      addDish();
    }
  });

  //If the user clicks "delete"
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
      document.getElementById('myModal').style.display = 'block';
      title.innerText = 'Delete dish'
      description.innerText = 'Are you sure want to delete this dish?'
      description.style.display = 'block' 
      form.style.display = 'none'
      yesButton.style.display = 'inline-block'
      noButton.style.display = 'inline-block' 
      dishToDelete = e.target.getAttribute('data-id');  
    }
  });
  
  //If the user clicks "yes" in the delete modal
  yesButton.addEventListener('click', ()=> {
    console.log('Yes click')
    deleteDish(dishToDelete);
    modal.style.display = 'none';
  })

  //If the user clicks "x" in the modal
  document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = 'none';
  });

  //If the user clicks "no" in the delete modal
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
showModal();