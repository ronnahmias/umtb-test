const axios = require("axios");
const fs = require("fs");
const { emailValid, phoneValid } = require("./validations");

function fetchUsers() {
  return new Promise((resolve, reject) => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data;
        const filteredUsers = users.filter(
          (user) =>
            user.email && emailValid(user.email) && phoneValid(user.phone)
        );
        const processedUsers = filteredUsers.map((user) => ({
          email: user.email,
          userCode: user.id,
          displayName: user.name,
          company: user.company.name,
          address: [user.address.city, user.address.street].join(", "),
        }));
        resolve(processedUsers);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function saveUsersToFile(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile("app-users.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { fetchUsers, saveUsersToFile };
