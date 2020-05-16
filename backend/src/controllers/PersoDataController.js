const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('userdata').count();

    const userdata = await connection('userdata')
      .join('users', 'users.id', 'userdata.userdata_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['userdata.*', 'users.name', 'users.email']);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(userdata);
  },

  async create(request, response) {
    const { age, cpf, rg, about, instagram, facebook } = request.body;

    const userdata_id = request.headers.authorization;

    const [id] = await connection('userdata').insert({
      age,
      cpf,
      rg,
      about,
      instagram,
      facebook,
      userdata_id,
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const userdata_id = request.headers.authorization;

    const dice = await connection('userdata')
      .where('id', id)
      .select('userdata_id')
      .first();

    if (dice.userdata_id !== userdata_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('userdata').where('id', id).delete();

    return response.status(204).send();
  },
};
