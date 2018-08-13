document.addEventListener("DOMContentLoaded", () => {
	const choreList = document.querySelector('#chore-list')
	const choreForm = document.querySelector('#new-chore-form')
	const addButton = document.querySelector('#submit-btn')
	console.log(addButton)
	addButton.addEventListener("click", onSubmit)
	// console.log(deleteButton)
	// const choreList = document.getElementById('chore-list')


	fetch('http://localhost:3000/chores')
	.then(res => res.json())
	.then(data => {
		data.forEach(chore => {
			let choreDiv = document.createElement('div')
			choreDiv.innerHTML = `<button class="delete-button">X</button>
			<p>call method to delete</>
			<h3>${chore.title}</h3>
			<p>${chore.duration}</p>
			<p>${chore.priority}</p>`
			choreDiv.className = 'chore-card'
			choreDiv.setAttribute("data-id", chore.id)
			choreList.appendChild(choreDiv)

		})
	})
	.then(() => {
		const deleteButtons = document.querySelectorAll('.delete-button')
		deleteButtons.forEach(button => {
			button.addEventListener("click", (e) => {
				console.log("event", e.target.parentElement)
				e.target.parentElement.remove()
					let choreID = e.target.parentElement.getAttribute('data-id')
					console.log("choreID", choreID)
					fetch(`http://localhost:3000/chores/${choreID}`, {
				method:"DELETE"})
			})
		})
	})

	function onSubmit(){
		console.log("SUBMIT")
		fetch('http://localhost:3000/chores', {
		method: 'POST',
		// headers:{
  //         Accept: 'applicaton/json',
  //         'Content-Type': 'application/json'
  //       },
		body: JSON.stringify({
			title: document.querySelector('#title').value,
			priority: document.querySelector('#priority').value,
			duration: document.querySelector('#duration').value
		})
	})
	// .then(res => res.json())
	// .then(data => console.log(data))
	// .then(data => {
	// 	data.forEach(chore => {
	// 		let choreDiv = document.createElement('div')
	// 		choreDiv.innerHTML = `<button class="delete-button">X</button>
	// 		<p>call method to delete</>
	// 		<h3>${chore.title}</h3>
	// 		<p>${chore.duration}</p>
	// 		<p>${chore.priority}</p>`
	// 		choreDiv.className = 'chore-card'
	// 		choreDiv.setAttribute("data-id", chore.id)
	// 		choreList.appendChild(choreDiv)

	// 	})
	// })

	}




})