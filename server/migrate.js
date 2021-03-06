var server = require('./server');
var ds = server.dataSources.db;
var lbTables = [
				'AccessToken',
        'UserCustom',
				'Domain',
				'DomainperUser',
				'TagperDomainxUser',
				'StateCatalog',
				'ACL',
				'RoleMapping',
				'Role',
				'Notification'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});
