Ext.define('Alegra.view.inventario.form.ComboCategory', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'combocategory',
	fieldLabel: 'Chose Category',
	displayField: 'name',
	valueField: 'id',
	editable: false,
	autoLoadOnValue:true,
	initComponent: function () {

		Ext.apply(this, {
			store: Ext.create('Alegra.store.categories.StoreCategory'),
			tpl: Ext.create('Ext.XTemplate',
				'<ul class="x-list-plain"><tpl for=".">',
				'<li role="option" class="x-boundlist-item" style="text-transform: capitalize;">{name}</li>',
				'</tpl></ul>'
			),
			bodyStyle: 'text-transform: capitalize;',
			displayTpl: Ext.create('Ext.XTemplate',
				'<tpl for=".">',
				'{name:uppercase}',
				'</tpl>'
			)
		});
		this.callParent();
	}
});