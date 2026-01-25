# Сервис по публикации и поиску учебных проектов "Мозаика"

Области хранения данных:
- БД на json-server
- BFF (локальный)
- redux store

Сущности приложения:
- Пользователь: БД (список зарегистрированных пользователей), BFF (сессия текущего пользователя), store (отображение в браузере)
- Роль: БД (список ролей пользователей), BFF (роль текущего пользователя в рамках сессии), store (использование роли на клиенте)
- Проект: БД (список опубликованных проектов), BFF (данные проекта с информацией об авторе), store (отображение списка проектов на клиенте)
- Участие в проекте: БД (связь пользователей и проектов), BFF (формирование списка участников проекта), store (отображение участников проекта на странице проекта)

Таблицы БД:
- Пользователи - users: id / login / password / registered_at / role_id
- Роль - roles: id / name
- Проект - projects: id / title / description / stack: {id, name} / author_id / created_at
- Участники проекта - project_members: id / project_id / user_id / created_at
- Технологии - stack

Схема состояния на BFF:
- сессия текущего пользователя: sessions: user: {id, login, role}

Схема для redux store:
- user: id / login / roleId / session
- projects: array_projects: {id / title / description / stack / author: {id, name} / members_count}
- project: id / title / description / stack / author: {id, name} / members_array: {id, login}
- users: array user: id / login / registed_at