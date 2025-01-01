const books = document.querySelector("#books");

class Book{
  title;
  author;
  numPages;
  read;

  constructor(title,author,numPages,read){
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.read = read;
  }
  
}

class library{
  myLibrary = []; //Will contain Book Objects

  addBookObject(book){
    this.myLibrary.push(book);
    return book;
  }

  addBookToLibrary(title,author,numPages,read) {
    // do stuff here
    //THIS should call Book() to create a book object then push to the array
    const newBook = new Book(title,author,numPages,read)
    this.myLibrary.push(newBook);
    return newBook;
  }

  getBook(title) {
    for (let i = 0; i < this.myLibrary.length; i++) {
      if (this.myLibrary[i].title === title) {
          return this.myLibrary[i];
      }
    }
    return null;    // If no match is found, optionally return something (like null or undefined)
  }

  addCardToGrid(title,author,numPages, index,  read) {
    const div = document.createElement("div");
      div.setAttribute("class", "card");
      div.setAttribute("id", index);
      const cardTitle = document.createElement("h1");
      cardTitle.setAttribute("class", "cardTitle");
      cardTitle.textContent = title ;
      const cardAuthor = document.createElement("h4");
      cardAuthor.textContent = author;
      const cardPages = document.createElement("p");
      cardPages.textContent =  numPages + " pages";
  
      const readBook = document.createElement("p");
      readBook.textContent = "Read Book: "  + read;
  
      const changeBookStatus = document.createElement("button");
      changeBookStatus.setAttribute("class", "changeFromRead");
  
      if (read == true){
        changeBookStatus.textContent = "Read";
      }
      else{
        changeBookStatus.textContent = "Not Read";
  
      }
  
      changeBookStatus.addEventListener("click", (e) =>{
        console.log(cardTitle.textContent);
        console.log('1');
        const Book = librar.getBook(cardTitle.textContent);
        console.log(Book.title);
        if (Book.read == true){
          changeBookStatus.textContent = "Not read";
          Book.read = false;
  
        }
        else{
          changeBookStatus.textContent = "Read";
          Book.read = true;
    
        }
  
      });
  
      const eraseButton = document.createElement("button");
      eraseButton.setAttribute("id","eraseCard");
      eraseButton.textContent="Remove";
  
      eraseButton.addEventListener("click", (e) =>{
        const getCard = document.getElementById(index);
        books.removeChild(getCard);
      });
  
      div.appendChild(cardTitle);
      div.appendChild(cardAuthor)
  
      div.appendChild(cardPages);
  
      div.appendChild(readBook);
      div.appendChild(changeBookStatus);
  
      div.appendChild(eraseButton);
  
      books.append(div);
  
  }
  
//Add the default books to library grid
  addAllBooks(){
    console.log("here");
    this.myLibrary.forEach(element => {
      this.addCardToGrid(element.title, element.author, element.numPages, this.myLibrary.indexOf(element), element.read);
    });
  }

  getIndex(book){
    return this.myLibrary.indexOf(book);
  }
}



librar = new library();


librar.addBookToLibrary("The Fault in Our Stars", "John Green", 313, true);
librar.addBookToLibrary("Game of Thrones", "George R.R. Martin", 694, false);
librar.addBookToLibrary("Atomic Habits", "James Clear", 306, true);
librar.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
librar.addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);


librar.addAllBooks(); //Add all books in one go

//Modal pop up below

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");

const getTitle = favDialog.querySelector("#title");
const getAuthor = favDialog.querySelector("#author");
const getNumPages = favDialog.querySelector("#numPages");

const getRead = favDialog.querySelector("select");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  // outputBox.value =
  //   favDialog.returnValue === "default"
  //     ? "No return value."
  //     : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  truth = true;
  if (getRead.value == "no"){
    truth = false;
  }
  book = new Book(getTitle.value,getAuthor.value,getNumPages.value, truth)
  librar.addBookObject(book);
  librar.addCardToGrid(getTitle.value,getAuthor.value,getNumPages.value, librar.getIndex(book), truth);
  favDialog.close(getTitle.value); // Have to send the select box value here.
});
