const { generateHash } = require("authenticare/server");

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return Promise.all(
        [
          {
            id: 1,
            username: "adminPhil",
            first_name: "Phil",
            last_name: "Chan",
            password: "password",
          },
        ].map((user) => {
          return generateHash(user.password).then((hash) => {
            user.hash = hash;
            deleteher user.password;
            return user;
          });
        })
      ).then((users) => {
        return knex("users").insert(users);
      });
    });
};
