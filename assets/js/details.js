const userParams = new URLSearchParams(window.location.search);
const contact = userParams.get("userId");
const containerdiv = document.getElementById("container");
let contactDetail = [];
let user = [];
let delUser = {
  contactId: `${contact}`,
};
let newUser = [];
let updateData = [];

function contactDetails() {
  let httpRequest = new XMLHttpRequest();
  console.log(contact);
  let userUrl = `https://api.contact.techup.me/contact/single?id=${contact}`;

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      contactDetail = JSON.parse(this.response);
      console.log(contactDetail);
      generateContactDetails();
    }
  };

  httpRequest.open("GET", userUrl);
  httpRequest.send();
}

function generateContactDetails() {
  containerdiv.innerHTML = "";
  let detailCard = document.createElement("div");
  detailCard.className = "card";
  detailCard.innerHTML += ` <img class="card-img-top profile-img rounded-circle" src="${contactDetail.photo}" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">${contactDetail.firstName} ${contactDetail.lastName}</h5>
          <p class="card-text">
            Mobile Phone: ${contactDetail.mobilePhone}
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">email: ${contactDetail.email}</li>
          <li class="list-group-item">gender: ${contactDetail.gender}</li>
          <li class="list-group-item">Category: ${contactDetail.category}</li>
        </ul>
        <div class="card-body">
          
        </div>`;
  containerdiv.append(detailCard);
}

function deleteContact() {
  let httpRequest = new XMLHttpRequest();
  let delUrl = `https://api.contact.techup.me/contact/delete?id=${contact}`;

  httpRequest.onreadystatechange = function () {
    console.log("4");
    if (this.readyState === 4 && this.status === 200) {
      delUser = JSON.parse(this.response).items;
      console.log(delUser);
      goHome();
    }
  };

  httpRequest.open("POST", delUrl);
  httpRequest.setRequestHeader("Content-Type", "application/json");
  httpRequest.send(JSON.stringify(delUser));
}

function goHome() {
  window.location.href = "./index.html";
}

// function editDetails() {}

function createContact() {
  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      newUser = JSON.parse(this.response);
      console.log("New User", newUser);
      goHome();
    }
  };

  httpRequest.open("POST", "https://api.contact.techup.me/contact/create");
  httpRequest.setRequestHeader("Content-Type", "application/json");
  let newUser = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    mobilePhone: document.getElementById("mobilePhone").value,
    email: document.getElementById("email").value,
    userId: "9FsF7WheXAGgXAN42ta1GQ==",
  };
  httpRequest.send(JSON.stringify(newUser));
}

// function editContact() {
//   let httpRequest = new XMLHttpRequest();
//   console.log("1");
//   httpRequest.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       updateUser = JSON.parse(this.response);
//       console.log("New User", updateUser);
//     }
//     console.log("2");
//   };

//   httpRequest.open("POST", "http://api.contact.techup.me/contact/update");
//   httpRequest.setRequestHeader("Content-Type", "application/json");
//   let updateUser = {
//     firstName: document.getElementById("firstName").value,
//     lastName: document.getElementById("lastName").value,
//     mobilePhone: document.getElementById("mobilePhone").value,
//     email: document.getElementById("email").value,
//     userId: `${contact}`,
//   };
//   httpRequest.send(JSON.stringify(updateUser));
// }

function updateContact() {
  let httpRequest = new XMLHttpRequest();

  httpRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(updateData);
      updateData = JSON.parse(this.response);
      goHome();
    }
  };

  httpRequest.open("POST", "https://api.contact.techup.me/contact/update", true);

  httpRequest.setRequestHeader("Content-Type", "application/json");

  let updateData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    mobilePhone: document.getElementById("mobilePhone").value,
    email: document.getElementById("email").value,
    category: document.getElementById("category").value,
    userId: "9FsF7WheXAGgXAN42ta1GQ==",
    contactId: `${contact}`,
  };

  httpRequest.send(JSON.stringify(updateData));
}
