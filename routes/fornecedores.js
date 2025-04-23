

import express from 'express'
// novo roteador 
const router = express.Router()

const fornecedores = [
    {id: 1, nome: "jacinto"},
    {id: 2, nome: "pagueMenos"}
]

router.get("/", (req,res)=>{
    res.send("sejam bem vindos!!!")
})

router.get("/fornecedores", (req, res)=>{
    res.status(200).send(fornecedores)
})

export default router