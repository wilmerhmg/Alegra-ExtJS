Ext.define('Alegra.view.items.PanelItemsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.panelitemsctr',
	showItemDetail: function (grid, rec) {
		let detail = this.lookupReference('item-detalle');
		detail.update(rec.data);
	},
	runActions: function (grid, record, element, rowIndex, e, eOpts) {
		let target = e.getTarget(null, null, true);

		if(target.dom.className.indexOf('fa-pencil') !== -1) {
			this.adminItem(record, grid);
		} else if(target.dom.className.indexOf('fa-trash') !== -1) {
			this.delteItem(record, rowIndex, grid);
		} else if(target.dom.className.indexOf('fa-paperclip') !== -1) {
			this.attachmentItem(record, rowIndex, grid);
		}
	},
	initItem: function (target) {
		this.adminItem({data: null}, target.up('panel').down('gridinventario'));
	},
	search: function (target) {
		console.log(new Date());
	},
	adminItem: function (record, grid) {
		let ItemWindow = Ext.create('Ext.Window', {
			modal: true,
			title: (record.data) ? 'Edit: ' + (record.data.name) : 'New Item',
			height: 270,
			width: 600,
			layout: 'fit',
			items: [{
				xtype: 'formitem'
			}],
			buttons: [{
				text: 'Close',
				handler: function () {
					ItemWindow.close();
				}
			}, {
				text: 'Save',
				iconCls: 'x-fa fa-save',
				handler: function () {
					let form = this.up('window').down('formitem');
					if(form.isValid())
						form.doSubmit(grid);
				}
			}]
		});

		ItemWindow.show();
		record.data ? ItemWindow.down('formitem').doLoad(record.data) : null;
	},
	delteItem: function (record, rowIndex, grid) {
		let rec = grid.getStore().getAt(rowIndex);
		let inf = this.lookupReference('item-detalle');
		setTimeout(function () {
			inf.update(null);
		}, 100);
		Ext.Msg.confirm('Delete Item', 'Are you sure you want to delete the item?<br/>This operation can not be undone. ', function (rta) {
			if(rta !== 'yes') return;

			let myPanel = Ext.create('Ext.Window', {
				modal: true,
				title: 'Deleting...',
				height: 100,
				width: 200,
				layout: 'fit'
			});

			let loadMask = new Ext.LoadMask({
				msg: 'Please wait...',
				target: myPanel
			});
			myPanel.show();
			loadMask.show();

			Ext.Ajax.request({
				url: REST.API_DOMAIN + REST.API_DELETE + record.data.id,
				success: function (response, opts) {
					grid.store.load();
					loadMask.hide();
					myPanel.close();
					Notify(Ext.decode(response.responseText), response.status);
				},
				failure: function (response, opts) {
					loadMask.hide();
					myPanel.close();
					Notify(Ext.decode(response.responseText), response.status);
				}
			});

		}, this);
	},
	attachmentItem: function (record, rowIndex, grid) {
		let ItemWindow = Ext.create('Ext.Window', {
			modal: true,
			title: 'Upload: ' + (record.data.name),
			height: 120,
			width: 300,
			layout: 'fit',
			items: [{
				xtype: 'formuploaditem'
			}],
			buttons: [{
				text: 'Close',
				handler: function () {
					ItemWindow.close();
				}
			}, {
				text: 'Upload',
				iconCls: 'x-fa fa-upload',
				handler: function () {
					let form = this.up('window').down('formuploaditem');
					if(form.isValid())
						form.doSubmit(grid);
				}
			}]
		});

		ItemWindow.show();
		ItemWindow.down('formuploaditem').doLoad(record.data);
	}
});