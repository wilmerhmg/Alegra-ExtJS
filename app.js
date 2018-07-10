/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
	extend: 'Alegra.Application',

	name: 'Alegra',

	requires: [
		// This will automatically load all classes in the Alegra namespace
		// so that application classes do not need to require each other.
		'Ext.window.Toast',
		'Alegra.*',
		'Alegra.view.inventario.PanelInventario',
		'Alegra.view.inventario.form.FormItem',
		'Alegra.view.inventario.form.FormUploadItem',
		'Alegra.store.taxs.StoreTax',
		'Alegra.view.inventario.form.ComboTax',
		'Alegra.store.categories.StoreCategory',
		'Alegra.view.inventario.form.ComboCategory',
		'Alegra.store.inventario.StoreInventario',
		'Alegra.view.inventario.GridInventario',
		'Alegra.view.items.PanelItemsController'
	],

	// The name of the initial view to create.
	mainView: 'Alegra.view.main.Main',
});

window.Notify = function (response, status, callback) {
	let CODES = {
		200: {
			style: 'background:#43a047; color:#FFF',
			message: 'Operation completed successfully'
		},
		201: {
			style: 'background:#43a047; color:#FFF',
			message: 'Record saved successfully'
		},
		400: {
			style: 'background:#f0f4c3;',
			message: 'Check all the information'
		},
		404: {
			style: 'background:#f0f4c3;',
			message: 'Not Found'
		},
		500: {
			style: 'background:#e53935; color:#FFF',
			message: 'Oops! Internal Server Error. Try again later'
		}
	};

	Ext.toast({
		html: response.message || CODES[status].message,
		bodyStyle: CODES[status].style,
		autoCloseDelay: 10000
	});

	(typeof callback === 'function') ? callback() : null;
};