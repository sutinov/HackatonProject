let contacts = {
  userId: "9FsF7WheXAGgXAN42ta1GQ==",
  pageNumber: 4,
  pageSize: 20,
  sortColumn: "firstName",
  sortDirection: "asc",
};
let user = [];

const userCard = document.getElementById("container");

function getContacts() {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      contacts = JSON.parse(this.response).items;

      console.log("CONTACTS", contacts);
      generateCards();
    }
  };

  httpRequest.open("POST", "https://api.contact.techup.me/contact/list");
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send(JSON.stringify(contacts));
}

function generateCards() {
  userCard.innerHTML = "";
  for (let i = 0; i < contacts.length; i++) {
    contact = contacts[i];
    let contactCard = document.createElement("div");
    contactCard.className = "card";
    contactCard.innerHTML += `
        <div class="photo" style="background-image: url('${contact.photo}')"></div>
        <div class="banner"></div>
        <ul>
         <a href="./contact_details.html?userId=${contact.contactId}"> <li><b>${contact.firstName} ${contact.lastName}</b></li></a>
          <li>phone: ${contact.mobilePhone}</li>
          <li>email: ${contact.email}</li>
        </ul>
        <a href="./contact_details.html?userId=${contact.contactId}"><button class="contact" id="main-button">Open contact</button></a>
      </div>`;
    userCard.append(contactCard);
  }
}

function openContact() {
  window.location.href = `./contact_details.html?userId=${contact.contactId}`;
}
