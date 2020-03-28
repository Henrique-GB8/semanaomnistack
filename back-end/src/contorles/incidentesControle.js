const connection = require('../database/connection')

module.exports = {
    async index(resquest, Response){
        const {page = 1} = resquest.query

        const [count] = await connection('incident').count()
           
        console.log(count)
        const incident = await connection('incident')
        .join('ongs', 'ongs_id', '=', 'incident.ongs_id')
        .limit(5)
        .offset((page - 1)* 5)
        .select(['incident.*',' ongs.name', 
        'ongs.city', 'ongs.email', 'ongs.uf', ' ongs.whatsapp'])

        Response.header('X-total-Count', count['count(*)'])
        return Response.json(incident)

    },
    
    async  create (Request, Response) {
        const {title, description, value} = Request.body

        const ongs_id = Request.headers.authorization

        const [id] = await connection('incident').insert({
           description,
             ongs_id,
             title,
           value,
        })

        return Response.json({ id })
    },
       
    async delete(resquest,Response){

        const { id } = resquest.params
        const ongs_id = resquest.headers.authorization 

        const incident = await connection('incident')
        .where('id', id)
        .select('ongs_id')
        .first()

            if (incident.ongs_id != ongs_id){
                return Response.status(401).json({erro: 'operação nao permitida' })
            }
            await connection('incident').where('id', id).delete()
            return Response.status('204')
        
    }

}
