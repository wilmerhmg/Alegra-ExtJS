Ext.define('Alegra.view.inventario.form.FormUploadItem', {
	extend: 'Ext.form.Panel',
	xtype: 'formuploaditem',
	layout: 'vbox',
	bodyPadding: 10,
	initComponent: function () {
		Ext.apply(this, {
			items: [{
				xtype: 'filefield',
				name: 'attachment',
				fieldLabel: 'Image or file',
				allowBlank: false,
				width: '100%',
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
			url: REST.API_DOMAIN + REST.API_ATTACH + data.id,
			scope: this,
			headers: {'Access-Control-Allow-Origin': REST.API_DOMAIN},
			success: function (form, result) {
				console.info(result);
				loadMask.hide();
				ItemForm.close();
				grid.getStore().load();
			},
			failure: function (form, result) {
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
	}
});