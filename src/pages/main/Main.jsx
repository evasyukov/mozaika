import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"

import { ProjectCard } from "../../components"
import { projectsThunk } from "../../slices/projects/projectsThunk"
import { selectProjects } from "../../selectors"
import { debounce } from "./utils/debounce"

function MainContainer({ className }) {
  const [searchPhrase, setSearchPhrase] = useState("")

  const dispatch = useDispatch()
  const projects = useSelector(selectProjects)
  const status = useSelector((state) => state.projects.status)

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(projectsThunk(value))
      }, 700),
    [dispatch],
  )

  function onSearch(event) {
    const value = event.target.value
    setSearchPhrase(value)
    debouncedSearch(value)
  }

  useEffect(() => {
    dispatch(projectsThunk())
  }, [dispatch])

  if (!projects) {
    return <div>Загрузка проектов...</div>
  }

  const loading = <div>Загрузка</div>

  return (
    <div className={className}>
      {status === "loading" && loading}
      <div className="filters">
        <input
          type="text"
          placeholder="Поиск проекта..."
          value={searchPhrase}
          onChange={onSearch}
        />
        {/* TODO: добавить фильтрацию */}
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

    background: #151821;
    color: #e6e6e6;
    font-size: 14px;

    border: 1px solid #2a2f45;
    border-radius: 6px;
  }
`
