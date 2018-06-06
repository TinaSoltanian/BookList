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

  clearFields(){
    document.getElementById('author').value ='';
    document.getElementById('title').value ='';
    document.getElementById('isbn').value ='';
  }

  alert(message, type){

    let div = document.createElement('div');
    div.className = `alert ${type}`;

    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');

    container.insertBefore(div, form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
  }
}

// Event Listener
document.getElementById("book-form").addEventListener("submit", function(e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const newBook = new Book(title, author, isbn);
  console.log(newBook);

  const ui = new UI();

  // Validate inputs al of them are required
  if (title == '' || author =='' || isbn == ''){
    ui.alert('Please fill in all fields','error');
  }
  else
  {
    ui.addToBookList(newBook);
    ui.alert('Added successfully','success');
  }

  ui.clearFields();

  e.preventDefault();
});
