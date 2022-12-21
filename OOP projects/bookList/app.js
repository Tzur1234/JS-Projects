// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
// USe for managing UI Elements
function UI() {}

// Add book:
UI.prototype.addBook = function (book) {
  // get the row element
  const tbody = document.getElementById("book-list");

  // creat a new element
  const tr = document.createElement("tr");
  tr.innerHTML = `<th>${book.title}</th> <th>${book.author}</th> <th>${book.isbn}</th> <th> <a href="#" class="delete">X</a></th>`;

  // Append new tr tbody
  tbody.appendChild(tr);
};

// Delete Input fields:
UI.prototype.deleteInput = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Show alert
UI.prototype.showAlert = function(msg, className){
    // create div element
    const div = document.createElement('div');

    //Add the message to div
    div.appendChild(document.createTextNode(msg, className));

    //add className to div 
    div.className = `alert ${className}`;
    
    // Get the primery div
    const container = document.querySelector('.container');
    
    //Get the form Element
    const form = document.querySelector('#book-form');

     //
     console.log(container, form );
    
    // add the alert message
    container.insertBefore(div,form);
    
    // remove div
    setTimeout(function(){document.querySelector('.alert').remove();}, 2500);
}






// Add event "delegation" for deleting book
document.getElementById("table").addEventListener("click", function (e) {
    const ui = new UI()
    
  if (e.target.className === "delete") {
    e.target.parentElement.parentElement.remove();
    ui.showAlert('Remove complited !', 'success');
  }
  e.preventDefault();
});

// Add event for submit form
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get the values

  const title = document.getElementById("title"),
    author = document.getElementById("author"),
    isbn = document.getElementById("isbn");

  // Create UI object
  const ui = new UI();

  

  // Validation
  if (title.value === "" || author.value === "" || isbn.value === "") {
        // show alert
        ui.showAlert(`You must fill all the feilds !`, 'error');
  } 
  else {
    // Create book object
    const book = new Book(title.value, author.value, isbn.value);

    // Called UI AddBook function:
    ui.addBook(book);

    // show alert
    ui.showAlert(`Book was added !`, 'success');

    // Cleat input fileds
    ui.deleteInput();
  }

  e.preventDefault();
});
