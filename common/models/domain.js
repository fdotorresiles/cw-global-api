const app = require('../../server/server');

module.exports = function(Domain) {

    /*Domain.revEngine = function(sound, cb) {
        cb(null, sound - ' ' - sound - ' ' - sound);
    };

    Domain.remoteMethod(
        'revEngine',
        {
        accepts: [{arg: 'sound', type: 'string'}],
        returns: {arg: 'engineSound', type: 'string'},
        http: {path:'/rev-engine', verb: 'post'}
        }
    );
    // remote method before hook
    Domain.beforeRemote('revEngine', function(context, unused, next) {
        console.log('Putting in the car key, starting the engine.');
        next();
    });

    // remote method after hook
    Domain.afterRemote('revEngine', function(context, remoteMethodOutput, next) {
        console.log('Turning off the engine, removing the key.');
        next();
    }); */

    Domain.afterRemote('find', function(context, remoteMethodOutput, next) {
        context.result =  context.result.filter(domain => domain.active == true)
        next();
    });

    Domain.beforeRemote('create', function(context, remoteMethodOutput, next) {
        Domain.findOne({where: {name: context.args.data.name}},
            (error, found) => {
            if (found) {
                    next(new Error('This domain is already exists'));
                } else {
                    next();
                }
        });
    });


    /*Domain.getAll = function(cb) {
        cb(
            Domain.find(domain => domain.active == true)
        );
    };

    Domain.remoteMethod('getAll', {
        description: ["Return all data model in the database"],
        returns: {arg: 'result', type: 'array'},
        http: {path:'/getAll', verb: 'get'}
        }
    );*/
    
};
