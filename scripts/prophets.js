const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphets() {
  const response = await fetch(url);
  const data = await response.json();
  displayProphets(data.prophets);
}
getProphets();

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
  let card = document.createElement("section");
  card.classList.add("card");
    let fullname = document.createElement("h2");
    let portrait = document.createElement("img");
    let birthdate = document.createElement("p")
    let birthplace = document.createElement("p")

    fullname.textContent = `${prophet.name} ${prophet.lastname}`;

    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname} `);
    portrait.setAttribute("loading", "lazy");
   

    birthdate.textContent = ` Date of Birth: ${prophet.birthdate} `;
    birthplace.textContent = `Place of Birth:  ${prophet.birthplace} `;

    card.appendChild(fullname);
    card.appendChild(birthdate);
    card.appendChild(birthplace);
    card.appendChild(portrait);
   


    cards.appendChild(card);
  });
};
