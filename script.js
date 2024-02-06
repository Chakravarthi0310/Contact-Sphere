class Contact {
    constructor(firstName, lastName, phoneNumber, email, dateOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }
    static ContactList = new Map();

    static addContact(Contact) {
        this.ContactList.set(Contact.phoneNumber, Contact);
    }

    static getContacts() {
        return this.ContactList;
    }



    static saveData() {
        localStorage.setItem('ContactList', JSON.stringify([...this.ContactList.entries()]));
    }

    static loadData() {
        const storedData = localStorage.getItem('ContactList');
        if (storedData) {
            this.ContactList = new Map(JSON.parse(storedData));
        }
    }

}
Contact.loadData();

function isAlreadyExist(phoneNumber) {
    return Contact.ContactList.has(phoneNumber);
}

function addContactButton() {
    event.preventDefault();
    var FirstName = document.getElementById("FirstName").value;
    var LastName = document.getElementById("LastName").value;
    var PhoneNumber = document.getElementById("PhoneNumber").value;
    var Email = document.getElementById("Email").value;
    var DateOfBirth = document.getElementById("DOB").value;

    if (FirstName != '' && LastName != '' && PhoneNumber != '' && Email != '' && DateOfBirth != '') {
        var newContact = new Contact(
            FirstName,
            LastName,
            PhoneNumber,
            Email,
            DateOfBirth
        )

        if (isAlreadyExist(PhoneNumber)) {
            toastMessage("Contact with this phonenumber already exist");
        } else {
            Contact.addContact(newContact);
            Contact.saveData();
            toastMessage("Contact Added Successfully")
        }

    } else {
        toastMessage("Please fill all details")
    }


}

function getContactButton() {
    var SearchKey = document.getElementById("searchKey").value;

    if (isAlreadyExist(SearchKey)) {
        var Cont = Contact.ContactList.get(SearchKey);
        document.getElementById("FirstName").value = Cont.firstName;
        document.getElementById("LastName").value = Cont.lastName;
        document.getElementById("PhoneNumber").value = Cont.phoneNumber;
        document.getElementById("Email").value = Cont.email;
        document.getElementById("DOB").value = Cont.dateOfBirth;

    }


}



function toastMessage(message) {
    var toastdiv = document.getElementById("toaster");

    toastdiv.innerHTML = `<p>${message}</p>`;
    toastdiv.style.display = 'block';
    setTimeout(function() {
        toastdiv.style.display = 'none';
    }, 3000);
}


function searchContactButton() {
    event.preventDefault();
    var PhoneNumber = document.getElementById("searchKey").value;

    if (isAlreadyExist(PhoneNumber)) {
        var searchResult = document.getElementById("SearchResult");
        var resultContact = Contact.ContactList.get(PhoneNumber);
        document.getElementById("EditFirstName").value = resultContact.firstName;
        document.getElementById("EditLastName").value = resultContact.lastName;
        document.getElementById("EditPhoneNumber").value = resultContact.phoneNumber;
        document.getElementById("EditEmail").value = resultContact.email;
        document.getElementById("EditDOB").value = resultContact.dateOfBirth;
        toastMessage("Contact Found");
        searchResult.style.display = 'block';

    } else {
        document.getElementById("SearchResult").style.display = 'none';

        toastMessage("No Contact Found");
    }
    return false;
}

function updateContactButton() {
    event.preventDefault();
    var FirstName = document.getElementById("EditFirstName").value;
    var LastName = document.getElementById("EditLastName").value;
    var SearchKey = document.getElementById("searchKey").value;
    var Email = document.getElementById("EditEmail").value;
    var PhoneNumber = document.getElementById("EditPhoneNumber").value;
    var DateOfBirth = document.getElementById("EditDOB").value;

    var editedContact = new Contact(
        document.getElementById("EditFirstName").value,
        document.getElementById("EditLastName").value,
        document.getElementById("EditPhoneNumber").value,
        document.getElementById("EditEmail").value,
        document.getElementById("EditDOB").value
    )
    if (PhoneNumber != SearchKey) {
        if (isAlreadyExist(PhoneNumber)) {
            toastMessage("Contact with this phonenumber already exist");
        } else {
            Contact.ContactList.delete(SearchKey);
            Contact.addContact(editedContact);
            document.getElementById("SearchResult").style.display = 'none';
            Contact.saveData();
            toastMessage("Updated Successfully");
        }
    } else {
        Contact.addContact(editedContact);
        document.getElementById("SearchResult").style.display = 'none';
        Contact.saveData();
        toastMessage("Updated Successfully");

    }
}

function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

function updateContact(phoneNumber) {
    var editedContact = new Contact(
        document.getElementById(`fname${phoneNumber}`).value,
        document.getElementById(`lname${phoneNumber}`).value,
        phoneNumber.toString(),
        document.getElementById(`email${phoneNumber}`).value,
        document.getElementById(`dob${phoneNumber}`).value
    );

    Contact.addContact(editedContact);
    Contact.saveData();
    console.log(editedContact);
    toastMessage("Updated Successfully");
    populateContactTable();
}

function deleteContact(phoneNumber) {
    Contact.ContactList.delete(phoneNumber.toString());
    Contact.saveData();
    populateContactTable();
}