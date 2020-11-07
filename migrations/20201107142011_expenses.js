exports.up = function (knex) {
    return knex.schema.createTable("expenses", (table) => {
      table.increments("id");
      table.string("expense_name");
      table.string("expense_description");
      table.string("category");
      table.integer("cost");
      table.timestamp("date");
      table.integer("user_id").references("users.id");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("expenses");
  };
  