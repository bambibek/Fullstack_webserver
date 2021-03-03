const express = require('express')
const app = express()
app.use(express.json())


let personInfo =
    [
        {
            id: 1,
            name: "Arto Hellas",
            number: "040-123456"
        },

        {
            id: 2,
            name: "Ada Lovelace",
            number: "39-44-5323523"
        },

        {
            id: 3,
            name: "Dan Abramov ",
            number: "12-43-234345"
        },

        {
            id: 4,
            name: "Mary Poppindick",
            number: "39-23-64231226"
        }
    ]

app.get('/api/personInfo', (request, response) => {
    response.json(personInfo)
})
app.get('/api/info', (request, response) => {
    response.send(
        `<p>Phonebook has info for ${ personInfo.length }  people.   </p>
    <p> ${new Date() }</p>`)
})

app.delete('/api/personInfo/:id', (request, response) => {
    const id = Number(request.params.id)
    personInfo = personInfo.filter(idInfo => idInfo.id !== id)
    response.status(204).end()
})

app.get('/api/personInfo/:id', (request, response) => {
    const id = Number(request.params.id)
    const info = personInfo.find(info => info.id === id)
    response.send(info)

})

const generateId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);

}

app.post('/api/personInfo', (request, response) => {

    const body = request.body
    if (!body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'please check missing input parameter'
        })
    }
    const nameInfo = personInfo.filter(infoName => infoName.name.trim().toLocaleLowerCase() === body.name.trim().toLocaleLowerCase())

    if (nameInfo.length > 0) {
        return response.status(400).json({
            error: 'Name Must Be Unique!'
        })
    }


    const pInfo = {
        id: generateId(5, 100),
        name: body.name,
        number: body.number
    }
    personInfo = personInfo.concat(pInfo)
    console.log(JSON.stringify(request.body))
    response.json(pInfo)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${ PORT }`)
})