// Update displayed orders and recalc
function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders.toLocaleString();
  calculateAll();
}

// Calculate the cheapest Zenstores plan price
function calculateZenstoresPrice(orders) {
  const planA = 79 + orders * 0.07;
  const planB = 159 + orders * 0.04;
  return Math.min(planA, planB);
}

// Determine persona tier and message based on orders
function getPersonaMessage(orders) {
  if (orders < 2000) {
    return `<strong>Startup Tier</strong>: You're running a startup-level business, focusing on establishing your operations and optimizing early growth. Zenstores can help automate key tasks and reduce errors as you scale.`;
  } else if (orders < 10000) {
    return `<strong>Growing Tier</strong>: Your business is growing steadily. With more orders to manage, efficiency and error prevention are crucial. Zenstores provides scalable tools to support your expanding team and processes.`;
  } else {
    return `<strong>Scaling Tier</strong>: You operate at enterprise scale with high order volumes. Zenstores offers advanced automation and insights to maximize ROI and keep fulfilment seamless at scale.`;
  }
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
  const errorLoss = orders * errorRate * aov * grossMargin;

  // 2. Cost of manual time saved (3 minutes/order = 0.05 hour/order)
  const timeSaved = orders * 0.05 * hourlyWage;

  // 3. Missed revenue from delivery uplift
  const baseRevenue = orders * aov;
  const upliftedRevenue = baseRevenue * conversionRate * conversionUplift * grossMargin;

  // Total savings
  const totalSavings = errorLoss + timeSaved + upliftedRevenue;

  // Zenstores cost
  const zenstoresCost = calculateZenstoresPrice(orders);

  // ROI
  const roi = zenstoresCost > 0 ? totalSavings / zenstoresCost : 0;

  // Update DOM
  document.getElementById('errorsCost').textContent = errorLoss.toFixed(0);
  document.getElementById('timeCost').textContent = timeSaved.toFixed(0);
  document.getElementById('missedRevenue').textContent = upliftedRevenue.toFixed(0);
  document.getElementById('total').textContent = totalSavings.toFixed(0);
  document.getElementById('zenstoresPrice').textContent = zenstoresCost.toFixed(0);
  document.getElementById('roiMultiplier').textContent = roi.toFixed(1) + 'x';

  // Persona message
  document.getElementById('personaMessage').innerHTML = getPersonaMessage(orders);
}

// Event listeners
document.getElementById('orders').addEventListener('input', updateOrderValue);
document.getElementById('aov').addEventListener('input', calculateAll);

// Initial calculation
updateOrderValue();
