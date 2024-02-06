 // Function to dynamically populate the contact table
 function populateContactTable() {
     var contactTableBody = document.querySelector('#contactTable tbody');
     contactTableBody.innerHTML = ''; // Clear existing content

     Contact.ContactList.forEach(function(contact) {
         var row = document.createElement('tr');
         row.innerHTML = `
            <td>${contact.firstName}</td>
            <td>${contact.lastName}</td>
            <td>${contact.phoneNumber}</td>
            <td>${contact.email}</td>
            <td>${contact.dateOfBirth}</td>
            <td><button onclick="updateContact(${contact.phoneNumber})">Edit</button></td>
        `;
         contactTableBody.appendChild(row);
     });
 }

 // Call the function to populate the table when the page loads
 populateContactTable();