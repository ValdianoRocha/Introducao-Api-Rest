
import express from 'express'

const router = express.Router()

const produtos = [
    { id: 1, nome: 'Mouse', preco: 50 },
    { id: 2, nome: 'teclado', preco: 75 },
    { id: 3, nome: 'tela', preco: 150 },
    { id: 4, nome: 'led', preco: 35 },
    { id: 5, nome: 'pelicula', preco: 30 }

]

router.get("/produtos", (req, res) => {
    res.send(produtos)
})

router.get("/produtos/:id", (req, res) => {
    let { id } = req.params
    const produto = produtos.find((produto) => produto.id == id)
    console.log(produto);
    res.send(produto)

})

router.post("/produtos", (req, res) => {
    const { nome, preco } = req.body
    const ultimoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 0;
    let novoProduto = {
        id: ultimoId,
        nome: nome,
        preco: preco,
    }
    produtos.push(novoProduto)
    res.status(201).json(produtos)
})

router.put("/produtos/:id", (req, res) => {
  let { id } = req.params
    const { novoNome, novoPreco } = req.body
    const index = produtos.findIndex((usuario) => usuario.id == id)
    if (index === -1) {
        return res.status(404)      
    }
    produtos[index].nome = novoNome
    produtos[index].preco = novoPreco

    res.send(produtos)
})

router.delete("/produtos/:id", (req, res) => {
    const { id } = req.params
    const index = produtos.findIndex(usuario => usuario.id == id);

    if (index !== -1) {
        produtos.splice(index, 1); 
        return res.status(200).send("Produto deletado com sucesso");
    } else {
        res.status(404).send("Produto não encotrado")
    }

})

export default router