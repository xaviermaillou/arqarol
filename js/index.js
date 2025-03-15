import ProjectList from "./components/ProjectList.js"

document.addEventListener('DOMContentLoaded', async () => {
    const app = document.getElementById("app")
    const projectList = await new ProjectList().render()
    app.appendChild(projectList)
})
