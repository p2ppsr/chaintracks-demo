// src/migrations/yyyy-mm-dd-001-add-chaintracks.js
const { migrations } = require('@cwi/chaintracks-storage-engine-knex')({
  // No need to pass in "knex" when using migrations, just pass your table name.
  // If you use the default table name, just call with no parameters
  headerTableName: 'chaintracks_header'
})

exports.up = async knex => {
  await migrations[0].up(knex) // This creates your Chaintracks table
}

exports.down = async knex => {
  await migrations[0].down(knex) // This drops your Chaintracks table
}
