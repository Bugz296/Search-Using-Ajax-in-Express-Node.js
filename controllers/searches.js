const Controller = require('./Controller');
const Search = require('../models/search');
class Searches extends Controller{
    constructor(){
        super();
    }

    async index(req, res){
        try{
            /* Fetch data from db to be used as options on views */
            let sports = await Search.getSports();
            res.render('index', {sports});
        }catch(err){
            console.log(err);
        }
    }

    async search(req, res){
        try{
            let data = req.body;
            if(data.action == 'search'){
                let result = await Search.searchPlayers(data);
                res.render('partials/result', {result});
            }
        }catch(err){
            console.log(err);
        }
    }
}
module.exports = new Searches;