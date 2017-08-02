'use strict';

module.exports = function(Tagperdomainxuser) {

    Tagperdomainxuser.afterRemote('find', function(context, remoteMethodOutput, next) {
        context.result =  context.result.filter(tagperdomainxuser => tagperdomainxuser.active == true)
        next();
    });

};
