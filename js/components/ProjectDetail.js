import { createElement } from "../utils/domManipulation.js"
import ProjectArticle from "./ProjectArticle.js"

class ProjectDetail {
    constructor({ closeItem }) {
        this.closeItem = closeItem
        this.globalElement = createElement({ tag: "section", className: "details" })
    }

    async populate(data) {
        setTimeout(() => {
            this.globalElement.appendChild(createElement({ tag: "h2", textContent: data.name }))
            new Array(
                { field: "species", value: data.species, image: data.image },
                { field: "status", value: data.status },
                { field: "location", value: data.location.name }
            ).forEach(data => {
                this.globalElement.appendChild(new ProjectArticle({ title: data.field, imageSrc: data.image, textContent: data.value }).render())
            })
        }, 300)

        setTimeout(() => {
            this.globalElement.appendChild(createElement({ tag: "button", textContent: "X", className: "close", onClick: () => this.close() }))
        }, 1300)
    }

    close() {
        this.closeItem()
        this.globalElement.innerHTML = ""
    }

    render() {
        return this.globalElement
    }
}

export default ProjectDetail