package war.ds;

import war.player.Avatar;
import war.ds.Purchase;

import gryffin.ui.ContextMenu;

class PurchaseTools {
	/**
	  * Add a Purchase to a ContextMenu as a Button
	  */
	public static function addPurchase(menu:ContextMenu, buy:Purchase, player:Avatar):Void {
		menu.item({
			'label': buy.name,
			'click': function() {
				if (buy.canAfford(player)) {
					buy.make(player);
				}
			}
		});
	}
}
