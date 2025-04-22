import { requestProjectDetail } from "../utils/apiRequest.js"
import { addClass, addClickEvent, createElement, removeClasses } from "../utils/domManipulation.js"
import ProjectDetail from "./ProjectDetail.js"

class ProjectItem {
    constructor(infoData, blurBackground) {
        this.infoData = infoData
        this.blurBackground = blurBackground

        this.globalElement = createElement({ tag: "li" })
        this.titleElement = createElement({ tag: "span", textContent: infoData.title, className: "overview-title" })
        this.contentElement = createElement({ tag: "div", className: "content" })
        this.thumbnailElement = createElement({ tag: "img", className: "thumbnail", src: `http://51.77.230.232:6890/arqarol/${infoData.thumbnail}.webp` })
        this.detailsElement = new ProjectDetail({ closeItem: () => {
            removeClasses(this.globalElement, ["active", "opened", "fixed"])

            this.globalElement.style.transform = ""
            this.contentElement.style.transform = ""
            
            this.blurBackground(false)
        } })
    }

    openItem() {
        addClass(this.globalElement, "active")

        const clientRect = this.globalElement.getBoundingClientRect()
        this.globalElement.style.transform = `translate(${document.body.clientWidth / 2 - (clientRect.x + clientRect.width / 2)}px, ${window.innerHeight / 2 - (clientRect.y + clientRect.height / 2)}px)`
        this.contentElement.style.transform = "none"

        setTimeout(() => {
            this.contentElement.style.transform = `translate(calc(-50dvw + ${clientRect.width / 2}px - 14px), calc(-50dvh + ${clientRect.height / 2}px - 53px))`
            addClass(this.globalElement, "opened")
        }, 300)

        setTimeout(() => {
            addClass(this.globalElement, "fixed")
        }, 600)
        setTimeout(() => {
            this.contentElement.style.transform = "none"
            this.globalElement.style.transform = "none"
        }, 600)

        this.blurBackground(true, getComputedStyle(this.contentElement).color === "rgb(255, 255, 255)")
    }

    async populateItem() {
        const detailsData = await requestProjectDetail(this.infoData.id)
        this.detailsElement.populate(this.infoData.title, detailsData)
    }

    render() {
        this.globalElement.appendChild(this.titleElement)

        this.contentElement.appendChild(this.thumbnailElement)
        this.contentElement.appendChild(this.detailsElement.render())
        this.globalElement.appendChild(this.contentElement)

        addClickEvent({ element: this.globalElement, fn: () => {
            if (!this.globalElement.classList.contains("active")) {
                this.openItem()
                this.populateItem()
            }
        } })

        return this.globalElement
    }
}

export default ProjectItem