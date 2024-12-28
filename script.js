const myLibrary = []; //Will contain Book Objects

function Book(title,author,numPages,read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;

}

function addBookToLibrary(title,author,numPages,read) {
  // do stuff here
  //THIS should call Book() to create a book object then push to the array
    newBook  = new Book(title,author,numPages,read);
    myLibrary.push(newBook);
    return newBook;
}


function getBook(title) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].title === title) {
      console.log("found book");
      return myLibrary[i];
    }
  }
  // If no match is found, optionally return something (like null or undefined)
  return null;
}


addBookToLibrary("The Fault in Our Stars", "John Green", 313, true);
addBookToLibrary("Game of Thrones", "George R.R. Martin", 694, false);
addBookToLibrary("Atomic Habits", "James Clear", 306, true);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);


const books = document.querySelector("#books");

//Function to add a card to the grid
function addCardToGrid(title,author,numPages, index,  read) {
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
      book = getBook(cardTitle.textContent);
      console.log(book.title);
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

//Add the default books to library
myLibrary.forEach(element => {
  addCardToGrid(element.title, element.author, element.numPages, myLibrary.indexOf(element), element.read);
});


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

  book = addBookToLibrary(getTitle.value,getAuthor.value,getNumPages.value)
  addCardToGrid(getTitle.value,getAuthor.value,getNumPages.value, myLibrary.indexOf(book), truth);
  favDialog.close(getTitle.value); // Have to send the select box value here.
});
