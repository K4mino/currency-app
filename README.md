## Эндпоинт
GET /api/rss/get_rates.cfm
Параметры:
fdate: Дата в формате DD.MM.YYYY для получения курсов на эту дату.
Ответ: XML-документ с данными о курсах валют.

## Функционал

### Отображение списка курсов валют:
Загружает данные с API для даты по умолчанию (например, 30.03.2023) при загрузке страницы.
Отображает карточки валют, включая основную информацию и флаг страны.
Пользователь может добавлять или удалять валюты в избранное.

### Изменение даты курса валют:
Пользователь может изменить дату для получения курсов валют на другую.
При изменении даты происходит запрос к API для загрузки курсов на выбранную дату.

### Избранные валюты:
Пользователь может помечать валюты как избранные.
Избранные валюты сохраняются в локальное хранилище браузера и сохраняются между сессиями.
