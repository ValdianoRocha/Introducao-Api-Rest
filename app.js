import express from "express"
const app = express()
const port = 3999

const usuarios = [ //banco de dados fake (em memoria)
  { id: 1, nome: "valdiano", email: "valdiano@Gmail.com" },
  { id: 2, nome: "rocha", email: "rocha@Gmail.com" }
];

/** permitir ler JSON no corpo da requisição.
 */
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Bem Vindo a minha API!')
})

app.get('/usuario', (req, res) => {
  res.send(usuarios)
})

app.post("/criarUsuario", (req, res) => {
  const { nome, email } = req.body
  let id = (usuarios.length) + 1
  let novoUsuario = {
    "id": id,
    "titulo": nome,
    "descricao": email,
  }
  usuarios.push(novoUsuario)
  res.send("usuario criado")
})

app.delete("/deletarUsuario", (req,res)=>{
let {id} = req.body
console.log(id);

usuarios.splice(id-1,1)
res.send("usuario deletado")
})

app.listen(port, () => { //levanta o servidor para  ele ouvir!
  console.log(`escutando na http://localhost:${port}`)
})

