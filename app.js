import express from "express"
import usuariosRouter from "./routes/usuarios.js"
import fornecedores from "./routes/fornecedores.js"

const app = express()
const port = 3999


/** permitir ler JSON no corpo da requisição.
 */
app.use(express.json())

app.use("/usuarios",usuariosRouter)
app.use("/fornecedor", fornecedores)


app.get('/', (req, res) => {
  res.send('Bem Vindo a minha API!')
})



app.listen(port, () => { //levanta o servidor para  ele ouvir!
  console.log(`escutando na http://localhost:${port}`)
})

