const e = require('express');
const Model = require('./Model');
class Search extends Model{
    constructor(){
        super();
    }
    async getSports(){
        let result = await this.query("SELECT * FROM sports");
        return result;
    }
    async searchPlayers(data){
        /* Initialize variables */
        let gender = [], values = [];
        let keyword = data.name;
        let sports = data.sports;

        /* Structure the "value" array whereas it corresponds to the query */
        values.push('%'+keyword+'%');
        if(data.male) gender.push("M");
        if(data.female) gender.push("F");

        values.push(gender.join('|'));
        if(Array.isArray(sports)){
            values.push(sports.join('|'));
        }else{
            values.push(sports);
        }
        
        let query = this.mysql.format("SELECT players.id, CONCAT(first_name,' ',last_name) AS name, img_src FROM players LEFT JOIN sports_has_players ON players.id = sports_has_players.player_id LEFT JOIN sports ON sports_has_players.sport_id = sports.id  WHERE (CONCAT(first_name,last_name) LIKE ?) AND (gender REGEXP ?) AND (sports.id REGEXP ?)", values);
        let result = await this.query(query);
        return result;
    }
}
module.exports = new Search;