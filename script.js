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

  const errorCost = orders * errorRate * aov * grossMargin;

  // Dynamic inefficiency cost: 1.5 minutes saved per order
  const timeSavedPerOrderHours = 1.5 / 60;
  const inefficiencyCost = orders * timeSavedPerOrderHours * hourlyWage;

  const upliftOrders = orders * conversionRate * conversionUplift;
  const missedRevenue = upliftOrders * aov * grossMargin;

  const total = errorCost + inefficiencyCost + missedRevenue;

  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();
}

updateOrderValue();
