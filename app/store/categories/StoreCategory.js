Ext.define('Alegra.store.categories.StoreCategory', {
	extend: 'Ext.data.Store',
	fields: ["id", "idParent", "name", "description", "type", "readOnly"],
	proxy: {
		type: 'ajax',
		url: REST.API_DOMAIN + REST.API_CATS,
		reader: {
			type: 'json',
			rootProperty: 'data'
		}
	},
});