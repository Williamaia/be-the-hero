const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const covid = await connection('covid')
            .where('id', id)
            .select('name')
            .first();

        if(!covid) {
            return response.status(400).json({ error: 'No covid found with this ID' });
        }

        return response.json(covid);
    }
}