Ext.define('Alegra.store.inventario.StoreInventario', {
	extend: 'Ext.data.Store',
	fields: ["id", "name", "description", "reference", "status", "category", "price", "tax", "images"],
	proxy: {
		type: 'ajax',
		url: REST.API_DOMAIN + REST.API_LIST,
		reader: {
			type: 'json',
			rootProperty: 'data',
			totalProperty: 'total'
		}
	}
});