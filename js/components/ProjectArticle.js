import { createElement } from "../utils/domManipulation.js"

class ProjectArticle {
    constructor({ title, imageSrc, textContent, observer }) {
        this.title = title
        this.imageSrc = imageSrc
        this.textContent = textContent
        this.observer = observer

        this.globalElement = createElement({ tag: "article" })
    }

    render() {
        if (this.imageSrc) this.globalElement.appendChild(createElement({ tag: "img", src: this.imageSrc }))
        if (this.title) this.globalElement.appendChild(createElement({ tag: "h3", textContent: this.title }))
        if (this.textContent) this.globalElement.appendChild(createElement({ tag: "p", textContent: this.textContent }))
        if (this.observer) this.observer.observe(this.globalElement)

        return this.globalElement
    }
}

export default ProjectArticle