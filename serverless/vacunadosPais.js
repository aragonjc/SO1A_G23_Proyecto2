/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
 const redis = require('redis');
 var groupBy = require('json-groupby')
 
 exports.vacunadosPais = async(req, res) => {
   const client = redis.createClient(6379,'35.238.119.39');
 
     client.on('ready',()=>{
         console.log("Cliente conectado y listo para usarse")
         client.lrange('casos', 0, -1, function (err, replies) {
             if(err) {
                 console.log("Error" + err.toString())
                    res.json({msg:err.toString()})
             } else {
                 let data = replies.map(element=>JSON.parse(element));
                 let Data = groupBy(data, ['location'])
                 let keys = Object.keys(Data)
                 res.set('Access-Control-Allow-Origin', '*')
                 res.json({list_countries:keys,data:Data});
             }
         });
     });
 };
 