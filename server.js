const express = require("express")
const path = require("path")
const fs = require("fs").promises

const app = express()
app.use(express.json())

const fetchData = async () => {
    try {
        const filePath = path.join(__dirname, "books.json")
        const fileContent = await fs.readFile(filePath)
        const data = JSON.parse(fileContent)
        return data
    } catch (error) {
        console.log(error)
    }
}

prevIndex = []

const randomIndex = (array_list) => {
    let newIndex
    do {
        newIndex = Math.floor(Math.random() * array_list.length)
    } while (prevIndex.includes(newIndex))

    prevIndex.push(newIndex)

    if (prevIndex.length > 3) {
        prevIndex.shift()
    }

    return newIndex
}

app.get("/", async (req, res) => {
    const library = await fetchData()
    res.status(200).json({mssg: "These are all the books in the library", library: library})
})

app.get("/get-suggestion", async (req, res) => {
    const library = await fetchData()
    const random_index = randomIndex(library)
    const book_from_library = library[random_index]
    res.status(200).json(book_from_library)
})

app.listen(3000)