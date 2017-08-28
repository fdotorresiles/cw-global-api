'use strict';
var utl = require('../../utls/utls');


module.exports = function(Usercustom) {
    /*utl.clearBaseACLs(Usercustom, require('./user-custom.json'));

    Usercustom.afterRemote('find', function(context, remoteMethodOutput, next) {
        context.result =  context.result.filter(usercustom => Usercustom.stateId == 1)
        next();
    });*/

    Usercustom.afterRemote('create', function(ctx, user, next) {
        var app = require('../../server/server');
        var ds = app.dataSources.db;
        var RoleMapping = app.models.RoleMapping;
        var Role = app.models.Role;

        if (user.email == 'ltorres@impesa.net' || user.email == 'mauricioara.94@gmail.com') {
            Role.find({where: {name: 'admin'}, limit: 1}, function(err, rol) {
                rol[0].principals.create(
                    {
                        principalType: RoleMapping.Usercustom,
                        principalId: user.id
                    }, function(err, principal) {
                        console.log(err, principal);
                    });
            });
        } else {
            Role.find({where: {name: 'customer-user'}, limit: 1}, function(err, rol) {
                rol[0].principals.create(
                    {
                        principalType: RoleMapping.Usercustom,
                        principalId: user.id
                    }, function(err, principal) {
                        console.log(err, principal);
                    });
            });
        }
        next();
    });

    Usercustom.on('resetPasswordRequest', function (info, next) {
        var app = require('../../server/server');
        var Email = app.models.Email;
        //var url = 'https://beta.spendamessage.com/reset' + '?access_token=' + info.accessToken.id;
        var url = 'https://crawling-domain.appspot.com/#/reset/' + info.accessToken.id + "/" + info.accessToken.userId;
        var html = 'Click <a href="' + url + '">here</a> to reset your password';
        Email.send({
        to: info.email,
        from: '',
        subject: 'Password Reset',
        html: html
        }, function (err ,email) {
            if (err) {
                
            }
            
        });
    });

};
