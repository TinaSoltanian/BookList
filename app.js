// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI elements
class UI {
  addToBookList(newBook) {
    const tbody = document.getElementById("book-list");
    const tr = document.createElement("tr");

    tr.innerHTML = `<td>${newBook.title}</td>
                    <td>${newBook.author}</td>
                    <td>${newBook.isbn}</td>
                    <td><a href="#" class='delete'>X</a></td>`;

    tbody.appendChild(tr);
  }

  // clears are inputs
  clearFields() {
    document.getElementById("author").value = "";
    document.getElementById("title").value = "";
    document.getElementById("isbn").value = "";
  }

  // alert messages
  alert(message, type) {
    let div = document.createElement("div");
    div.className = `alert ${type}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");

    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  // Delete book from list
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    books.forEach(function(book) {
      console.log(book);
      const ui = new UI();
      ui.addToBookList(book);
    });
  }  

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index){
     if(book.isbn === isbn) {
      books.splice(index, 1);
     }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

}

// Display books
document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listener for add book
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const newBook = new Book(title, author, isbn);

  const ui = new UI();

  // Validate inputs al of them are required
  if (title == "" || author == "" || isbn == "") {
    ui.alert("Please fill in all fields", "error");
  } else {
    ui.addToBookList(newBook);
    Store.addBook(newBook);
    ui.alert("Added successfully", "success");

    ui.clearFields();    
  }

  e.preventDefault();
});

// Event listener for deleting book
document.getElementById("book-list").addEventListener("click", function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  
  ui.alert("Deleted successfully", "success");

  e.preventDefault();
});


// if (document.readyState === 'loading') {

//     document.addEventListener("DOMContentLoaded", Store.displayBooks);
//   } else {
//     console.log("document is already ready, just execute code here");
//     Store.displayBooks;
//   }