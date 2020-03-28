const connection = require('../database/connection')

module.exports = {
     async  index(Request, Response) {
    const ongs_id = Request.headers.authorization
    const incidents = await connection('incident')
    .where('ong_id', ongs_id) 
    .select('*')

    return Response.json(incidents)
    }
}
