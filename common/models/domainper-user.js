'use strict';

var async = require("async");

module.exports = function(Domainperuser) {
    var app = require('../../server/server');
    var ds = app.dataSources.db;
    /*Domainperuser.afterRemote('find', function(context, remoteMethodOutput, next) {
        context.result =  context.result.filter(domainperuser => domainperuser.active == true)
        next();
    });*/

    Domainperuser.remoteMethod('getAllWorkingWords', {
      http: {path: '/getAllWorkingWords', verb: 'get'},
      returns: {arg: 'result', type: 'Object'},
    });

    Domainperuser.getAllWorkingWords = function(cb) {
      var sql = "CALL GetAllWordDomianperUser()";
      ds.connector.query(sql, function(err, data) {
        if (err) {
          console.log('Error:', err);
        }

        if (data[0].length > 0){
            var result = [];

            async.each(data[0], function(element, next) {
                var sql = "CALL GetAllWorkinUserTagPerItem('" + element.periodicity + "', " + element.domainid + ", '" + element.tag + "')";
                    ds.connector.query(sql, function(err, data) {
                        if (err) {
                            console.log('Error:', err);
                        }
                        var item = {
                            "periodicity": element.periodicity,
                            "domainid": element.domainid,
                            "domainxuserId": element.domainxUserId,
                            "tag": element.tag,
                            "url": element.url,
                            "key": element.key,
                            "cx": element.cx,
                            "items": data[0].length > 0 ? data[0] : null 
                        }
                        result.push(item)
                        next()
                    })
            }, function(err) {
                cb(null, result);    
            });
        } else {
            cb(null, data);
        }
      });
    };

    Domainperuser.remoteMethod('getNotification', {
      accepts: [{arg: 'domainxuserId', type: 'string', required: true}],
      http: {path: '/getNotification/:domainxuserId', verb: 'get'},
      returns: {arg: 'result', type: 'Object'},
    });

    Domainperuser.getNotification = function(domainxuserId, cb) {
        
        const getProducts = (category, id) => new Promise((resolve, reject) => {
            console.log(id);
            const Product = app.models.Product;
            Product.find({where: {and: [
                {category: {like: id}},
                {enabled: true},
            ]}},
            (error, products) => {
            if (error) {
                reject(error);
            } else {
                console.log(products);
                category.products = products;
                resolve(category);
            }
            });
        });
      
        cb(null, data);
    };

};
