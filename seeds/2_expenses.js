exports.seed = function (knex) {
  return knex("expenses")
    .del()
    .then(function () {
      return knex("expenses").insert([
        {
          id: 1,
          expense_name: "Nandos",
          expense_description: "Chicken and friends",
          category: "Food",
          cost: 42.0,
          date: new Date('02/03/19'),
          user_id: 1,
        },
        {
          id: 2,
          expense_name: "Six60 Ticket",
          expense_description: "Concert ticket",
          category: "Entertainment",
          cost: 420,
          date: new Date('01/01/20'),
          user_id: 1,
        },
        {
          id: 3,
          expense_name: "Petrol",
          expense_description: "Filling up car",
          category: "Travel",
          cost: 69.0,
          date: new Date('04/05/20'),
          user_id: 1,
        },
      ]);
    });
};
