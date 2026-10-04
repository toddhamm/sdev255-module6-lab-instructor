// event listener, triggers when dom is loaded (when page is loaded)
addEventListener("DOMContentLoaded", async function() {

	// load courses into ul
	try {

		// response from server

		// local host / dev
		// const response = await fetch("http://localhost:3000/api/courses");
		// to run on local server: npx http-server -p 8080

		// live
		const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses");

		if (!response.ok) {
	    	throw new Error(`HTTP error! Status: ${response.status}`);
	    }

		// course list as promise
		const courses = await response.json();
		
		// get the ul element
		const ul = document.querySelector('#ul-courses');

		// extract data from promise using foreach 
		courses.forEach(course => {

			// debug
			// console.log(song.title, song.artist);

			// create li element
			const li = document.createElement('li');

			// add the course name + edit and delete buttons
			li.textContent = `${course.name} - `;

			// create a tag
			const a = document.createElement("a");

			a.href = "edit_course.html?id="+course._id;
			a.textContent = "Edit";

			// view detail
			li.appendChild(a);

			const space = document.createTextNode(" ");

			// add some space
			li.appendChild(space);

			// delete course
			const d = document.createElement("a");

			d.href = "delete_course.html?id="+course._id;
			d.textContent = "Delete";
			d.classList.add('delete-link');
			li.appendChild(d);

			// append to the ul
			ul.append(li);

		});

	} catch (error) {
    	console.error('Failed to fetch courses:', error);
 	}

 	// delete a course
 	// this is copied from module 6 songs tutorial and modified for the final project
	// this is a modified example from google search
	// problem: this only works once; second delete doesn't work...
	document.querySelectorAll('.delete-link').forEach(link => {
	  link.addEventListener('click', async function(event) {
	    
	    //  Prevent the browser from navigating to the URL
	    event.preventDefault(); 
	    
	    //alert('link clicked...');

	    // get the full absolute URL from the clicked link
		const href = this.href; 

		// create a URL object and extract the 'id' parameter
		const urlObj = new URL(href);
		const songID = urlObj.searchParams.get('id');

		// send request to api
	    try {
	      //  Send the HTTP DELETE request
	      
	      // dev
	      // let url = "http://localhost:3000/api/courses/";
	      
	      // live
	      let url = "https://sdev-module5-tutorial.onrender.com/api/courses/";

	      const response = await fetch(url + songID, {
	        method: 'DELETE',
	        headers: {
	          'Content-Type': 'application/json'
	          // Add Authorization tokens here if required
	        }
	      });

	      if (response.ok) {
	      	// show deleted message

	      	// add success message
			const successDiv = document.getElementById("success");
			
			// Replace its contents with text
			successDiv.textContent = "Course deleted!";

			// show div
			successDiv.style.display = "block";

			// remove all li from the ul
			const list = document.getElementById("ul-courses");

			// Clear all contents
			list.innerHTML = "";

			// refresh the course list
			try {

				// response from server

				// local host / dev
				// const response = await fetch("http://localhost:3000/api/courses");
				// to run on local server: npx http-server -p 8080

				// live
				const response = await fetch("https://sdev-module5-tutorial.onrender.com/api/courses");

				if (!response.ok) {
			    	throw new Error(`HTTP error! Status: ${response.status}`);
			    }

				// course list as promise
				const courses = await response.json();
				
				// get the ul element
				const ul = document.querySelector('#ul-courses');

				// extract data from promise using foreach 
				courses.forEach(course => {

					// debug
					// console.log(song.title, song.artist);

					// create li element
					const li = document.createElement('li');

					// add the course name + edit and delete buttons
					li.textContent = `${course.name} - `;

					// create a tag
					const a = document.createElement("a");

					a.href = "edit_course.html?id="+course._id;
					a.textContent = "Edit";

					// view detail
					li.appendChild(a);

					const space = document.createTextNode(" ");

					// add some space
					li.appendChild(space);

					// delete course
					const d = document.createElement("a");

					d.href = "delete_course.html?id="+course._id;
					d.textContent = "Delete";
					d.classList.add('delete-link');
					li.appendChild(d);

					// append to the ul
					ul.append(li);

				});

			} catch (error) {
		    	console.error('Failed to fetch courses:', error);
		 	}

	      } else {
	        // error; show error msg
	        const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${response.error}`;
		
			// show div
			errorDiv.style.display = "block";
	      }
	    } catch (error) {
	        // show error message

	    	const errorDiv = document.getElementById("error");

			// update error div text
			errorDiv.textContent = `Error: ${error}`;
		
			// show div
			errorDiv.style.display = "block";
	    }
	  });
	});

});