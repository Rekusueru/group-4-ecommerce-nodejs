const db = require(' ../config/db');
const cont = {
    create:(data, callback )=>{
        const query = "insert into econtact(first_name,last_name,email,message) values(?,?,?,?)";
        db.query(query,[data.first_name, data.last_name,data.email,data.message],callback);

    }
};
module.exports = cont;