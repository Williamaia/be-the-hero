const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const {page = 1} = request.query;

        const [count] = await connection('incidents')
        .count();

        const incidents = await connection('incidents')
        .join('covid', 'covid_id', '=', 'incidents.covid_id')
        .limit(5)
        .offset((page - 1) * 5) 
        .select([
            'incidents.*', 
            'covid.name', 
            'covid.email', 
            'covid.whatsapp', 
            'covid.city', 
            'covid.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },

    async create (request, response){
        const {title, description, value} = request.body;
        const covid_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            covid_id
        });

        return response.json({id});
    }, 

    async delete(request, response){
        const {id} = request.params;
        const covid_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('covid_id')
        .first();

        if(incident.covid_id != covid_id){
            return response.status(401).json({error: 'operation not permitted'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}