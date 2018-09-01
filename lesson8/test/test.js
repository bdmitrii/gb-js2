const assert = require('assert');

const factorial = require('../index');

describe('Factorial test', function () {
  it('Должен вернуть факториал числа', function () {
    assert.equal(factorial(5), 120);
  });

  it('Должен вернуть факториал числа', function () {
    assert.equal(factorial(10), 3628800);
  });

  it('Должен вернуть факториал числа', function () {
    assert.equal(factorial(0), 1);
  });

  it('При отрицательном аргументе возвращает отрицательный факториал', function () {
    assert.equal(factorial(-5), -120);
  });
});