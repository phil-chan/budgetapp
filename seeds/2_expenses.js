exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("expenses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("expenses").insert([
        {
          id: 1,
          expense_name: "Nandos",
          expense_description: "Chicken and friends",
          category: "Food",
          cost: 42.0,
          date: new Date(),
          user_id: 1,
        },
        {
          id: 2,
          expense_name: "Six60 Ticket",
          expense_description: "Concert ticket",
          category: "Entertainment",
          cost: 420,
          date: new Date(),
          user_id: 1,
        },
        {
          id: 3,
          expense_name: "Petrol",
          expense_description: "Filling up car",
          category: "Travel",
          cost: 69.0,
          date: new Date(),
          user_id: 1,
        },
      ]);
    });
};