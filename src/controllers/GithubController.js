import axios from 'axios';
import Utils from '../utils'

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


export default new GithubController();