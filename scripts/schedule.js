// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	// get courses in student's schedule, load into elements
	try {

		// response from server

		// local host / dev
		// const response = await fetch("http://localhost:3000/api/studentCourses");
		// to run on local server: npx http-server -p 8080

		// live
		const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/studentCourses");

		if (!response.ok) {
		    throw new Error(`HTTP error! Status: ${response.status}`);
		}

		// course list as promise
		const courses = await response.json();

		// get the ul element
		const ul = document.querySelector('#ul-schedule');

		// get course name from related table
		courses.forEach(course => {

			// this is from a google example showing how to extract the course name value from the promise

			// get the course data, then run promise chain
			
			// dev
			// let url = 'http://localhost:3000/api/courses/';
			
			// live
			let url = 'https://sdev-module5-tutorial.onrender.com/api/courses/';

			// dev
			fetch(url + course.courseId)
			.then(response => response.json()) // Extracts the JSON promise
			  .then(jsonData => {

			    // create li element
				const li = document.createElement('li');

				// add course name to li text content
			    li.textContent = `${jsonData[0].name}`;

				// append to the ul
				ul.append(li);

			  })
			  .catch(error => console.error("Error:", error)); // error

		});

	} catch (error) {
		console.error('Failed to fetch student courses:', error);
	}
});