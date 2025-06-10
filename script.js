<script>
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

function calculateZenstoresPrice(orders) {
  const planA = 79 + orders * 0.07;
  const planB = 159 + orders * 0.04;
  return Math.min(planA, planB);
}

function calculateAll() {
  const orders = parseInt(document.getElementById('orders').value);
  const aov = parseFloat(document.getElementById('aov').value) || 0;

  const grossMargin = 0.5;
  const hourlyWage = 12;
  const errorRate = 0.005;
  const conversionRate = 0.03;
  const conversionUplift = 0.10;

  const errorCost = orders * errorRate * aov * grossMargin;
  const inefficiencyCost = 3 * 30 * hourlyWage;
  const upliftOrders = orders * conversionRate * conversionUplift;
  const missedRevenue = upliftOrders * aov * grossMargin;

  const total = errorCost + inefficiencyCost + missedRevenue;

  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();

  const zenPrice = calculateZenstoresPrice(orders);
  document.getElementById('zenstoresPrice').textContent = zenPrice.toFixed(2);
}

// Initialize on page load
updateOrderValue();
</script>
