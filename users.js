let fs = require('fs');
let util = require('util');

const readFile = util.promisify(fs.readFile);


function fileExist(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.F_OK, (err) => {
            if (err) {
                console.error(err)
                return reject(err);
            }
            resolve();
        })
    });
}

async function addUser(e) {
    const data = await getFileContents();

    let users = { users: []};
    if (data) {
        users = JSON.parse(data);
        users.users.push(e);
    
    } else {
        users.users.push(e);
    }
    fs.writeFile("users.json", JSON.stringify(users), "utf8", (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("File successfully written to!");
        }
    });
}


async function getFileContents() {
    try {
        await fileExist("users.json");
        let res = await readFile("users.json", "utf8");
        return res;
    } catch (error) {
        console.log(error);
        return false;
    }

}


function retrieveAllUsers() {
    return getFileContents().then((data) => {
        let users = JSON.parse(data);
        return users;
    });

    

}

function deleteUser(id) {
    getFileContents().then((data) => {
        let users = JSON.parse(data);
        
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].id === id) {

                users.users.splice(i, 1);
            }
        }

        fs.writeFile("users.json", JSON.stringify(users), "utf8", (err) => {
            if (err) {
                console.log(err);
                return false;
            } else {
                console.log("File successfully written to!");
                return true;
            }
        });

    });

}

module.exports = {
    add: addUser,
    retrieve: retrieveAllUsers,
    delete: deleteUser
}