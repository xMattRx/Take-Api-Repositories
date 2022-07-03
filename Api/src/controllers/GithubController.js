import axios from 'axios';

class GithubController{
  async getRepositories(req,res){
    let utils = new Utils();
    let repositories = await utils.requestAllRepositories()
    repositories = utils.filterByCSharp(repositories)
    repositories = utils.sortByData(repositories)
    repositories = utils.fiveOlders(repositories)
    return res.status(200).json(repositories)
  }
}

export class Utils{
  async requestAllRepositories(){
    let arrayRepositories = [];
      for (let index = 1; index <= 4; index++) {
      try{  
        const {data} = await axios(`https://api.github.com/users/takenet/repos?page=${index}`)
        arrayRepositories.push(...data)
      } catch(error){ 
        res.status(400).send(error)
      }
    }
    return arrayRepositories
  }
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