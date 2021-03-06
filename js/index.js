// Saqlangan kontaktlarni arrayga saqlash uchun
var contacts = [];

// HTML elementlarni JSga chaqirib olish
var elNewContactForm = $_(".js-new-contact-form");
var elNewContactNameInput = $_(
  ".js-new-contact-form__name-input",
  elNewContactForm
);
var elNewContactSurnameInput = $_(
  ".js-new-contact-form__surname-input",
  elNewContactForm
);
var elNewContactNumberInput = $_(
  ".js-new-contact-form__contact-input",
  elNewContactForm
);
var elNewContactRelationshipInput = $_(
  ".js-new-contact-form__relationship-input",
  elNewContactForm
);
var elContacts = $_(".contacts");

var elRemoveBtn = $_(".btn-remove-js");

elRemoveBtn.addEventListener('click', function () {
  contacts.splice(parseInt(this.value), 1);
  renderContactsList();
});

var createContactObject = function (name, surname, number, relationship) {
  return {
    // name: name,
    // surname: surname,
    // number: number,
    // relationship: relationship,
    name,
    surname,
    number,
    relationship,
  };
};

var renderContactsList = function () {
  elContacts.innerHTML = "";

  for (var i = 0; i < contacts.length; i++) {
    var newLiContact = createElement("li", "contact__item list-group-item");
    var newDivFullnameWrapper = createElement(
      "div",
      "contact__fullnameWrapper d-flex justify-content-between",
    );
    var newDivFullname = createElement(
      "div",
      "contact__fullname d-inline-block",
      `${contacts[i].name} ${contacts[i].surname}`
    );
    var remove = createElement('button', 'js-remove-button  btn px-3 fs-6 text-white bg-danger',"X");
    remove.type = 'button';
    remove.value = i;



    remove.addEventListener('click', function () {
      contacts.splice(parseInt(this.value), 1);
      renderContactsList();
    });
    
    var newDivRelationship = createElement(
      "div",
      "contact__relationship small",
      contacts[i].relationship
    );
    var newDivNumber = createElement(
      "a",
      "contact__phone-number",
      contacts[i].number
    );
    newDivNumber.href = `tel:${contacts[i].number}`;
    newLiContact.appendChild(newDivFullnameWrapper);
    newDivFullnameWrapper.appendChild(newDivFullname);
    newDivFullnameWrapper.appendChild(remove);
    newLiContact.appendChild(newDivRelationship);
    newLiContact.appendChild(newDivNumber);

    elContacts.appendChild(newLiContact);

    
  }
};

var clearInputFields = function () {
  elNewContactNameInput.value = "";
  elNewContactSurnameInput.value = "";
  elNewContactNumberInput.value = "";
  elNewContactRelationshipInput.value = "";

  elNewContactNameInput.focus();
};

elNewContactNameInput.focus();

elNewContactForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  var name = elNewContactNameInput.value.trim();
  var surname = elNewContactSurnameInput.value.trim();
  var number = elNewContactNumberInput.value.trim();
  var relationship = elNewContactRelationshipInput.value.trim();

  contacts.push(createContactObject(name, surname, number, relationship));

  clearInputFields();
  renderContactsList();
});
