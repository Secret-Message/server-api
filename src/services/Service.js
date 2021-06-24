class Service {
  constructor(model) {
    this.model = model;
    this.getAll = this.getAll.bind(this)
    this.insert = this.insert.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll(query) {
    let { offset, limit, where, attributes } = query || {};

    offset = offset ? Number(offset) : 0
    limit = limit ? Number(limit) : 50

    try {
      const items = await this.model.findAll({
        attributes,
        offset,
        limit,
        where: where,
      })
      
      return({
        err: false,
        res: items
      })
    } catch (error) {
      return({
        err: true,
        err_code: 500,
        err_msg: error
      })
    }
  }

  async insert(data) {
    try {
      const item = await this.model.create(data);
      if (item){
        return({
          err: false,
          res: item
        })
      }
    } catch (error) {
      return({
        err: true,
        err_code: 500,
        err_msg: error
      })
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.update(data, { where: { id: id }})
      return({
        err: false,
        res: item
      })
    } catch (error) {
      return({
        err: true,
        err_code: 500,
        err_msg: error
      })
    }
  }

  async delete(id) {
    try {
      const item = await this.model.destroy({ where: {id: id}})
      return({
        err: false,
        res: item
      })
    } catch (error) {
      return({
        err: true,
        err_code: 500,
        err_msg: error
      })
    }
  }
}

module.exports = Service;