// Add event listener to form
const form = document.getElementById("loan-form");
form.addEventListener("submit", function (e) {
  // Hide the results
  document.getElementById("results").style.display = "none";
  // Show spiner loading
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 1000);

  e.preventDefault();
});

// Calculate the result from the form

function calculateResults() {
  console.log("Calculating...");
  // Get UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  // UI out put elements
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // Convert the string value to Float
  const principal = parseFloat(amount.value);
  // Comvert the interest from % to number per month
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  // Get the number of **monthes**
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Validate if the number is finite
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2); // סך התשלום החודשי
    totalPayment.value = (monthly * calculatedPayments).toFixed(2); // סך ההלוואה
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2); // סך הריבית

    // Show the results
    document.getElementById("results").style.display = "block";
    // Hide spiner loading
    document.getElementById("loading").style.display = "none";
  } else {
    // Probably there is some problem with the input
    showError("Please check out your numbers");
    // Hide spiner loading
    document.getElementById("loading").style.display = "none";
  }
}

function showError(msg) {
  // Create a new div
  const errorDiv = document.createElement("div");

  // Set div className to alert message
  errorDiv.className = "alert alert-danger";

  // Append Text Node to errorDiv element
  errorDiv.appendChild(document.createTextNode(msg));

  // Bring the card and the heading element
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Insert errorDiv Element before heading Element
  // Using : insertBefore

  card.insertBefore(errorDiv, heading);

  // call clearMsg function after 3 seconds
  setTimeout(clearMsg, 3000);
}

function clearMsg() {
  document.querySelector(".alert").remove();
}
