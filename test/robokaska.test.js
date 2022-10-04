const RoboKaska = require('../src/robokaska');

const config = {
  shopIdentifier: 'test',
  password1: 'test1',
  password2: 'test2',
  testMode: true, // Указываем true, если работаем в тестовом режиме
};

const invID = '123';
const email = 'test@test.ru';
const outSumm = 1200;
const description = 'Описание товара';
const generatedURL = 'https://auth.robokassa.ru/Merchant/Index.aspx?MerchantLogin=test&OutSum=1200&Description=%D0%9E%D0%BF%D0%B8%D1%81%D0%B0%D0%BD%D0%B8%D0%B5%20%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0&SignatureValue=6eb563dc56a1509b1eb087ac6fc86620&Encoding=UTF-8&InvId=123&Email=test%40test.ru&IsTest=1';

const robokassa = new RoboKaska(config);

test('Генерируется урл', () => {
  expect(robokassa.generateUrl(invID, email, outSumm, description)).toEqual(generatedURL);
});

test('Валидация возвращает false при неверных параметрах', () => {
  expect(robokassa.checkPay(invID, outSumm, '12345')).toBe(false);
});
