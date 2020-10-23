exports.up = function (knex) {
  return knex.schema.table("users", (table) => {
    table.string("first_name");
    table.string("last_name");
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("first_name");
    table.dropColumn("last_name");
  });
};
