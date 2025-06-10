function animateValue(id, start, end, duration = 500) {
  const obj = document.getElementById(id);
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.round(start + range * progress);
    obj.textContent = value.toLocaleString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}


function updateOrderValue() {
  const orders = parseInt(document.getElementById('orders').value);
  document.getElementById('orderValue').textContent = orders;
  calculateAll();
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

  animateValue('errorsCost', Number(document.getElementById('errorsCost').textContent.replace(/,/g, '')), errorCost);
animateValue('timeCost', Number(document.getElementById('timeCost').textContent.replace(/,/g, '')), inefficiencyCost);
animateValue('missedRevenue', Number(document.getElementById('missedRevenue').textContent.replace(/,/g, '')), missedRevenue);
animateValue('total', Number(document.getElementById('total').textContent.replace(/,/g, '')), total);

}

updateOrderValue();
