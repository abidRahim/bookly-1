( function() {
  var books = [
    'The Lord of the Rings',
    'A Game of Thrones',
    'To Kill a Mockingbird',
    'Angels and Demons'
  ];

  const ulElm = document.querySelector('.books');
  const addBtn = document.querySelector('#add-book button');
  const hide = document.querySelector('#hide');
  const searchBox = document.querySelector('#search-books input');


  function displayBook(arr, elm) {
    elm.innerHTML = arr.map((book, index) => {
      return (
        `<li>
          <label data-id=${index} class="name subname">${book}</label>
          <span data-id=${index} class="delete">Delete</span>
        </li>`
      );
    }).join('');
  }

  function addBook(e) {
    const bookName = document.querySelector('#book-value');
    books.push(bookName.value);
    displayBook(books, ulElm);
    bookName.value = "";
  }

  function hideBooks(e){
    e.target.checked ? displayBook([], ulElm) : displayBook(books, ulElm)
  }

  function deleteBook(e){
    if(e.target.className !== 'delete') return;
    const id = e.target.dataset.id;
    books.splice(id, 1);
    displayBook(books, ulElm);
  }

  function searchBooks(e) {
    const searchTerm = e.target.value.toLowerCase();
    const filteredBooks = books.filter(book => book.toLowerCase().includes(searchTerm));
    displayBook(filteredBooks, ulElm);
  }

  function updateBookName(bookName, id){
    books[id] = bookName;
    displayBook(books, ulElm);
  }

  function editBook(e) {
    if(!e.target.classList.contains('name')) return;
    const id = e.target.dataset.id;
    const parent = e.target.parentNode;
    var labelNode = e.target;
    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('input-text');
    input.value = books[id];
    parent.replaceChild(input, labelNode);
    input.focus();
    input.addEventListener('blur', (e) => {
      parent.replaceChild(labelNode, input);
      updateBookName(e.target.value, id);
    });
    input.addEventListener('keyup', (e) => {
      if(e.keyCode === 13){
        updateBookName(e.target.value, id);
      }
    });
  }



  displayBook(books, ulElm);

  addBtn.addEventListener('click', addBook);
  hide.addEventListener('change', hideBooks);
  ulElm.addEventListener('click', deleteBook);
  ulElm.addEventListener('dblclick', editBook);
  searchBox.addEventListener('keyup', searchBooks);
})();
