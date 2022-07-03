import axios from 'axios';

class GithubController{
  async getRepositories(req,res){
    let utils = new Utils();
    
    let arrayRepositories = [];
    for (let index = 1; index <= 4; index++) {
    try{  
      const {data} = await axios(`https://api.github.com/users/takenet/repos?page=${index}`)
      arrayRepositories.push(...data)
    } catch(error){ 
      res.status(400).send(error)
    }
  }
    arrayRepositories = utils.filterByCSharp(arrayRepositories)
    arrayRepositories = utils.sortByData(arrayRepositories)
    arrayRepositories = utils.fiveOlders(arrayRepositories)
    res.status(200).json(arrayRepositories)
    return res.status(200).send()
  }
}

export class Utils{
  filterByCSharp(repositories){
    const language = "C#"

    //Filtro C#
    let CSharp = repositories.filter((repo)=>{
      return repo.language === language
    })
    return CSharp
  }
  sortByData(repositories){
    let Order = repositories.sort((a,b)=> new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf())
    return Order
  }
  fiveOlders(repositories){
    let FiveOlders = repositories.slice(0,5)
    return FiveOlders
  }
}

export default new GithubController();