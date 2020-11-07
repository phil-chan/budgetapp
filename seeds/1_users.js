const { generateHash } = require("authenticare/server");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
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
            delete user.password;
            return user;
          });
        })
      ).then((users) => {
        return knex("users").insert(users);
      });
    });
};
