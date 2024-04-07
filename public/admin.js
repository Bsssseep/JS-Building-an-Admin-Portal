

async function displayBooks() {
    try {
      const response = await fetch('http://localhost:3001/admin');
      const books = await response.json();
  
      const booksContainer = document.querySelector('.books-container');
      booksContainer.innerHTML = '';
  
      books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
  
        const titleElement = document.createElement('h3');
        titleElement.textContent = book.title;
        bookDiv.appendChild(titleElement);
  
        const quantityInput = document.createElement('input');
        quantityInput.type = 'text';
        quantityInput.value = book.quantity;
        bookDiv.appendChild(quantityInput);
  
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', () => handleQuantityUpdate(book.id, quantityInput.value));
        bookDiv.appendChild(submitButton);
  
        booksContainer.appendChild(bookDiv);
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }
  

  async function handleQuantityUpdate(bookId, newQuantity) {
    try {
      const response = await fetch(`http://localhost:3001/updateQuantity/${bookId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });
  
      if (response.ok) {
        console.log(`Quantity updated for book with ID ${bookId}`);
      } else {
        console.error('Failed to update quantity:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  }
  

  displayBooks();
  