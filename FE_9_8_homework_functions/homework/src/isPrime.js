function isPrime(x) {
  let isPrime = true;
  for (let i = x - 1; i > 1; i--) {
    if (x % i === 0) {
      isPrime = false;
    }
  }
  return isPrime;
}