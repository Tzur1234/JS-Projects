// Init Gitgub obj
const git = new Github();

// Init UI obj
const ui = new UI();


// add event 
const searchUser = document.querySelector('#searchUser');

searchUser.addEventListener('keyup', e => {
    const userText = e.target.value;

    if(userText !== ''){
        git.getUser(userText).then(data => {
            // console.log(data.profile.message);

            if(data.err){
                // Show alert
    
                ui.showAlert('User Not Found', 'alert alert-danger');
            }else{
                // show data using UI
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    }
    else{
        // Clear all results
        ui.clearProfile();
    }
    
    e.preventDefault()
});
