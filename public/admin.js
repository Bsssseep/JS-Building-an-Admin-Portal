async function getBooks() {
  let response = await fetch("http://localhost:3001/listBooks");
  let books = await response.json();

  books.forEach(renderBook);
}

function renderBook(book) {
  console.log(book);
  let bookContainer = document.getElementById("box");
  let bookElement = document.createElement("ul");
  bookElement.innerHTML = `
      <li>${book.title}</li>
      <input value="${book.quantity}">
      <button id="button-${book.id}" type="submit">Save</button>
  `;
  bookContainer.appendChild(bookElement);

  const button = document.getElementById(`button-${book.id}`);

  button.addEventListener("click", async () => {
      const response = await fetch("http://localhost:3001/updateBook", {
          method: "PATCH",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: book.id,
              quantity: bookElement.querySelector("input").value,
          }),
      });
      let updatedBook = await response.json();
  });
}

getBooks();