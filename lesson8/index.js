function factorial(n) {
  let result = n >= 0 ? 1 : -1;
  n = n >= 0 ? n : -n;
  

  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

module.exports = factorial;