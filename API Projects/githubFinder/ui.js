class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  // Show user profile
  showProfile(user) {
    this.profile.innerHTML = `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2" src="${user.avatar_url}">
              <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/Blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
            </div>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
      `;
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }

  // Clear all exist alerts
  clearAlert() {
    const curentAlert = document.querySelector(".alert");
    if (curentAlert) {
      curentAlert.remove();
    }
  }

  showAlert(msg, cls) {
    // Clear any remaining alerts
    this.clearAlert();

    // Create div
    const div = document.createElement("div");
    // Add class to div
    div.className = cls;

    // Add text to div
    div.appendChild(document.createTextNode(msg));

    // get the primary container
    const container = document.querySelector(".container.searchContainer");

    // get the search div
    const search = document.querySelector(".search");

    container.insertBefore(div, search);

    // Clear the alert after 3 seconds
    setTimeout(this.clearAlert(), 3000);
  }

  showRepos(repos) {
    let output = "";

    repos.forEach(function (repo) {
      output += `
        <div class="card card-body mb-2">
          <div class="row">
            <div class="col-md-6">
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            </div>
            <div class="col-md-6">
            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
            </div>
          </div>
        </div>
      `;
    });

    // Output repos
    document.getElementById("repos").innerHTML = output;
  }
}
