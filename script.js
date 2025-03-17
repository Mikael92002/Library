const myLibrary = [];
const body = document.querySelector("body");
const newBookButton = document.querySelector("#new-book");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-button");
const cancelBookButton = document.querySelector("#cancel-button");
const grid = document.querySelector("#book-container-grid");
let bookIterator = 0;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        this.read = !this.read;
    }
    this.id = crypto.randomUUID();
}

Book.prototype.readToggle = function() {
    if(this.read == true){
        this.read = false;
    }
    else this.read = true;
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}



newBookButton.addEventListener("click", () => {
    dialog.showModal();
})

addBookButton.addEventListener("click", (e) => {
    const inputTitle = document.querySelector("#title");
    const inputAuthor = document.querySelector("#author");
    const inputPages = document.querySelector("#pages");
    let readRadio = document.getElementsByName("read");



    let read = "";
    for (let i = 0; i < readRadio.length; i++) {
        if (readRadio[i].checked) {
            if (readRadio[i].value === "yes") {
                read = true;
            }
            else read = false;
        }
    }

    addBookToLibrary(inputTitle.value, inputAuthor.value, inputPages.value, read);

    let lastIndex = myLibrary.length - 1;

    bookDisplayContainer = document.createElement("div");
   
    bookDisplayContainer.style.borderLeft = "1px solid red";
    bookDisplayContainer.setAttribute("data-id", myLibrary[lastIndex]["id"]);
    bookDisplayContainer.style.borderRadius = "20px";
    bookDisplayContainer.style.padding = "10px";
    bookDisplayContainer.style.backgroundColor = "rgb(239, 239, 239)";
    titlePar = document.createElement("p");
    authorPar = document.createElement("p");
    pagePar = document.createElement("p");
    readPar = document.createElement("p");
    titlePar.textContent = "Title: " + myLibrary[lastIndex]["title"];
    authorPar.textContent = "Author: " + myLibrary[lastIndex]["author"];
    pagePar.textContent = "No. of pages: " + myLibrary[lastIndex]["pages"];
    readPar.textContent = read ? "Read: Yes":"Read: No";

    let removeBookButton = document.createElement("button");
    removeBookButton.textContent = "Remove";
    removeBookButton.id = "remove-button";
    removeBookButton.setAttribute("data-id", myLibrary[lastIndex]["id"]);
    
    let changeReadStatus = document.createElement("button");
    changeReadStatus.textContent = "Change read status";
    changeReadStatus.id = "change-button";
    changeReadStatus.setAttribute("data-id", myLibrary[lastIndex]["id"]);

    bookDisplayContainer.addEventListener("click", (event) =>{
        target = event.target;

        if(target.id === "remove-button"){
            let bookToBeRemoved = target.getAttribute("data-id");
            
            for(let child of grid.children){
                
                if(child.getAttribute("data-id") === bookToBeRemoved){
                    grid.removeChild(child);
                }
            }
            for(let i = 0;i<myLibrary.length;i++){
                if(myLibrary[i]["id"] === bookToBeRemoved){
                    myLibrary.splice(i, 1);
                }
            }
        }
        if(target.id === "change-button"){
            let bookStatusToBeChanged = target.getAttribute("data-id");

            for(let book of myLibrary){
                if(book.id === bookStatusToBeChanged){
                    book.readToggle();
                }
            }

            for(let child of grid.children){
                if(child.getAttribute("data-id") === bookStatusToBeChanged){
                    if(child.children[3].textContent === "Read: Yes") child.children[3].textContent = "Read: No";
                    else child.children[3].textContent = "Read: Yes";
                }
            }
        }
    })
    

    bookDisplayContainer.append(titlePar);
    bookDisplayContainer.append(authorPar);
    bookDisplayContainer.append(pagePar);
    bookDisplayContainer.append(readPar);
    bookDisplayContainer.append(removeBookButton);
    bookDisplayContainer.append(changeReadStatus);

    grid.append(bookDisplayContainer);




    e.preventDefault();
    dialog.close();


})