"use strict";

window.addEventListener("load", function(){
  // Retrieve the field/value pairs from the URL
  var formData = location.search.slice(1); //Extracts a substring starting with the second character
  //Replaces every "+" with a blank space
  formData = formData.replace(/\+/g," ");
  // Decodes the text string in formData, replacing URI character codes with char strings
  formData = decodeURIComponent(formData);
  // Splits the data at every occurrence of an "&" and "=" character
  var formFields = formData.split(/[&=]/g);
  // Write the field values to the order form
  document.forms.order.elements.orderDate.value = formFields[1];
  document.forms.order.elements.bouquetName.value = formFields[6];
  document.forms.order.elements.qty.value = formFields[7];
  document.forms.order.elements.initialCost.value = formFields[9];
  document.forms.order.elements.subtotal.value = formFields[17];
  document.forms.order.elements.salesTax.value = formFields[19];
  document.forms.order.elements.totalCost.value = formFields[21];
});

window.addEventListener("load", function() {
  // Calls the runSubmit function when the "Submit Payment" button is clicked
  document.getElementById("subButton").onclick = runSubmit;
  // Calls the validateName function when the user inputs data into the cardName field
  document.getElementById("cardName").oninput = validateName;
  // Calls validateNumber function when the user inputs data into the cardNumber field
  document.getElementById("cardNumber").oninput = validateNumber;
 // Calls validateMonth when the user changes the select option in the expMonth and expYear selection lists
  document.getElementById("expMonth").onchange = validateMonth;
  document.getElementById("expYear").onchange = validateYear;
 // Calls validateCVC when the user changes the field value
  document.getElementById("cvc").oninput = validateCVC;
});

// Runs when the user clicks the Submit button
function runSubmit() {
  validateName();
  validateCredit();
  validateNumber();
  validateMonth();
  validateYear();
  validateCVC();
}

// Create a reference to the CVC field and extract the value fo the currently selected credit card
function validateCVC() {
  var cardCVC = document.getElementById("cvc");
  var creditCard = document.querySelector('input[name="credit"]:checked').value;
// Test whether a CVC number was entered and if so, whether it is valid for the credit card type
  if (cardCVC.validity.valueMissing) {
    cardCVC.setCustomValidity("Enter your CVC number");
    } else if ((creditCard === "amex") &&
    (/^\d{4}$/.test(cardCVC.value) === false)) {
      cardCVC.setCustomValidity("Enter a 4-digit CVC number");
    } else if ((creditCard !== "amex") &&
    (/^\d{3}$/.test(cardCVC.value) === false)) {
        cardCVC.setCustomValidity("Enter a 3-digit CVC number");
    } else {
  cardCVC.setCustomValidity("");
  }
}
// Create a custom validation message for card expiration month and year
function validateMonth() {
  var cardMonth = document.getElementById("expMonth");
  if (cardMonth.selectedIndex === 0) {
      cardMonth.setCustomValidity("Select the expiration month");
  } else {
      cardMonth.setCustomValidity("");
  }
}
function validateYear() {
  var cardYear = document.getElementById("expYear");
  if (cardYear.selectedIndex === 0) {
      cardYear.setCustomValidity("Select the expiration year");
  } else {
      cardYear.setCustomValidity("");
  }
}// Tests for a pattern mismatch
// Create a custom validation message for card number
function validateNumber() {
  var cardNumber = document.getElementById("cardNumber");
  if (cardNumber.validity.valueMissing) {
      cardNumber.setCustomValidity("Enter your card number");
  } else if (cardNumber.validity.patternMismatch) {
      cardNumber.setCustomValidity("Enter a valid card number");
  } else if (luhn(cardNumber.value) === false) {
      cardNumber.setCustomValidity("Enter a legitimate card number");
  } else {
      cardNumber.setCustomValidity("");
  }
}
// Create a custom validation message for credit card type
function validateCredit() {
  var creditCard = document.forms.payment.elements.credit[0];
  // Tests whether the first option button is missing a value
  if (creditCard.validity.valueMissing) {
    creditCard.setCustomValidity("Select your credit card");
  } else {
  // No error message is displayed if credit card is selected
    creditCard.setCustomValidity("");
  }
}
// Create a custom validation message for Name
function validateName() {
  var cardName = document.getElementById("cardName");
  if (cardName.validity.valueMissing) {
    cardName.setCustomValidity("Enter your name as it appears on the card");
  } else {
    cardName.setCustomValidity(""); // Always include a custom validation message with an
                                   //empty text string for fields that pass the validation test
  }
}
// Functions to ensure credit card number is legitimate
function sumDigits(numStr) {
  var digitTotal = 0;
  for (var i = 0; i < numStr.length; i++) {
    digitTotal += parseInt(numStr.charAt(i));
  }
  return digitTotal;
}

function luhn(idNum) {
  var string1 = "";
  var string2 = "";
// Retrieve the odd-numbered digits
for (var i = idNum.length - 1; i >= 0; i-=2) {
  string1 += idNum.charAt(i);
}
// Retrieve the even-numbered digits and double them
for (var i= idNum.length - 2; i >= 0; i-= 2) {
  string2 += 2*idNum.charAt(i);
}
// Return whether the sum of the digits is divisible by 10
return sumDigits(string1 + string2) % 10 === 0;
}
