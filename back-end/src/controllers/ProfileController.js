const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const covid_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('covid_id', covid_id)
            .select('*');

        return response.json(incidents);
    }
}