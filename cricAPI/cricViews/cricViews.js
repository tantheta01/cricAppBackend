'use strict';
const qrs = require('./queries');
const { Pool, Client } = require('pg');
// var client = require('pg/lib/native/client');

const client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'lab2db',
    password : 'newpassword',
    port: 5432
})

client.connect()

exports.list_matches = function(req, res) {
    console.log("inside matches");
    if(req.query.skip){
        var st = `select * from (select row_number() over () as rn, * from match ORDER BY season_year) as db1 where db1.rn <= 10 and db1.rn >= 0`
        client.query(st,(err, res) => {
            if(err){

                console.log("an error took place in fetching all matches");
                console.log(JSON.stringify(err));
            }
            else{
                console.log(req.query.skip);
                console.log(req.query.limit);
                console.log("executing stiff currectly");
                console.log(JSON.stringify(res));
            }
        });
    }
    else{
        var st1 = `select sum(runs_scored) as runs, count(*) as balls, player_id as pid, innings_no from ball_by_ball group by player_id, innings_no where match_id = ${req.params.id}`;
        
        client.query()
    }
    
};
