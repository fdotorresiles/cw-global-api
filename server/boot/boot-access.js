'use strict';

module.exports = function(server) {
    
    var ACL = server.models.ACL;
    var usermodel = server.models.UserCustom;
    var Role = server.models.Role;
    var RoleMapping = server.models.RoleMapping;
    
    //DOMAIN
    const domainOrigin = {
        name: 'Imprenta Nacional',
        url: 'https://www.imprentanacional.go.cr',
        active: true,
        createdDate: "2017-07-16",
        key: 'AIzaSyAN5Ll2fnLcbqfu9d1mIyMWyA-NvV1-UuM',
        cx: '016362743853806142283:kp9ftpxjdrm'
    };
    server.models.Domain.findOne({where: {name: domainOrigin.name}}, function(err, domian) {
        if (err) { console.log(err); }
        if (!domian) {
            server.models.Domain.create(domainOrigin, function(error, result) {
            if (error) { console.log(err); } 
            });
        }
    });
    //END DOMAIN

    //STATE
    const stateOrigin = {
        name: 'Active',
        type: '1',
        createdDate: "2017-07-16",
    };

    server.models.StateCatalog.findOne({where: {name: stateOrigin.name}}, function(err, state) {
        if (err) { console.log(err); }
        if (!state) {
            server.models.StateCatalog.create(stateOrigin, function(error, result) {
            if (error) { console.log(err); }
            });
        }
    });
    //END STATE
    
    //ROLE

    const inusers = {
        firstname: 'admin',
        lastname: 'admin',
        telephone: "70308452",
        email: "ltorres@impesa.net",
        stateId: 1,
        username: "admin",
        emailVerified: true,
        password: "admin",
        createdDate: "2017-07-16"
    };

    server.models.UserCustom.findOne({where: {email: inusers.email}}, function(err, user) {
        if (err) { console.log(err); }
        if (!user) {
            usermodel.create(inusers, function(err, users) {
                if (err) {return console.log(err);}
                //create the admin role
                Role.create({
                    name: 'admin',
                    description: 'Administrator'

                }, function(err, role) {
                    if (err) {console.log(err);}
                    role.principals.create({
                    principalType: RoleMapping.Administrator,
                    principalId: users.id
                    }, function(err, principal) {
                    console.log(err, principal);
                    });
                });
            });

            Role.create({name: 'customer-user', description: 'User role'});
            RoleMapping.belongsTo(usermodel);
            usermodel.hasMany(RoleMapping, {foreignKey: 'principalId'});
            Role.hasMany(usermodel, {through: RoleMapping, foreignKey: 'roleId'});
        }
    });
    
};