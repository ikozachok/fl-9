// Your code goes here
const amount = parseFloat(prompt('Enter amount of money', 0));
const discount = parseFloat(prompt('Enter discount', 0));

if (amount >= 0 && discount <= 100) {
  const total = Math.round(amount * (1 - discount/100) * 100)/100;
  const saved = Math.round((amount - total)*100)/100;
  console.log(
    'Price without discount: ' + amount + '\r\n' +
    'Discount: ' + discount + '%\r\n' +
    'Price with discount: ' + total + '\r\n' +
    'Saved: ' + saved
  );
} else {
  console.log('Invalid data');
}
