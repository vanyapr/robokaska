![Тесты пройдены (https://github.com/vanyapr/robokaska/workflows/tests.yml/badge.svg)](https://github.com/vanyapr/robokaska/workflows/tests.yml)

# Robokaska

Готовая интеграция для апи сервиса Robokassa. Работает, в отличие от других.

## Мотивация

Чёто я не смог найти готового модуля, пришлось взять почти готовый, и дописать его самостоятельно в соответствии с
документацией.

## Преимущества

* Шифрует в md5
* Валидирует ответ
* Работает синхронно
* Работает вообще

## Использование

1) Получаем настройки в [личном кабинете РобоКассы](https://partner.robokassa.ru). Вносим в конфигурацию.
    ```js
    const config = {
      shopIdentifier: 'Идентификатор магазина',
      password1: 'Пароль 1',
      password2: 'Пароль 2',
      testMode: true, // Указываем true, если работаем в тестовом режиме
    }
    ```
2) Создаем экземпляр класса.
   ```js
   const roboKassa = new Robokaska(config);
   ```

3) Получаем URL для оплаты. В метод передается email покупателя, на который отправляется чек.
    ```js
    // Вернёт строку с URL адресом, на который можно отправить пользователя
    roboKassa.generateUrl(invoiceID, email, outSum, invoiceDescription);
    ```    
4) Валидируем данные, полученные в ответ.
   ```js     
   // Вернёт true / false
   roboKassa.checkPay(invoiceID, outSum, SignatureValue);
   ```

## Использование в Express.js

Пример использования в express.js

```js     
app.get('/pay', (req, res) => {
    const payURL = roboKassa.generateUrl(invoiceID, email, outSum, invoiceDescription);

    res.redirect(payURL);
})

//...

app.get('/pay', (req, res) => {
    const {invoiceID, outSum, SignatureValue} = req.body;
    const isPaymentValid = roboKassa.checkPay(invoiceID, outSum, SignatureValue);

    if (isPaymentValid) {
        res.send('okay');
    } else {
        res.staus(400).send('NOT okay');
    }
}) 
```