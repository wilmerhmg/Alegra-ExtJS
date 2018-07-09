Ext.define('Alegra.view.inventario.GridInventario', {
	extend: 'Ext.grid.Panel',
	xtype: 'gridinventario',
	initComponent: function () {
		let StoreItems = Ext.create('Alegra.store.inventario.StoreInventario', {
			autoLoad: true
		});
		Ext.apply(this, {
			store: StoreItems,
			minHeight: 300,
			columns: [{
				text: 'Name',
				dataIndex: 'name',
				flex: 1
			}, {
				text: 'Price (USD)',
				dataIndex: 'price',
				width: 160,
				renderer: function (price) {
					return Ext.util.Format.usMoney(price[0].price);
				}
			}, {
				text: 'Category',
				dataIndex: 'category',
				width: 120,
				menuDisabled: true,
				styleBody: 'text-align: right;',
				renderer: function (category) {
					return Ext.util.Format.capitalize(category.name);
				}
			}, {
				text: 'Reference',
				dataIndex: 'reference',
				width: 120,
				menuDisabled: true
			}, {
				text: 'Status',
				dataIndex: 'status',
				width: 80,
				menuDisabled: true,
				renderer: function (status) {
					return Ext.util.Format.capitalize(status);
				}
			}, {
				text: 'Description',
				dataIndex: 'description',
				width: 240,
				menuDisabled: true
			}, {
				xtype: 'actioncolumn',
				text: 'Options',
				width: 80,
				styleBody: 'text-aling:center !important',
				items: [{
					iconCls: 'x-fa fa-eye',
					tooltip: 'View in detail',
					id: 'item-view',
					handler: function (grid, rowIndex, colIndex) {
						let rec = grid.getStore().getAt(rowIndex);
						alert("Edit " + rec.get('id'));
					}
				}, {
					iconCls: 'x-fa fa-pencil',
					tooltip: 'Edit',
					id: 'item-id'
				}, {
					iconCls: 'x-fa fa-paperclip',
					tooltip: 'Upload attachment',
					handler: function (grid, rowIndex, colIndex) {
						let rec = grid.getStore().getAt(rowIndex);
						alert("Edit " + rec.get('id'));
					}
				}, {
					iconCls: 'x-fa fa-trash',
					tooltip: 'Delete'
				}]
			}],
			dockedItems: [{
				xtype: 'pagingtoolbar',
				store: StoreItems,
				dock: 'bottom',
				displayInfo: true
			}]
		});
		this.callParent();
	}
});