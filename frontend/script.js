
async function getDishes() {
   const response = await fetch('http://localhost:5000/api/dishes', {

    headers: {
      'Accept': 'application/json'
    },
    method: 'GET'
  });
  
  const data = await response.json()

}