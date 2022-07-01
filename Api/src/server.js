import cors from 'cors'
import express from 'express'
import axios from 'axios'

const app = express();

app.use(cors())

app.listen(process.env.PORT || 5000,()=>{
  console.log(5000)
})

app.get("/", async(req,res)=>{
  // Todos os repositorios
  let allRepositories = []
  
  // Requisição de todos os repositórios
  for (let index = 1; index <= 4; index++) {
  try{  
    const {data} = await axios(`https://api.github.com/users/takenet/repos?page=${index}`)
    allRepositories.push(...data)
  } catch(error){ 
    res.status(400).send(error)
  }
}

//Filtro C#
let CSharp = allRepositories.filter((repo)=>{
  return repo.language === 'C#'
})

//Ordenação em data crescente
let Order = CSharp.sort((a,b)=> new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf())

//Cinco repositorios mais velhos
let FiveOlders = Order.slice(0,5)
// let FiveOldersObject = {...FiveOlders}
res.json(FiveOlders)


})