
const Offer = require('../models/Offer');

exports.storeOffers = async (req, res) => {
  const offers = req.body.flipkartOfferApiResponse || [];
  let newCount = 0;

  for (let offer of offers) {
    const exists = await Offer.findOne({ where: { offerId: offer.id } });
    if (!exists) {
      await Offer.create({
        offerId: offer.id,
        title: offer.title,
        bankName: offer.bankName,
        discountType: offer.discountType,
        discountValue: offer.discountValue,
        maxDiscountAmount: offer.maxDiscountAmount,
        paymentInstrument: offer.paymentInstrument
      });
      newCount++;
    }
  }

  res.json({ noOfOffersIdentified: offers.length, noOfNewOffersCreated: newCount });
};
