//wait for document (DOM) to load
$(document).ready(() => {
  //add click event to modal button
  $("#modal-button").click(() => {
    //reset body contents to be empty
    $(".modal-body").html("");
    $.get(`/api/courses`, (results = {}) => {
      //Fetch course data via an AJAX GET request.
      let data = results.data;
      if (!data || !data.courses) return;
      //Fetch course data via an AJAX GET request.
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<span class="course-cost">$${course.cost}</span>
						<button class="${course.joined ? "joined-button" : "join-button"} btn btn-info btn-sm" data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
      });
    }).then(() => {
      //Call addJoinButtonListener to add an event listener on the course listing
      addJoinButtonListener();
    });
  });
});

let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
      courseId = $button.data("id");
			console.log(`/api/courses/${courseId}/join`)
      //Make an API call to join the selected course.
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        $button
          .text("Joined")
          .addClass("joined-button")
          .removeClass("join-button");
      } else {
        $button.text("Try again");
      }
    });
  });
};
