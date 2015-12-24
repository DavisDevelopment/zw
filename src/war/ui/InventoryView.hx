package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.graphics.Color;
import tannus.events.*;

import war.ui.ItemList;
import war.items.Inventory;
import war.player.Avatar;

class InventoryView extends Page {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		super();

		player = p;
		items = new ItemList( player.inventory );
		items.itemPadding.horizontal = 100;
		items.itemPadding.vertical = 6;
		items.padding.bottom = 4;
		hud = new HUD(p.game.stage, p.game);
		hud.addItem(new CashDisplay(p));

		generate();
	}

/* === Instance Methods === */

	/**
	  * generate the content of [this] Page
	  */
	private function generate():Void {
		addChild( items );
		addChild( hud );
	}

	/**
	  * stuff to do when [this] page closes
	  */
	override public function close():Void {
		super.close();
		if (prev_page != null)
			prev_page.open();
	}

	override private function get_contentRect():Rectangle {
		return new Rectangle(0, 0, stage.width, items.contentHeight());
	}

/* === Instance Fields === */

	public var items : ItemList;
	public var hud : HUD;
	private var player : Avatar;
}
