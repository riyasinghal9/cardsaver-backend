
exports.calculateDiscount = (amount, offer) => {
  if (offer.discountType === 'FLAT') return offer.discountValue;
  let discount = (amount * offer.discountValue) / 100;
  if (offer.maxDiscountAmount) discount = Math.min(discount, offer.maxDiscountAmount);
  return discount;
};
