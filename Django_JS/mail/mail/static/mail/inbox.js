document.addEventListener('DOMContentLoaded', function () {
  
 

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // add eventListener for press send button
  document.querySelector('#compose-form').addEventListener('submit', send_email);


   // By default, load the inbox
   load_mailbox('inbox');

});

// Add event listener to all 'view' button
document.querySelectorAll('.view-button').forEach(button => {
  button.addEventListener('click', console.log('click'));
});


  function change_archivestatus(bool, email_id){
  console.log(`Change to status: ${bool}`)
  console.log(`The email to change status to: ${email_id}`)
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
        archived: bool
    })
  }).then(()=> {
    if(bool){
      alert("Mail was archvied", 'alert alert-success');
      }
      else{
        alert("Mail was Unarchvied", 'alert alert-success')
      }
  })
  .then(()=> load_mailbox('inbox'));

}


function view_email(email_id, e) {
  console.log(email_id);
  // Show email view and hide other views
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  // Set mail as was read 
  fetch(`/emails/${email_id}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  })

  // fetch API
  fetch(`/emails/${email_id}`)
    .then(response => response.json())
    .then(email => {
      // Print email
      console.log(email);


      // check if archive
      if (email.archived === true) {
        archive_button = "Unarchive"
        archive_class = "btn btn-secondary unarchive-button"       
      }
      else {
        archive_button = "Archive"
        archive_class = "btn btn-primary archive-button"        
      }
        

        // card-heade
        div_card_head = document.createElement('div');
        div_card_head.setAttribute("class", "card-header")
        div_card_head.innerHTML = `${email.timestamp}`

        
        // card-title
        h5 = document.createElement('h5');
        h5.setAttribute("class", "card-title")
        h5.innerHTML = `Subject: ${email.subject}`

        // card-text2
        p1 = document.createElement('p');
        p1.setAttribute("class", "card-text")
        p1.innerHTML = `From: ${email.sender}`

        // card-text2
        p2 = document.createElement('p');
        p2.setAttribute("class", "card-text")
        p2.innerHTML = `Recipients: ${email.recipients}`

        // card-text1
        p3 = document.createElement('p');
        p3.setAttribute("class", "card-text")
        p3.innerHTML = `Message: ${email.body}`

        // card-button-archive
        button1 = document.createElement('input');
        button1.setAttribute("type", "button")
        button1.setAttribute("class", archive_class)
        button1.setAttribute("value", archive_button)
        // Event listner
        button1.addEventListener('click', function(e){
          if(e.target.className === `${archive_class}`){
            change_archivestatus(!(email.archived),email.id)
          }
        });

        //card-button-reply
        button2 = document.createElement('input');
        button2.setAttribute("type", "button")
        button2.setAttribute("class", "btn btn-primary")
        button2.setAttribute("value", "Reply")
        button2.setAttribute("style", "margin-left: 200px;")

        // Event listner
        button2.addEventListener('click', function(e){
          if(e.target.value === `Reply`){
            // send to compose window with the neccessary parameters
            compose_email(email.sender, email.subject, 
              `//////////////////////////////             
              On: ${email.timestamp} 
              ${email.sender} wrote:  ${email.body}               
//////////////////////////////`);
              
          }
        });



        // card-body
        div_card_body = document.createElement('div');
        div_card_body.setAttribute("class", "card-body")
        div_card_body.append(h5)
        div_card_body.append(p1)
        div_card_body.append(p2)
        div_card_body.append(p3)
        div_card_body.append(button1)
        div_card_body.append(button2)

        // card
        div_card = document.createElement('div');
        div_card.setAttribute("class", "card")
        div_card.append(div_card_head)
        div_card.append(div_card_body)

        // delete previous innerHTML
        document.querySelector('#email-view').innerHTML = '';

        // insert new HTML
      document.querySelector('#email-view').appendChild(div_card);
      
    });

}

function compose_email(recipient, subject, body) {


  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  if(body != undefined){
    document.querySelector('#compose-recipients').value = `${recipient}`;
    document.querySelector('#compose-subject').value = `${subject}`;
    document.querySelector('#compose-body').value = `${body}`;

  }
  else{
    document.querySelector('#compose-recipients').value = "";
    document.querySelector('#compose-subject').value = "";
    document.querySelector('#compose-body').value = "";

  }
  
}

function load_mailbox(mailbox) {

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';



  // fetch API
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => createHTMList(emails))
    .then(listHtml => {
      // Show the mailbox name
      document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

      // Add html to emails-view tag
      document.querySelector('#emails-view').innerHTML += listHtml;     
    })
}

// create HTMl of all emails
async function createHTMList(emails) {
  
  list = `<ul class="list-group">`;
  emails.forEach(element => {
    // set background
  if(element.read === true){
    card_body_class = "card-body text-secondary"
    status_read = "(was read)";
  }
  else {
    card_body_class = 'card-body'
    status_read = "(wasn't read)"
  }
    list += `<li class="list-group-item">
                <div class="card">
                  <div class="card-header">
                    ${element.timestamp}
                    <h9>${status_read}</h9>
                  </div>
                  <div class="${card_body_class}">
                    <h5 class="card-title">Subject: ${element.subject}</h5>
                    <p class="card-text">From: ${element.sender}</p>               
                    <a style="color: white;" onclick="view_email(${element.id})" data-id="${element.id}" class="btn btn-primary view-button">View</a>                 
                  </div>
              </div>
          </li>`
  });
  list += `</ul>`;
  return list;

}


// send an email
function send_email(event) {

  let recipients = document.querySelector('#compose-recipients').value;
  let subject = document.querySelector('#compose-subject').value;
  let body = document.querySelector('#compose-body').value;


  // Validation
  if (recipients === '') {
    alert("Must fill recipients", 'alert alert-danger')

  }

  // trim all of the spaces in the recipients field
  recipients = recipients.replace(/\s+/g, '');


  // fetch API 
  // fetchEmails_POST returns status code and message    
  fetchEmails_POST(recipients, subject, body)
    .then(results => {
      if (results.status === 400) {
        scroll(0, 0) // push the user up     
        alert(results.message.error, 'alert alert-danger');
      }
      else {
        alert(results.message.message, 'alert alert-success');
        // load mailbox 'sent'
        load_mailbox('sent')
      }
    });
  event.preventDefault();
}

// fetch API (fetch emails)
// return JS object with message + status code
async function fetchEmails_POST(recipients, subject, body) {

  const response = await fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
      recipients: recipients,
      subject: subject,
      body: body
    })
  })

  const results = {
    message: await response.json(),
    status: response.status
  }
  return results
}



// Show alert in layout.html for 3,000 seconds
function alert(msg, type) {

  // clear all existing alerts
  clearAlerts()

  // Create new Element
  const div = document.createElement('div');
  // set class attribute
  div.setAttribute('class', type)
  // set inside message
  div.innerHTML = msg
  // append the div to DOM
  document.querySelector('.show-alert').append(div);


  // Delete the message after 3 seconds
  setTimeout(() => { div.remove() }, 5000)
}

function clearAlerts() {
  const div = document.querySelector('.alert');
  if (div) {
    div.remove()
  }
}



