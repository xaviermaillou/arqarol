import { createElement } from "../utils/domManipulation.js"

class ProjectArticle {
    constructor({ title, imageSrc, textContent }) {
        this.title = title
        this.imageSrc = imageSrc
        this.textContent = textContent

        this.globalElement = createElement({ tag: "article" })
    }

    render() {
        if (this.title) this.globalElement.appendChild(createElement({ tag: "h3", textContent: this.title }))
        if (this.imageSrc) this.globalElement.appendChild(createElement({ tag: "img", src: this.imageSrc }))
        if (this.textContent) this.globalElement.appendChild(createElement({ tag: "p", textContent: this.textContent }))

        return this.globalElement
    }
}

export default ProjectArticle