document.addEventListener("DOMContentLoaded", () => {
	const choreList = document.querySelector('#chore-list')
	const addButton = document.querySelector('#submit-btn')
	addButton.addEventListener("click", addChore)


	fetchAll()
	


	function fetchAll(){
		fetch('http://localhost:3000/chores')
		.then(res => res.json())
		.then(json => json.forEach((chore) => {
			let choreDiv = document.createElement('div')
			choreDiv.innerHTML = `<button class="delete-button">X</button>
			<h3>${chore.title}</h3>
			<h4>${chore.priority}</h4>
			<h5>${chore.duration}</h5>
			`
			// let deleteButton = document.querySelector('.delete-button')
			// deleteButton.addEventListener("click", () => {
			// 	fetch(`http://localhost:3000/chores/${chore.id}`, {
			// 		method: 'DELETE'
			// 	})
			// })

			choreDiv.classList.add('chore-card')
			choreDiv.dataset.id = chore.id
			// choreDiv.setAttribute('data-id', chore.id)
			choreList.appendChild(choreDiv)
		}))
		.then(() => {
			const deleteButtons = document.querySelectorAll('.delete-button')
			deleteButtons.forEach((deleteButton) => {
				deleteButton.addEventListener("click", (e) => {
					let id = e.target.parentElement.getAttribute('data-id')
					fetch(`http://localhost:3000/chores/${id}`, {
					method: 'DELETE'
				})
				e.target.parentElement.remove()
				})

			})
		})
	}

	function addChore(){
		fetch("http://localhost:3000/chores", {
			method: 'POST',
			headers:{
          		Accept: 'applicaton/json',
          		'Content-Type': 'application/json'
        	},
        	body: JSON.stringify({
        		title: document.querySelector('#title').value,
        		duration: document.querySelector('#duration').value,
        		priority: document.querySelector('#priority').value
        	})

		})
	}

})


