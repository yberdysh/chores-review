document.addEventListener("DOMContentLoaded", () => {
  const choresURL = "http://localhost:3000/chores"
  const choreList = document.getElementById("chore-list")
  let form = document.getElementById("new-chore-form")
  form.addEventListener("submit", createAChore)
  fetchChores()

  function fetchChores(){
    fetch(choresURL)
    .then(res => res.json())
    .then(renderChores)
  }

  function renderChores(chores){
    chores.forEach(chore => renderChore(chore))
  }

  function renderChore(chore){
    let newDiv = document.createElement("div")
    newDiv.className = "chore-card";
    newDiv.innerHTML = `<button class="delete-button" data-id="${chore.id}">X</button>
    <h3>${chore.title}</h3><p>${chore.duration}</p><input value="${chore.priority}"></input><button class="edit-button" id="${chore.id}">Edit</button>`
    choreList.append(newDiv)
    let deleteButton = document.querySelector(`button[data-id = "${chore.id}"]`)
    deleteButton.addEventListener("click", deleteChore)
    let editButton = document.getElementById(`${chore.id}`)
    editButton.addEventListener("click", editAChore)
  }

  function createAChore(event){
    event.preventDefault()
    let title = event.target.title.value
    let duration = event.target.duration.value
    let priority = event.target.priority.value
    console.log(title, duration, priority)
    let data = {
      // title: title
      title,
      duration,
      priority
    }
    fetch(choresURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(renderChore)
  }

    function deleteChore(event){
      let choreDiv = event.target.parentElement
      console.log(choreDiv)
      let id = event.target.getAttribute("data-id")
      fetch(choresURL + `/${id}`, {
        method: "DELETE",
        headers:{"Content-Type": "application/json"}
      })
      .then(choreDiv.remove())
    }

    async function editAChore(event){
      let choreDiv = event.target.parentElement
      let input = choreDiv.getElementsByTagName("input")[0]
      console.log(input)
      console.log(choreDiv)
      let id = event.target.getAttribute("id")
      console.log(id)
      event.preventDefault()
      let oldChore =  await fetch(choresURL + `/${id}`).then(res => res.json())
      let newChore = {...oldChore, priority: input.value}
      console.log("newCHore", newChore)
      console.log(oldChore)
      console.log("hitting edit")
      fetch(choresURL + `/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newChore)
      })
      // .then(res)
      // .then(console.log)
    }



})
