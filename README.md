# Приложение "Список задач"

Это приложение для управления списком задач, разработанное с использованием React, Redux Toolkit, TypeScript и Tailwind CSS, и использующее готовый API.

## Функциональность

-   Аутентификация пользователя (регистрация и вход)
-   Создание, чтение, обновление и удаление (CRUD) задач
-   Фильтрация задач (все, активные, завершенные)

## Используемые технологии

-   Frontend:
    -   React
    -   TypeScript
    -   Redux Toolkit
    -   Axios
    -   Tailwind CSS
    -   React Router
    -   Vite
-   Backend:
    -   Используется готовый API: [http://xserver-krv.ru:91](http://xserver-krv.ru:91)
    -   Документация API: [http://xserver-krv.ru:91/api-docs/#/](http://xserver-krv.ru:91/api-docs/#/)

## Инструкции по установке и запуску

1.  Клонируйте репозиторий: git clone <URL репозитория>

2. Перейдите в директорию клиента: cd client

3. Установите зависимости:  npm install

4. Запустите сервер разработки: npm run dev

## Использование API

Это приложение использует готовый API. Базовый URL для API: http://xserver-krv.ru:91

Обратитесь к документации Swagger для получения информации о доступных endpoints и форматах запросов/ответов: http://xserver-krv.ru:91/api-docs/#/

Приложение взаимодействует со следующими endpoints:

-  POST /register: Регистрация пользователя
-  POST /login: Вход пользователя
-  POST /refresh: Обновление access токена
-  GET /todos: Получение всех задач
-  POST /todos: Создание новой задачи
-  PUT /todos/:id: Обновление задачи
-  DELETE /todos/:id: Удаление задачи
