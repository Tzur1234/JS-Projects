const ui = new UI();
const wth = new Weather("34.5", "31");

//
const cancle = document.getElementById("cansle");
cancle.addEventListener("click", ui.clearAlert());

// Get weather when DOM load
document.addEventListener("DOMContentLoaded", getForcast(true));

this.save_changes = document.querySelector(".modal-footer");
this.save_changes.addEventListener("click", function (e) {
  console.log(e.target.id === "cansle");
  getForcast(false);
  e.preventDefault();
});

function getForcast(x) {
  // OnLoad ?
  let lat, lon;
  // Check if this is the first time
  if (x) {
    lat = "31";
    lon = "34.5";
  } else {
    // Fetch results
    lat = document.getElementById("latitude").value;
    lon = document.getElementById("longitude").value;
  }

  // validate
  if (lat === "" || lon === "") {
    ui.showAlert("must fill all fields !", "alert alert-danger");
  } else {
    // fetch API
    wth.getForcast(lon, lat).then((obj) => {
      // show results
      ui.showResults(obj.currently, obj.timezone);
      if (!x) {
        ui.showAlert("Changes Saved !", "alert alert-success", function () {
          setTimeout(ui.clearAlert(), 3000);
        });
      }
    });
  }
}
