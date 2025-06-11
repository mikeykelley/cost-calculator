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
  const errorCost = orders

