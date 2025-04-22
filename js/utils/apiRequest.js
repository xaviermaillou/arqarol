const LIST_URL = "http://localhost:7001"

const request = async (url) => {
    try {
        const response = await fetch(url)
        const json = await response.json()
        return json
    }
    catch (error) {
        console.error("Request error:", error)
    }
}

export const requestProjectList = async () => await request(`${LIST_URL}/projects`)
export const requestProjectDetail = async (id) => await request(`${LIST_URL}/projects/${id}`)