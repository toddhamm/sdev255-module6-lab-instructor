addEventListener("DOMContentLoaded", async function () {

	// get url params
	const urlparam = new URLSearchParams(window.location.search);

	// id from url
	const courseID = urlparam.get('id');

	//console.log(songID);

	// get course data from api
	// dev
	// const response = await fetch("http://localhost:3000/api/courses/" + courseID);

	// live
	const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses/" + courseID);

	// await json
	const course = await response.json();

	// console.log(song);

	// insert values into form fields
	document.getElementById("name").value=course[0].name;
	document.getElementById("courseID").value=courseID;

	// get the form 
	const form = document.getElementById('editCourseForm');

	// update form
	// form was submitted
	form.addEventListener('submit', async (e) => {

		// prevent form from submitting 
		e.preventDefault();

		// from google: get form fields by their "name" attributes
		const formData = new FormData(form);

		// from google: Convert FormData to a regular JSON object
		const data = Object.fromEntries(formData.entries());

		// dev
		// let url = "http://localhost:3000/api/updateCourse";
		
		// live
		let url = "https://sdev-module5-tutorial.onrender.com/api/updateCourse";

		// attempt to post form to api end point (google example is very similar to video example)
		try {
			const response = await fetch(url, {
			method: 'PUT',
				headers: {
					'Content-Type': 'application/json' 
				},
				body: JSON.stringify(data)
			});

			// await api response
			const result = await response.json();

			// response is ok
			if (response.ok) {	

				// add success message
				const successDiv = document.getElementById("success");
				
				// does not work
				// change success div class
				// successDiv.classList.add("alert alert-success");

				// Replace its contents with text
				successDiv.textContent = "Course updated! ID: " + result._id;

				// show div
				successDiv.style.display = "block";

				// responseMessage.textContent = `Success: ${result.message}`;

				// reset the form
				// form.reset(); 

			} else {
			
				// error
				// responseMessage.textContent = `Error: ${result.error}`;

				const errorDiv = document.getElementById("error");

				// does not work
				// change error div class
				// errorDiv.classList.add("alert alert-danger");

				// update error div text
				errorDiv.textContent = `Error: ${result.error}`;
			
				// show div
				errorDiv.style.display = "block";

			}

		} catch (error) {
			// try block failed...
			// console.error('Fetch error:', error);

			const errorDiv = document.getElementById("error");

			// change error div class
			// errorDiv.classList.add("alert alert-danger");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;

			// show div
			errorDiv.style.display = "block";

		}

	});

});