class Database{
    constructor(){
        this.host = 'localhost';
        this.user = 'root';
        this.pass = '';
        this.database = 'players_and_sports';
    }
}
module.exports = new Database;