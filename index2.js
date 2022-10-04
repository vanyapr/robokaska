const Robokaska = require('./src/robokaska');

// 1) Получаем настройки в личном кабинете РобоКассы
const config = {
  shopIdentifier: 'Идентификатор магазина',
  password1: 'Пароль 1',
  password2: 'Пароль 2',
  testMode: true, // Указываем true, если работаем в тестовом режиме
}

// 2) Создаем экземпляр интерфейса
const roboKassa = new Robokaska(config);

// 3) Получаем URL для оплаты
const createPaymentUrl = (invoiceID, email, total, invoiceDescription) => roboKassa.generateUrl(invoiceID, email, total, invoiceDescription);

// 4) Валидируем полученные данные заказа
const validateOrderPayment = (invoiceID, outSum, SignatureValue) => roboKassa.checkPay(invoiceID, outSum, SignatureValue);

module.exports = {
  createPaymentUrl,
  validateOrderPayment,
};
