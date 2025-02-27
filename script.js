
document.addEventListener("DOMContentLoaded", () => {

    console.log("LOADED")

    getRecipients()

    const form = document.querySelector("#recipient-form")
    form.addEventListener('submit', addRecipient)

    


})



function renderOneRecipient(recipient){
   
    let card = document.createElement('li')
    card.className = 'card'
    card.innerHTML = `
    <div id="content">
    <h2>${recipient.name}</h2>
    <p>Gift idea: ${recipient.gift} </p>
    <p class="budget">Budget of: $${recipient.budget}</p>
    </div>
    <div class="button">
    <button id=${recipient.id}>Buy?</button>
    </div>
    `
    document.querySelector('#recipient-list').appendChild(card)

    const button = document.getElementById(`${recipient.id}`)
    button.addEventListener("click", () => {
      alert("Great Job! Who's Next?")
      card.remove()
      removeRecipient(recipient.id)
    })
    
  } 
  

// fetches // 

function getRecipients(){
  fetch('http://localhost:3000/recipients')
  .then(r => r.json())
  .then(data => data.forEach(recipient => renderOneRecipient(recipient)) )
}


function addRecipient(event){
    event.preventDefault()
    const [name, gift, budget] = event.target
  
    fetch("http://localhost:3000/recipients",{
      method: "POST",
      headers:{
      "Content-Type": "application/json",
    },
      body: JSON.stringify({
      name: name.value,
      gift: gift.value,
      budget: budget.value
      })
    })
    .then(response => response.json())
    .then(response => renderOneRecipient(response))
    name.value = ""
    gift.value = ""
    budget.value = ""
  }



function removeRecipient(id){
  fetch(`http://localhost:3000/recipients/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

}