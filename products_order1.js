"use strict";

/*

   Function List
   =============

   calcOrder()
      Calculates the cost of the customer order

   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals

   formatUSACurrency(val)
      Formats val as U.S.A. currency

*/

window.addEventListener("load", function() {
  var orderForm = document.forms.orderForm;

// Display the current date
  orderForm.elements.orderDate.value = new Date().toDateString();

// Highlight the bouquet dropdown list on page load
  orderForm.elements.bouquet.focus();

// Calculate the cost of the order
  calcOrder();

// Event handlers for the web form (resets the form if user changes bouquet or quantity)
  orderForm.elements.bouquet.onchange = calcOrder;
  orderForm.elements.qty.onchange = calcOrder;

});

function calcOrder() {
  var orderForm = document.forms.orderForm;

  // Calculate the initial cost of the order
  var bIndex = orderForm.elements.bouquet.selectedIndex;
  var bCost = orderForm.elements.bouquet.options[bIndex].value;
  var qIndex = orderForm.elements.qty.selectedIndex;
  var quantity = orderForm.elements.qty[qIndex].value;

  // Initial cost x quantity
  var initialCost = bCost*quantity;
  orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

  // Calculate the sales tax
  var salesTax = 0.03 * initialCost;
  orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

  // Calculate the cost of the total order
  var totalCost = initialCost + salesTax;
  orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

  // Store the order details
  orderForm.elements.bouquetName.value = orderForm.elements.bouquet.options[bIndex].text;
}

// Function to format numeric values as a text string using local standards
function formatNumber(val, decimals) {
  return val.toLocaleString(undefined,
    {minimumFractionDigits: decimals,
     maximumFractionDigits: decimals});
}

// Function to format numeric values as U.S. currency
function formatUSCurrency(val) {
  return val.toLocaleString('en-US',
   {style: "currency", currency: "USD"});
}
