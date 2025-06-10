// Cache DOM elements for performance
const ordersInput = document.getElementById('orders');
const aovInput = document.getElementById('aov');
const orderValueDisplay = document.getElementById('orderValue');
const errorsCostDisplay = document.getElementById('errorsCost');
const timeCostDisplay = document.getElementById('timeCost');
const missedRevenueDisplay = document.getElementById('missedRevenue');
const totalDisplay = document.getElementById('total');
const zenstoresPriceDisplay = document.getElementById('zenstoresPrice');

function calculateZenstoresPrice(orders) {
  // Plan A: £79 + £0.07 per shipment
  const planA = 79 + orders * 0.07;
  // Plan B: £159 + £0.04 per shipment
  const planB = 159 + orders * 0.04;

  return Math.min(planA, planB);
}

function calculateAll() {
  const orders = parseInt(ordersInput.value) || 0;
  const aov = parseFloat(aovInput.value) || 0;

  orderValueDisplay.textContent = orders.toLocaleString();

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

  errorsCostDisplay.textContent = Math.round(errorCost).toLocaleString();
  timeCostDisplay.textContent = Math.round(inefficiencyCost).toLocaleString();
  missedRevenueDisplay.textContent = Math.round(missedRevenue).toLocaleString();
  totalDisplay.textContent = Math.round(total).toLocaleString();

  const zenPrice = calculateZenstoresPrice(orders);
  zenstoresPriceDisplay.textContent = zenPrice.toFixed(2);
}

// Add event listeners
ordersInput.addEventListener('input', calculateAll);
aovInput.addEventListener('input', calculateAll);

// Initial calculation
calculateAll();
