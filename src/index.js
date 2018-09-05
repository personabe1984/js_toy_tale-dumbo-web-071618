document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      const newToyForm = document.querySelector(".add-toy-form");
      newToyForm.addEventListener("submit", () => {
        const newToyName = document.getElementsByName("name")[0];
        const newToyImage = document.getElementsByName("image")[0];

        //console.log(newToyImage.value);
        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            "name": newToyName.value,
            "image": newToyImage.value,
            "likes": 0
          })
        }).then(res => res.json())
          .then(data => renderOutToys);

      });
    } else {
      toyForm.style.display = 'none'
    }
  })

  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then( data => {
    data.forEach(renderOutToys)
  })

  function renderOutToys(toy){
    const card = document.querySelector("#toy-collection");

    const name = toy.name;
    const image = toy.image;
    const likes = toy.likes;
    const toyCard = document.createElement("div");
    toyCard.className = "card";
    toyCard.innerHTML =
      `<h2>${name}</h2>
      <img src=${image} class="toy-avatar">
      <p>${likes} Likes <p>
      <button class="like-btn">Like <3</button>`

    card.append(toyCard);


  }

  const likeButton = document.querySelector(".like-btn");

  likeButton.addEventListener("click", (event) => {
    //we need to get the current value and increment it by one
    // We also need to update it on the server.
    console.log(event.target);
    //event.target
  })

});
