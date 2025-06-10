function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

function calculateZenstoresPrice(orders) {
  // Plan A: £79 + £0.07 per shipment
  const planA = 79 + orders * 0.07;
  // Plan B: £159 + £0.04 per shipment
  const planB = 159 + orders * 0.04;

  return Math.min(planA, planB);
}

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

  // Update display
  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(total).toLocaleString();

  // Zenstores pricing
  const zenPrice = calculateZenstoresPrice(

