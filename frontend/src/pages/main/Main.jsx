import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { ProjectCard } from "../../components"
import { projectsThunk } from "../../slices/projects/projectsSlice"
import { selectProjects, selectLastPage } from "../../selectors"
import { debounce } from "./utils/debounce"

function MainContainer({ className }) {
  const [searchPhrase, setSearchPhrase] = useState("")
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)
  const lastPage = useSelector(selectLastPage)

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setPage(1)
        setSearchPhrase(value)
      }, 500),
    [],
  )

  const pages = useMemo(() => {
    return Array.from({ length: lastPage }, (_, i) => i + 1)
  }, [lastPage])

  function onSearch(event) {
    const value = event.target.value
    setSearchPhrase(value)
    debouncedSearch(value)
  }

  useEffect(() => {
    dispatch(projectsThunk({ search: searchPhrase, page }))
  }, [dispatch, page, searchPhrase])

  if (!projects) {
    return <div>Загрузка проектов...</div>
  }

  return (
    <div className={className}>
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск проекта..."
          value={searchPhrase}
          onChange={onSearch}
        />
      </div>

      <div className="project-list">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            name={project.name}
            title={project.title}
            skills={project.skills}
            authorName={project.authorName}
            createdAt={project.createdAt}
            isFooter={true}
          />
        ))}
      </div>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          ←
        </button>

        {pages.map((p) => (
          <button
            key={p}
            className={`page-button ${p === page ? "active" : ""}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}

        <button
          disabled={page === lastPage}
          onClick={() => setPage((p) => p + 1)}
        >
          →
        </button>
      </div>
    </div>
  )
}

export const Main = styled(MainContainer)`
  width: 1200px;
  margin: 0 auto;
  padding: 24px;

  .filters {
    display: flex;
    flex-direction: column;

    margin: 32px 0;
  }

  .project-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;

    & > div {
      width: 760px;
    }
  }

  .filters input {
    padding: 10px 14px;

    background-color: #151821;
    color: #e6e6e6;
    font-size: 14px;

    border: 1px solid #2a2f45;
    border-radius: 6px;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    margin-top: 40px;
  }

  .pagination button {
    min-width: 36px;
    height: 36px;

    padding: 0 10px;

    background: #1f2330;
    border: 1px solid #2a2f45;
    border-radius: 8px;

    color: #cfcfcf;
    font-size: 13px;

    cursor: pointer;
    transition: 0.2s ease;
  }

  .pagination button:hover:not(:disabled) {
    background: #262b3f;
    border-color: #3a3f5a;
    color: #ffffff;
  }

  .page-button.active {
    background: rgba(124, 124, 255, 0.15);
    border-color: #7c7cff;
    color: #dedeff;
  }

  .pagination button:disabled {
    opacity: 0.4;
    cursor: default;
  }
`
