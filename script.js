function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value, 10) || 0;
  document.getElementById('orderValue').textContent = orders;
  calculateAll();
}

function calculateAll() {
  const orders = parseInt(document.getElementById('orders').value, 10) || 0;
  const aov = parseFloat(document.getElementById('aov').value) || 0;

  const grossMargin = 0.5;
  const hourlyWage = 12;
  const errorRate = 0.005;
  const conversionRate = 0.03;
  const conversionUplift = 0.10;

  // Calculate fulfilment error cost
  const errorCost = orders * errorRate * aov * grossMargin;

  // Calculate inefficiency cost: 1.5 minutes saved per order converted to hours
  const timeSavedPerOrderHours = 1.5 / 60;
  const inefficiencyCost = orders * timeSavedPerOrderHours * hourlyWage;

  // Calculate missed revenue from uplifted orders
  const upliftOrders = orders * conversionRate * conversionUplift;
  const missedRevenue = upliftOrders * aov * grossMargin;

  // Total estimated cost
  const total = errorCost + inefficiencyCost + missedRevenue;

  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();
}

// Initialize on page load
updateOrderValue();
