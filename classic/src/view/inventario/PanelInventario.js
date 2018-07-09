Ext.define('Alegra.view.inventario.PanelInventario', {
	extend: 'Ext.Panel',
	xtype: 'panelinventario',
	controller: 'panelitemsctr',
	tbar: [
		{
			text: 'Create Item',
			iconCls: 'x-fa fa-plus',
			handler: 'initItem'
		}/*, '->', {
			xtype: 'textfield',
			emptyText: 'Search item',
			width: 300,
			enableKeyEvents: true,
			keyup: function (target, event, options) {
				console.log(new Date());
			}
		}*/
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
					itemclick: 'showItemDetail',
					rowclick: 'runActions'
				}
			}
		]

	}, {
		region: 'south',
		reference: 'item-detalle',
		tpl: `<tpl if="id"><div class="detail-content">
				<div class="row">
					<h1>{name}</h1>
				</div>
				<div class="row">
					<table class="table-details-vertical left">
						<tbody>
						<tr>
							<td>Code</td>
							<td class="important">{id}</td>
						</tr>
						<tr>
							<td>Reference</td>
							<td>{reference}</td>
						</tr>
						<tr>
							<td>Name</td>
							<td>{name}</td>
						</tr>
			
						<tr>
							<td>Price</td>
							<td>
								<tpl for="price">
								<table class="item-price-list">
									<tbody>
									<tr>
										<td class="currency">{price}</td>
										<td class="title">{name:uppercase}</td>
									</tr>
									</tbody>
								</table>
								</tpl>
							</td>
						</tr>
						<tr>
							<td>Tax</td>
							<td>
								<tpl for="tax">
								<table>
									<tbody>
									<tr>
										<td class="currency">{name} - {percentage}% </td>
										<td class="title">{description}</td>
									</tr>
									</tbody>
								</table>
								</tpl>
							</td>
						</tr>
						<tr>
							<td>Detail</td>
							<td>{description}</td>
						</tr>
						<tr>
							<td>Category</td>
							<td>{category.name:uppercase}</td>
						</tr>
						<tr>
							<td>Attachments</td>
							<td>
								<tpl for="attachments">
								<div class="image-download">
                        			<a href="{url}" target="_blank">Download - {name}</a>
                    			</div>
                    			</tpl>							
							</td>
						</tr>
						</tbody>
					</table>
					<tpl if="images">
					<div class="itemImage">
						<tpl for="images">
							<img src="{url}" alt="">
						</tpl>						
					</div>
					</tpl>
				</div>
			</div></tpl>`
	}]
});
