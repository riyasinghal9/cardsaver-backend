
const Offer = require('../models/Offer');
const { calculateDiscount } = require('../utils/discountCalculator');

exports.getHighestDiscount = async (req, res) => {
  const { amountToPay, bankName, paymentInstrument } = req.query;
  if (!amountToPay || !bankName) return res.status(400).json({ error: 'Missing params' });

  const where = { bankName };
  if (paymentInstrument) where.paymentInstrument = paymentInstrument;

  const offers = await Offer.findAll({ where });
  let maxDiscount = 0;

  for (let offer of offers) {
    const discount = calculateDiscount(parseFloat(amountToPay), offer);
    if (discount > maxDiscount) maxDiscount = discount;
  }

  res.json({ highestDiscountAmount: maxDiscount });
};
