console.log("script.js loaded");

// Update order value display & recalc
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

// Main calculation function
function calculateAll() {
  const orders = parseInt(document.getElementById('orders').value);
  const aov = parseFloat(document.getElementById('aov').value) || 0;

  const grossMargin = 0.5;
  const hourlyWage = 12;
  const errorRate = 0.005; // 0.5%
  const conversionRate = 0.03;
  const conversionUplift = 0.10; // +10%

  // 1. Cost of fulfilment errors
  const errorCost = orders * errorRate * aov * grossMargin;

  // 2. Cost of inefficiencies (3 hrs/day * 30 days * £12)
  const inefficiencyCost = 3 * 30 * hourlyWage;

  // 3. Missed revenue from lower conversion
  const upliftOrders = orders * conversionRate * conversionUplift;
  const missedRevenue = upliftOrders * aov * grossMargin;

  const total = errorCost + inefficiencyCost + missedRevenue;

  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();

  // Show message box
  document.querySelector('.messages').style.display = 'block';

  showContextualBenefits(orders, errorCost, inefficiencyCost, missedRevenue);
  showCustomRecommendation(orders);
}

// Show contextual business benefits based on numbers
function showContextualBenefits(orders, errorCost, inefficiencyCost, missedRevenue) {
  const benefitsList = document.getElementById('contextualBenefits');
  benefitsList.innerHTML = ''; // clear previous

  // Benefit 1: Funded hires from error cost
  const hiresFunded = (errorCost / (hourlyWage * 8 * 30)).toFixed(1); // £12/hr, 8 hr/day, 30 days
  benefitsList.innerHTML += `<li>Fulfilment errors cost could fund approx. <strong>${hiresFunded}</strong> full-time hires/month.</li>`;

  // Benefit 2: Time saved equivalent in work hours
  const hoursSaved = (inefficiencyCost / hourlyWage).toFixed(0);
  benefitsList.innerHTML += `<li>Manual inefficiencies cost equal to about <strong>${hoursSaved}</strong> work hours/month.</li>`;

  // Benefit 3: Missed revenue equals lost customers approx
  const customersLost = (missedRevenue / (aov * grossMargin)).toFixed(0);
  benefitsList.innerHTML += `<li>Missed revenue equates to losing approx. <strong>${customersLost}</strong> customers/month.</li>`;
}

// Show custom recommendation based on order volume
function showCustomRecommendation(orders) {
  const rec = document.getElementById('customRecommendation');
  if (orders > 15000) {
    rec.textContent = "You're a high-volume shipper — consider our Enterprise automation tier for maximum savings!";
  } else if (orders > 5000) {
    rec.textContent = "Mid-volume business detected — automating some workflows could boost your ROI significantly.";
  } else {
    rec.textContent = "Great start! Even at this scale, small improvements can make a big difference.";
  }
}

// Attach event listeners
document.getElementById('orders').addEventListener('input', updateOrderValue);
document.getElementById('aov').addEventListener('input', calculateAll);

// Initialise on load
updateOrderValue();
