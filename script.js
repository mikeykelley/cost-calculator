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

  const totalSavings = errorCost + inefficiencyCost + missedRevenue;

  // Update displayed costs
  document.getElementById('errorsCost').textContent = Math.round(errorCost).toLocaleString();
  document.getElementById('timeCost').textContent = Math.round(inefficiencyCost).toLocaleString();
  document.getElementById('missedRevenue').textContent = Math.round(missedRevenue).toLocaleString();
  document.getElementById('total').textContent = Math.round(totalSavings).toLocaleString();

  // Calculate and update Zenstores pricing
  const zenPrice = calculateZenstoresPrice(orders);
  document.getElementById('zenstoresPrice').textContent = zenPrice.toFixed(2);

  // Calculate ROI multiplier: totalSavings / zenPrice, minimum 0, rounded to 1 decimal
  let roi = zenPrice > 0 ? totalSavings / zenPrice : 0;
  roi = roi < 0 ? 0 : roi;
  document.getElementById('roiMultiplier').textContent = roi.toFixed(1);
}

// Set event listeners after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  const ordersInput = document.getElementById('orders');
