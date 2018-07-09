Ext.define('Alegra.view.items.PanelItemsController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.panelitemsctr',
	showItemDetail: function (grid, rec) {
		console.info(grid, rec);
	},
	runActions: function (grid, record, element, rowIndex, e, eOpts) {
		var target = e.getTarget(null, null, true);

		if(target.dom.className.indexOf('fa-pencil') !== -1) {
			this.adminItem(record, grid);
		} else if(target.dom.className.indexOf('fa-trash') !== -1) {
			this.delteItem(record, rowIndex, grid);
		}
	},
	adminItem: function (record, grid) {
		grid           = grid || this.up('window').down('gridinventario');
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
					grid.store.remove(rec);
					loadMask.hide();
					myPanel.close();
					Notify(Ext.decode(response.responseText), response.status);
				},
				failure: function (response, opts) {
					console.log('server-side failure with status code ' + response);
					loadMask.hide();
					myPanel.close();
					Notify(Ext.decode(response.responseText), response.status);
				}
			});

		}, this);
	}
});