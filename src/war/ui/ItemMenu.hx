package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import war.items.Item;
import war.items.Slot;
import war.items.ItemStorage;
import war.items.Inventory;
import war.player.Avatar;
import war.weapons.Weapon;
import war.weapons.WeaponLevelPurchase;

import tannus.geom.*;
import tannus.events.MouseEvent;

using war.ds.PurchaseTools;

class ItemMenu extends ContextMenu {
	/* Constructor Function */
	public function new(i:ItemListItem):Void {
		super();

		itm = i;

		generate();
	}

/* === Instance Methods === */

	/**
	  * generate the buttons in [this] menu
	  */
	private function generate():Void {
		if (!itm.slot.free) {
			sellButton();
			dropButton();

			if (Std.is(itm.item, Weapon)) {
				weaponButtons(cast itm.item);
			}
		}
	}

	/**
	  * add the 'Sell' button
	  */
	private function sellButton():Void {
		var i = itm.item;
		var value:Int = (i.base_value() * (i.canStack ? i.count : 1));
		button('Sell for $$$value', function() {
			player.money += value;
			itm.slot.item = null;
		});
	}

	/**
	  * add the 'Drop' button
	  */
	private function dropButton():Void {
		button('Drop', function() {
			var d = inv.drop(inv.indexOf(itm.slot));
			d.pos = (player.pos + [40, 40]);
			player.game.stage.addChild( d );
			itm.slot.item = null;
		});
	}

	/**
	  * add the buttons for various types of purchases
	  */
	private function weaponButtons(w : Weapon):Void {
		var lvlup = new WeaponLevelPurchase( w );
		addPurchase(lvlup, player);
	}

/* === Computed Instance Fields === */

	private var inv(get, never):Inventory;
	private inline function get_inv():Inventory {
		return cast(itm.item.storage, Inventory);
	}

	private var player(get, never):Avatar;
	private inline function get_player():Avatar {
		return cast(inv.owner, Avatar);
	}

/* === Instance Fields === */

	public var itm : ItemListItem;
}
