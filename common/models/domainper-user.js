'use strict';

module.exports = function(Domainperuser) {

    Domainperuser.afterRemote('find', function(context, remoteMethodOutput, next) {
        context.result =  context.result.filter(domainperuser => domainperuser.active == true)
        next();
    });

};
