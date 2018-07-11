$.getJSON("/all", function(data) {
  //for each entry of that json
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    //append each news item's properties to the table
    $("#results").append(
      "<tr><td>" +
        data[i].title +
        "</td>" +
        "<td>" +
        data[i].summary +
        "</td>" +
        "<td>" +
        data[i].url +
        "</td>"
    );
  }
});

$("#articledelete").on("click", function() {
  $("#results").empty();
  $("#results").append(
    "<tr><td>" +
      data[i].title +
      "</td>" +
      "<td>" +
      data[i].summary +
      "</td>" +
      "<td>" +
      data[i].url +
      "</td>"
  );

  //prepend the newest saved article
  $("#articlesave").on("click", function() {
    // $("#results").empty(); //dont know if we need to empty results first?
    $("#results").prepend(
      "<tr><td>" +
        data[i].title +
        "</td>" +
        "<td>" +
        data[i].summary +
        "</td>" +
        "<td>" +
        data[i].url +
        "</td>"
    );
  });
});
