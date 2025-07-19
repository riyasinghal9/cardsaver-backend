
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Offer = sequelize.define('Offer', {
  offerId: { type: DataTypes.STRING, unique: true, allowNull: false },
  title: DataTypes.STRING,
  bankName: DataTypes.STRING,
  discountType: DataTypes.ENUM('FLAT', 'PERCENTAGE'),
  discountValue: DataTypes.FLOAT,
  maxDiscountAmount: DataTypes.FLOAT,
  paymentInstrument: DataTypes.ENUM('CREDIT', 'EMI_OPTIONS')
});

module.exports = Offer;
