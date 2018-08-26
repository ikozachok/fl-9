function isPrime(x) {
  let isPrime = true;
  for (let i = x - 1; i > 1; i--) {
    if (x % i === 0) {
      isPrime = false;
    }
  }
  return isPrime;
}
console.log('5', isPrime(5));
console.log('6', isPrime(6));
console.log('113', isPrime(113));
console.log('100', isPrime(100));