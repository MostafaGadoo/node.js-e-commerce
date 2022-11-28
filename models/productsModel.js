const databaseConfiguration = require("../database/config");
const knex = databaseConfiguration.openDatabaseConnection();

exports.select = async () => {
    const productSelect = await knex('products').select(['title', 'quantity']);
    return productSelect;
}

// exports.selectOne = async (email) => {
//   const oneAdminSelect = await  knex('admins').select('name').where({email:email}).limit(1);

//   return oneAdminSelect;
// }

exports.insert = async (title, quantity) =>{
    const productInsertion = await knex('products').insert({
        title: title,
        quantity: quantity
    });

    return productInsertion;
}


exports.selectOneById = async (id, isDeleted) => {

    const selectOneProduct = await knex("products").select(['title']).where({
        id: id,
      })
      .where({
        is_deleted:isDeleted
      })
      .limit(1)
    
      return selectOneProduct;
}
exports.selectOneByName = async (title, isDeleted) => {

    const selectOneProduct = await knex("products").select(['title']).where({
        title: title,
      })
      .where({
        is_deleted:isDeleted
      })
      .limit(1)
    
      return selectOneProduct;
}

exports.delete = async (id) => {
    const deletedPorduct = await knex('products').update({
        is_deleted: '1',
    }).where({
        id:id,
    })

    return deletedPorduct;
}

exports.restore = async (id) => {
    const deletedPorduct = await knex('products').update({
        is_deleted: '0',
    }).where({
        id:id,
    })

    return deletedPorduct;
}

exports.update = async (id,title,quantity) => {
    const updateProduct = await knex('products').update({
        title: title,
        quantity: quantity
    }).where({
        id:id,
        is_deleted: '0'
    })

    return updateProduct;
}