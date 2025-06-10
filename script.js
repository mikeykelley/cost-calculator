// Update displayed orders and recalc
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

// Calculate the cheapest Zenstores plan price
function calculateZenstoresPrice(orders) {
  // Plan A: £79 + £0.07 per shipment
  const planA = 79 + orders * 0.07;
  // Plan B: £159 + £0.04 per shipment
  const planB = 159 + orders * 0.04;

  return Math.min(planA, planB);
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

  // 2. Cost of inefficiencies - 3 minutes per order
  const inefficiencyMinutes = orders * 3;
  const inefficiencyHours = inefficiencyMinutes / 60;
  const inefficiencyCost = inefficiencyHours * hourlyWage;

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
document.getElementById('zenstoresPrice').textContent = Math.round(zenPrice).toLocaleString();

  // Calculate and update ROI multiplier = savings / price (rounded 1 decimal)
  let roi = 0;
  if (zenPrice > 0) {
    roi = totalSavings / zenPrice;
  }
  document.getElementById('roiMultiplier').textContent = roi.toFixed(1) + 'x';
}

// Set event listeners after DOM loads
window.addEventListener('DOMContentLoaded', () => {
  const ordersInput = document.getElementById('orders');
  const aovInput = document.getElementById('aov');

  ordersInput.addEventListener('input', updateOrderValue);
  aovInput.addEventListener('input', calculateAll);

  // Initialize values on load
  updateOrderValue();
});
