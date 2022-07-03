
export default class Utils{
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
