class Github {
  constructor() {
    this.client_id = "f27d96f736090586c397";
    this.client_secrets = "4fe06428a04111386fc0c81ff8764c54e5632e1c";
    this.repo_count = 5;
    this.repos_sort = "created: asc";
  }

  // Fetch userData
  async getUser(user) {
    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

      const repoResponse = await fetch(
        `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`
      );

      const profile = await profileResponse.json();
      const repos = await repoResponse.json();

      return {
        profile,
        repos,
      };
    } catch (err) {
      //   return { err };
      console.log(error);
    }
  }
}
