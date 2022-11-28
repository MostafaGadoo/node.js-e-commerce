const databaseConfiguration = require("../database/config");
const knex = databaseConfiguration.openDatabaseConnection();

exports.select = async () => {
    const clientsSelect = await knex('clients').select(['id','name', 'email','phone']);
    return clientsSelect;
}

exports.selectOne = async (email) => {
  const oneClientsSelect = await  knex('clients').select(['name','password']).where({email:email}).limit(1);

  return oneClientsSelect;
}

exports.insert = async (name, email, hashedPassword,phone) =>{
    const clientsInertion = await knex('clients').insert({
        name: name,
        email:email,
        password: hashedPassword,
        phone:phone
    });

    return clientsInertion;
}

exports.selectOne = async (email) => {
    const oneClientSelect = await  knex('clients').select(['name','email','password','phone']).where({email:email}).limit(1);
  
    return oneClientSelect;
  }

exports.selectOneById = async (id, isDeleted) => {

    const selectOneClient = await knex("clients").select(['name']).where({
        id: id,
      })
      .where({
        is_deleted:isDeleted
      })
      .limit(1)
    
      return selectOneClient;
}

exports.delete = async (id) => {
    const deletedClinet = await knex('clients').update({
        is_deleted: '1',
    }).where({
        id:id,
    })

    return deletedClinet;
}

exports.restore = async (id) => {
    const deletedClinet = await knex('clients').update({
        is_deleted: '0',
    }).where({
        id:id,
    })

    return deletedClinet;
}

exports.update = async (name, email, password,phone) => {
    const upadteClient = await knex('clients').update({
        name: name,
        email: email,
        phone:phone,
        password:password
    }).where({
        email:email,
        is_deleted: '0'
    })

    return upadteClient;
}