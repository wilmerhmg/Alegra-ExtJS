Ext.define('Alegra.view.inventario.form.ComboTax', {
	extend: 'Ext.form.field.ComboBox',
	xtype: 'combotax',
	fieldLabel: 'Tax',
	displayField: 'name',
	valueField: 'id',
	editable: false,
	autoLoadOnValue:true,
	initComponent: function () {

		Ext.apply(this, {
			store: Ext.create('Alegra.store.taxs.StoreTax'),
			tpl: Ext.create('Ext.XTemplate',
				'<ul class="x-list-plain"><tpl for=".">',
				'<li role="option" class="x-boundlist-item">{id}. {name} - ({percentage}%) </li>',
				'</tpl></ul>'
			),
			// template for the content inside text field
			displayTpl: Ext.create('Ext.XTemplate',
				'<tpl for=".">',
				'{id}. {name} - {percentage}%',
				'</tpl>'
			)
		});
		this.callParent();
	}
});