import express from "express"
const app = express()
const port = 3999

export const usuarios = [ //banco de dados fake (em memoria)
  { id: 1, nome: "valdiano", email: "valdiano@Gmail.com" },
  { id: 2, nome: "rocha", email: "rocha@Gmail.com" },
  { id: 3, nome: "lianderson", email: "lianderson@Gmail.com" },
  { id: 4, nome: "stefane", email: "stefane@Gmail.com" }
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
  const ultimoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 0;
  let novoUsuario = {
    // id: gerarIdAleatorio(10),
    id: ultimoId,
    nome: nome,
    email: email,
  }
  usuarios.push(novoUsuario)
  res.status(201).send(usuarios)
})

/**
 * app.delete("/deletarUsuario/id=:id", (req,res)=>{
let {id} = req.params => passando o id pelo parametro da barra de pesquisa
console.log(id);
 */
app.delete("/deletarUsuario", (req, res) => {
  let { id } = req.body
  console.log(id);
  usuarios.splice(id - 1, 1)
  res.send("usuario deletado")
})

app.delete('/deletarUsuario/:id', (req, res) => {
  // const id = parseInt(req.params.id); // Obtém o ID da URL
  const { id } = req.params // Obtém o ID da URL
  const index = usuarios.findIndex(usuario => usuario.id == id); // Encontra o índice do usuario
  // console.log(index);
  // console.log(typeof id);

  if (index !== -1) {
    usuarios.splice(index, 1); // Remove o item do array
    res.status(200).send(usuarios);
  } else {
    res.status(404).send({ message: 'Dado não encontrado' });
  }
});

app.put("/usuario/:id", (req, res) => {
  let { id } = req.params // recebe o id da barra de pesquisa // não esquece de colocar as {} para pegar so o valor
  res.send(id)
})

app.put("/usuario/atualizar/:id", (req, res) => {
  let { id } = req.params // recebe o id da barra de pesquisa // não esquece de colocar as {} para pegar so o valor
  const { novoNome, novoEmail } = req.body
  const index = usuarios.findIndex((usuario) => usuario.id == id)
  if (index === -1) {
    return res.status(404).send({mensagem:"Usuario não encontrado"})
  }
  usuarios[index].nome = novoNome
  usuarios[index].email = novoEmail

  res.send(usuarios)

})


app.listen(port, () => { //levanta o servidor para  ele ouvir!
  console.log(`escutando na http://localhost:${port}`)
})

