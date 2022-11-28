const databaseConfiguration = require("../database/config");
const knex = databaseConfiguration.openDatabaseConnection();

exports.select = async () => {
    const adminsSelect = await knex('admins').select(['name', 'email']);
    return adminsSelect;
}

exports.selectOne = async (email) => {
  const oneAdminSelect = await  knex('admins').select(['email','password']).where({email:email}).limit(1);

  return oneAdminSelect;
}

exports.selectOneById = async (id, isDeleted) => {

    const selectOneClient = await knex("admins").select(['name']).where({
        id: id,
      })
      .where({
        is_deleted:isDeleted
      })
      .limit(1)
    
      return selectOneClient;
}

exports.insert = async (name, email, hashedPassword) =>{
    const adminInertion = await knex('admins').insert({
        name: name,
        email:email,
        password: hashedPassword
    });

    return adminInertion;
}

exports.delete = async (id) => {
    const deleteAdmin = await knex('admins').update({
        is_deleted: '1',
    }).where({
        id:id,
    })

    return deleteAdmin;
}

exports.restore = async (id) => {
    const deleteAdmin = await knex('admins').update({
        is_deleted: '0',
    }).where({
        id:id,
    })

    return deleteAdmin;
}