import { createElement } from "../utils/domManipulation.js"
import ProjectArticle from "./ProjectArticle.js"

class ProjectDetail {
    constructor({ closeItem }) {
        this.closeItem = closeItem
        this.globalElement = createElement({ tag: "section", className: "details" })
        this.observer = new IntersectionObserver((entries) => entries
            .forEach(entry => entry.target.classList[entry.isIntersecting ? "add" : "remove"]("show-text")),
            {
                root: this.globalElement,
                threshold: 0.7
            }
        )
    }

    async populate(title, data) {
        setTimeout(() => {
            data.forEach(el => {
                this.globalElement.appendChild(new ProjectArticle({
                    title: el.title,
                    imageSrc: `http://51.77.230.232:6890/arqarol/${el.image}.webp`,
                    textContent: el.text,
                    observer: this.observer
                }).render())
            })
        }, 300)

        setTimeout(() => {
            this.globalElement.appendChild(createElement({ tag: "h2", textContent: title }))
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