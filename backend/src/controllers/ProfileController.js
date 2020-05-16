const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const userdata_id = request.headers.authorization;

    const userdata = await connection('userdata')
      .where('userdata_id', userdata_id)
      .select('*');

    return response.json(userdata);
  },
};
