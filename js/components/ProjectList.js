import { requestProjectList } from "../utils/apiRequest.js"
import { addClass, createElement, removeClasses } from "../utils/domManipulation.js"
import ProjectItem from "./ProjectItem.js"

class ProjectList {
    constructor() {
        this.listData = []

        this.globalElement = createElement({ tag: "ul", id: "project-list" })

        this.blur = (toggle, whiten) => {
            if (toggle) {
                this.globalElement.style.pointerEvents = "none"
                addClass(this.globalElement, "blurred")
                if (whiten) addClass(document.getElementById("header-title"), "white")
            }
            else {
                this.globalElement.style.pointerEvents = "all"
                removeClasses(this.globalElement, ["blurred"])
                removeClasses(document.getElementById("header-title"), ["white"])
            }
        }
    }

    async fetchItems() {
        try {
            this.listData = await requestProjectList()
        } catch (error) {
            console.error('Error fetching items:', error)
        }
    }

    async render() {
        await this.fetchItems()
        
        this.listData.forEach(item => {
            const projectItem = new ProjectItem(item, this.blur).render()
            this.globalElement.appendChild(projectItem)
        })

        this.globalElement.appendChild(createElement({ tag: "div", className: "overlay" }))

        return this.globalElement
    }
}

export default ProjectList