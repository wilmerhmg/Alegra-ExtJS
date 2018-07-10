Ext.define('Alegra.store.taxs.StoreTax', {
	extend: 'Ext.data.Store',
	fields: ["id", "name", "percentage", "description", "status", "type"],
	proxy: {
		type: 'ajax',
		url: REST.API_DOMAIN + REST.API_TAXSES,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	}
});