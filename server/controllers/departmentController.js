
const knex = require('knex')(require('../knexfile'))

exports.index = (req, res) => {
  knex('department')
    .select('id', 'admin_id','name')
    .then((data) => {
        const depts = data.filter(dept => dept.admin_id === req.decoded.id)
      res.status(200).json(depts);
    })
    .catch((err) => res.status(400).send(`Error retrieving department ${err}`));
};

// exports.singleWarehouse = (req, res) => {
//   knex('warehouse')
//     .where({ id: req.params.id })
//     .then((data) => {
//       // If record is not found, respond with 404
//       if (!data.length) {
//         return res.status(404).send(`Record with id: ${req.params.id} is not found`)
//       }

//       // Knex returns an array of records, so we need to send response with a single object only
//       res.status(200).json(data[0]);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error retrieving warehouse ${req.params.id} ${err}`)
//     );
// };

// exports.warehouseInventories = (req, res) => {
//   knex('inventory')
//     .where({ warehouse_id: req.params.id })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) =>
//       res
//         .status(400)
//         .send(
//           `Error retrieving inventories for Warehouse ${req.params.id} ${err}`
//         )
//     );
// };

// exports.addWarehouse = (req, res) => {
//   // Validate the request body for required data
//   if (!req.body.name || !req.body.manager || !req.body.address || !req.body.phone || !req.body.email) {
//     return res.status(400).send('Please make sure to provide name, manager, address, phone and email fields in request');
//   }

//   knex('warehouse')
//     .insert(req.body)
//     .then((data) => {
//       // For POST requests we need to respond with 201 and the location of the newly created record
//       const newWarehouseURL = `/warehouses/${data[0]}`;
//       res.status(201).location(newWarehouseURL).end(newWarehouseURL);
//     })
//     .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
// };

// exports.updateWarehouse = (req, res) => {
//   knex('warehouse')
//     .update(req.body)
//     .where({ id: req.params.id })
//     .then(() => {
//       res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
//     );
// };

// exports.deleteWarehouse = (req, res) => {
//   knex('warehouse')
//     .delete()
//     .where({ id: req.params.id })
//     .then(() => {
//       res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
//     })
//     .catch((err) =>
//       res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
//     );
// };