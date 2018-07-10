Ext.define('Alegra.view.inventario.form.FormItem', {
	extend: 'Ext.form.Panel',
	xtype: 'formitem',
	layout: 'vbox',
	bodyPadding: 10,
	initComponent: function () {
		Ext.apply(this, {
			items: [{
				region: 'center',
				width: '100%',
				layout: 'hbox',
				items: [{
					xtype: 'panel',
					flex: 1,
					defaults: {
						width: '100%',
						labelAlign: 'right',
					},
					items: [{
						xtype: 'textfield',
						fieldLabel: '* Name',
						name: 'name',
						allowBlank: false,
						maxLength: 150,
						enforceMaxLength: true
					}, {
						xtype: 'combocategory',
						name: 'category[id]',
					}, {
						xtype: 'textfield',
						fieldLabel: 'Reference',
						name: 'reference',
						allowBlank: true,
						maxLength: 45,

						enforceMaxLength: true
					}]
				}, {
					xtype: 'panel',
					flex: 1,
					defaults: {
						width: '100%',
						labelAlign: 'right',
					},
					items: [{
						xtype: 'numberfield',
						fieldLabel: '* Value (USD)',
						name: 'price[][price]',
						minValue: 0,
						allowBlank: false,
						allowDecimals: true
					}, {
						xtype: 'combotax',
						name: 'tax'
					}, {
						xtype: 'filefield',
						fieldLabel: "Image or File",
						name: 'attachment'
					}]
				}]
			}, {
				width: '100%',
				xtype: 'textareafield',
				name: 'description',
				fieldLabel: 'Description',
				labelAlign: 'top',
				maxLength: 500,
				maxRows: 8,
				enforceMaxLength: true
			}, {
				xtype: 'hiddenfield',
				name: 'id'
			}]
		});
		this.callParent();
	},
	doSubmit: function (grid) {
		let loadMask = new Ext.LoadMask({
			msg: 'Please wait...',
			target: this
		});
		let ItemForm = this.up('window');
		let data     = this.getForm().getValues();

		loadMask.show();
		this.getForm().submit({
			url: REST.API_DOMAIN + ((data.id.length) ? (REST.API_PUT + data.id) : REST.API_POST),
			headers: {'Access-Control-Allow-Origin': REST.API_DOMAIN},
			scope: this,
			success: function (form, result) {
				loadMask.hide();
				ItemForm.close();
				grid.getStore().load();
			},
			failure: function (form, result) {
				console.log(result);
				let sts = result.result.code || result.response.status;
				Notify(Ext.decode(result.response.responseText), sts);
				loadMask.hide();
				(sts === 201 || sts === 200) ? ItemForm.close() : null;
				(sts === 201 || sts === 200) ? grid.getStore().load() : null;

			}
		});
	},
	doLoad: function (data) {
		this.getForm().setValues(data);
		this.getForm().setValues({'price[][price]': data.price[0].price});
		this.getForm().setValues({'category[id]': data.category.id});
	}
});