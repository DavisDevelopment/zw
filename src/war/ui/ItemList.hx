package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.List;
import gryffin.ui.Padding;

import tannus.geom.*;

import war.items.ItemStorage in Items;

import tannus.math.TMath.*;

using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.TMath;

class ItemList extends List<ItemListItem> {
	/* Constructor Function */
	public function new(i : Items):Void {
		super();

		itemList = i;
		padding = new Padding();
		itemPadding = new Padding();
		pos = new Point();
		max_width = 0;

		genViews();
	}

/* === Instance Methods === */

	/* get the initial position */
	override public function firstPos():Point {
		return pos.clone();
	}

	/* update the position of one of our items */
	override private function positionItem(p:Point, item:ItemListItem):Void {
		item.padding.copyFrom( itemPadding );
		p.y += padding.top;
		item.x = p.x;
		item.y = p.y;
		max_width = max(max_width, item.w);
		p.y += item.h;
		p.y += padding.bottom;
	}

	/**
	  * do the stuff
	  */
	private function genViews():Void {
		for (slot in itemList) {
			var item = new ItemListItem(slot);
			item.padding.copyFrom( itemPadding );
			addItem( item );
		}
	}

	/**
	  * close all contextmenus
	  */
	public function closeAllMenus():Void {
		for (item in items) {
			if (item.menu != null) {
				item.menu.delete();
				item.menu = null;
			}
		}
	}

	/**
	  * get the total content height
	  */
	public function contentHeight():Float {
		return items.macmap( _.h ).sum();
	}

	/**
	  * check if the given point lies within our bounds
	  */
	override public function containsPoint(p : Point):Bool {
		for (i in items) {
			if (i.containsPoint( p ))
				return true;
		}
		return false;
	}

/* === Instance Fields === */

	public var itemList : Items;
	private var max_width : Float;
	public var pos : Point;
	public var padding : Padding;
	public var itemPadding : Padding;
}
