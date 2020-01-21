$("#submit_add").submit(() => {
  $("#addModal").modal("hide");
});

function fill(el) {
  let id = $(el).attr("id");
  if (id > 1) {
    console.log("id bigger than one");
    $(el)
      .prevAll()
      .each(function() {
        let newID = $(this).attr("id");
        $(this).replaceWith(`<span id='${newID}' class='fas fa-star'></span>`);
      });
  }
  $(el).replaceWith(`<span id='${id}' class='fas fa-star'></span>`);
}

function empty(el) {
  let id = $(el).attr("id");
  if (id < 5) {
    $(el)
      .nextAll()
      .each(function() {
        let newID = $(this).attr("id");
        $(this).replaceWith(`<span id='${newID}' class='far fa-star'></span>`);
      });
  }
}

$("#stars").on("click", ".fa-star", function starClick() {
  if ($(this).hasClass("far")) {
    fill($(this));
  } else if ($(this).hasClass("fas")) {
    empty($(this));
  }
});
