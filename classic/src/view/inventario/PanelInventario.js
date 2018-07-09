Ext.define('Alegra.view.inventario.PanelInventario', {
	extend: 'Ext.Panel',
	xtype: 'panelinventario',
	controller: 'panelitemsctr',
	tbar: [
		{
			text: 'Create Item',
			iconCls: 'x-fa fa-plus',
			handler: 'adminItem'
		}, '->', {
			xtype: 'textfield',
			emptyText: 'Search item',
			width: 300
		}
	],
	items: [{
		region: 'center',
		layout: 'fit',
		xtype: 'panel',
		items: [
			{
				title: 'Inventory',
				xtype: 'gridinventario',
				reference: 'gridlistado',
				listeners: {
					rowclick: 'runActions'
				}
			}
		]

	}, {
		height: 100,
		region: 'south',
		html: 'border sur'
	}]
});
