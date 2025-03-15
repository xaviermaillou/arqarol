export const addClass = (item, className) => {
    item.classList.add(className)
}

export const removeClasses = (item, classNames) => {
    classNames.forEach(className => item.classList.remove(className))
}

export const addClickEvent = ({ element, fn }) => element.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()
    fn()
})

export const createElement = ({ tag, textContent = "", className, id, src, onClick }) => {
    const element = document.createElement(tag)

    element.textContent = textContent
    if (className) className.split(" ").forEach(className => addClass(element, className))
    if (id) element.id = id
    if (src) element.src = src
    
    if (onClick) addClickEvent({ element, fn: onClick })

    return element
}
