// put all chores on DOM
// need to post a chore
 // delete a chore
 // edit a chore's priority

document.addEventListener("DOMContentLoaded", () => {
  let choresDiv = document.querySelector("#chore-list")
  let newChoreForm = document.querySelector("#new-chore-form")
  newChoreForm.addEventListener("submit", postNewChore)
  fetchChores()

  function fetchChores(){
    fetch("http://localhost:3000/chores")
    .then(res => res.json())
    .then(chores => addChoresOnDOM(chores))
  }

  function addChoresOnDOM(chores){
    chores.forEach(chore => putChoreOnDOM(chore))
  }

  function putChoreOnDOM(chore){
    let choreDiv = document.createElement('div')
    choreDiv.className = "chore-card"
    choreDiv.innerHTML = `<button class="delete-button" data-id=${chore.id}>x</button>
    <h3>${chore.title}</h3>
    <p>${chore.duration}</p>
    <input value=${chore.priority} data-id=${chore.id}>`
    // can also use query selector to find the button to add event listener to

    // event delegation here:
    choreDiv.addEventListener("click", (e) => {
      if (e.target.className === "delete-button"){
        deleteAChore(e.target.dataset.id)
        e.target.parentElement.remove()
      }
      // this will delete chore and remove from DOM
    })
    choresDiv.append(choreDiv)

    // not using event delegation
    let input = choreDiv.querySelector("input")
    input.addEventListener("blur", (e) => {
      let choreID = e.target.dataset.id
      fetch(`http://localhost:3000/chores/${choreID}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
        priority: e.target.value
      })
      })
      .then(console.log)
      // this will edit chore priority
    })
  }

  function postNewChore(e){
    e.preventDefault()
    let title = e.target.title.value
    let priority = e.target.priority.value
    let duration = e.target.duration.value
    fetch("http://localhost:3000/chores", {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title,
        priority,
        duration
      })
    })
    .then(res => res.json())
    .then(chore => putChoreOnDOM(chore))
    // save to backend
    // show on front-end
  }

  function deleteAChore(id){
    console.log("id", id)
    fetch(`http://localhost:3000/chores/${id}`, {
      method: "DELETE"
    })
  }
})
