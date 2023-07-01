$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    //Check that the data object contains course information
    $.get("/api/courses", (results = {}) => {
      let data = results.data;
      if (!data || !data.courses) return;
      //Loop through course data, and add elements to modal.
      data.courses.forEach(course => {
        $(".modal-body").append(
          `<div>
						<span class="course-title">
							${course.title}
						</span>
						<button class='button ${course.joined ? "joined-button" : "join-button"}' data-id="${course._id}">
							${course.joined ? "Joined" : "Join"}
						</button>
						<div class="course-description">
							${course.description}
						</div>
					</div>`
        );
        ////Add the button’s text to reflect join status.
      });
    }).then(() => {
      //Call addJoinButtonListener to add an event listener on your buttons after the AJAX request completes.
      addJoinButtonListener();
    });
  });
});

//Create the event listener for the modal button.
let addJoinButtonListener = () => {
  $(".join-button").click(event => {
    let $button = $(event.target),
    //Grab the button and button ID data.
      courseId = $button.data("id");
      //Make an AJAX request with the user’s ID to join.
    $.get(`/api/courses/${courseId}/join`, (results = {}) => {
      let data = results.data;
      if (data && data.success) {
        //Check whether the join action was successful, and modify the button.
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
