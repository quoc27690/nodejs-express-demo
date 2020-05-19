const exchangeRate = {
  VND: {
    USD: 0.000043,
    JPY: 0.0046,
  },
  USD: {
    VND: 23391,
    JPY: 100,
  },
};

function exchange(amount, from, to) {
  return exchangeRate[from][to] * amount;
}

module.exports.getValue = async (req, res) => {
  const { amount, from, to } = req.query;
  const returnedAmount = exchange(Number(amount), from, to);
  res.send(`Returned Amount: ${returnedAmount}`);
};
