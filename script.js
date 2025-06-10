console.log("script.js loaded");

function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

function calculateAll() {
  const orders = parseInt(document.getElementById('orders').value);
  const aov = parseFloat(document.getElementById('aov').value) || 0;

  // Dummy calculations for quick test
  const errorCost = orders * 0.005 * aov * 0.5;
  const inefficiencyCost = 3 * 30 * 12;
  const missedRevenue = orders * 0.03 * 0.10 * aov * 0.5;
  const total = errorCost + inefficiencyCost + missedRevenue;

  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();

  // Show messages box
  document.querySelector('.messages').style.display = 'block';

  // Contextual benefits
  const hiresFunded = (errorCost / (12 * 8 * 30)).toFixed(1);
  const hoursSaved = (inefficiencyCost / 12).toFixed(0);
  const customersLost = (missedRevenue / (aov * 0.5)).toFixed(0);

  document.getElementById('contextualBenefits').innerHTML =
    `<li>Fulfilment errors could fund approx. <strong>${hiresFunded}</strong> full-time hires/month.</li>` +
    `<li>Inefficiencies equal about <strong>${hoursSaved}</strong> work hours/month.</li>` +
    `<li>Missed revenue equates to losing approx. <strong>${customersLost}</strong> customers/month.</li>`;

  // Custom recommendation
  if (orders > 15000) {
    document.getElementById('customRecommendation').textContent =
      "You're a high-volume shipper — consider our Enterprise automation tier for maximum savings!";
  } else if (orders > 5000) {
    document.getElementById('customRecommendation').textContent =
      "Mid-volume business detected — automating workflows could boost your ROI significantly.";
  } else {
    document.getElementById('customRecommendation').textContent =
      "Great start! Even at this scale, small improvements can make a big difference.";
  }
}

document.getElementById('orders').addEventListener('input', updateOrderValue);
document.getElementById('aov').addEventListener('input', calculateAll);

updateOrderValue();
