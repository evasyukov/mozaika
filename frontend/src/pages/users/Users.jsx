import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

import { H2, AuthFormError } from "../../components"
import { ErrorPage } from "../error-page/ErrorPage"
import { usersThunk, deleteUserThunk } from "../../slices/users/usersSlice"
import { selectUsers, selectAuthUser } from "../../selectors"
import { ROLES } from "../../constants"

function UsersContainer({ className }) {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const { roleId } = useSelector(selectAuthUser)

  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    dispatch(usersThunk())
  }, [dispatch])

  const handleDeleteUser = (userId, userLogin) => {
    if (window.confirm(`Удалить пользователя ${userLogin}?`)) {
      dispatch(deleteUserThunk(userId))
        .unwrap()
        .then(() => {
          setSuccessMessage(`Пользователь ${userLogin} удалён`)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }

  if (roleId !== ROLES.ADMIN) {
    return <ErrorPage error="Доступ запрещен" />
  }

  return (
    <div className={className}>
      <section className="admin-card">
        <div className="admin-header">
          <H2>Пользователи</H2>
        </div>

        {/* <AuthFormError>{successMessage}</AuthFormError> */}

        <table className="users-table">
          <thead>
            <tr>
              <th>Логин</th>
              <th>Дата регистрации</th>
              <th>Проекты</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="login">{user.login}</td>
                <td>{user.registeredAt}</td>
                <td>{user.projectsCount}</td>
                <td className="actions">
                  <button
                    className="danger"
                    onClick={() => handleDeleteUser(user.id, user.login)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const Users = styled(UsersContainer)`
  width: 1200px;
  margin-top: 40px;

  .admin-card {
    background: #151821;
    border: 1px solid #1f2330;
    border-radius: 12px;
    padding: 28px;
  }

  .admin-header {
    margin-bottom: 20px;
  }

  .admin-header h2 {
    font-size: 22px;
  }

  .users-table {
    width: 100%;
    border-collapse: collapse;
  }

  .users-table thead {
    border-bottom: 1px solid #2a2f45;
  }

  .users-table th {
    text-align: left;
    padding: 12px 10px;
    font-size: 13px;
    color: #9a9a9a;
    font-weight: 500;
  }

  .users-table td {
    padding: 14px 10px;
    border-bottom: 1px solid #1f2330;
    font-size: 14px;
  }

  .users-table tbody tr:hover {
    background: #1a1e29;
  }

  .login {
    font-weight: 500;
  }

  .actions {
    text-align: right;
  }

  button.danger {
    background: rgba(255, 80, 80, 0.15);
    border: 1px solid rgba(255, 80, 80, 0.4);
    color: #ff7a7a;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 13px;
  }

  button.danger:hover {
    background: rgba(255, 80, 80, 0.25);
  }
`
