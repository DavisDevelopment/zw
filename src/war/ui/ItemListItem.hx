package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.ListItem;
import gryffin.ui.Padding;
import gryffin.ui.ContextMenu;

import tannus.geom.*;
import tannus.events.MouseEvent;

import war.items.Item;
import war.items.Slot;
import war.weapons.Weapon;
import war.weapons.WeaponLevelPurchase;

import tannus.math.TMath.*;

using war.ds.PurchaseTools;

class ItemListItem extends ListItem {
	/* Constructor Function */
	public function new(s : Slot):Void {
		super();

		slot = s;
		padding = new Padding();
		nameBox = new TextBox();
		hovered = false;
		menu = null;
		initBox( nameBox );
		on('contextmenu', ctxMenu);
	}

/* === Instance Methods === */

	/**
	  * update [this] item
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		if ( !slot.free ) {
			var txt:String = ((item.canStack ? item.count+'' : '') + ' ' + item.name);
			if (Std.is(item, Weapon)) {
				var wep:Weapon = cast item;
				txt += '\ndmg: ${wep.damage}';
			}
			nameBox.text = txt;
		}
		else {
			nameBox.text = 'Empty';
		}

		var mp:Null<Point> = stage.getMousePosition();
		if (mp != null) {
			hovered = containsPoint( mp );
			if ( hovered ) {
				stage.cursor = 'pointer';
			}
		}
		else {
			hovered = false;
		}
	}

	/**
	  * render [this] item
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);
		c.save();
		/* draw the the box background */
		c.beginPath();
		c.strokeStyle = '#666';
		c.fillStyle = '#FFFFCC';
		c.rect(x, y, w, h);
		c.closePath();
		c.fill();
		c.stroke();

		/* draw the name */
		c.drawComponent(nameBox, 0, 0, nameBox.width, nameBox.height, (padding.left + x), (padding.top + y), nameBox.width, nameBox.height);

		c.restore();
	}

	/**
	  * do the stuff
	  */
	override public function containsPoint(p : Point):Bool {
		if (menu != null && menu.containsPoint(p)) {
			return false;
		}
		else {
			return super.containsPoint( p );
		}
	}

	/**
	  * when the user clicks [this] Item
	  */
	@on('click')
	public static function click(self:ItemListItem, e:MouseEvent):Void {
		trace('you clicked me!');
	}

	/**
	  * when the user right-clicks
	  */
	private function ctxMenu(e : MouseEvent):Void {
		e.cancel();

		if (menu != null) {
			menu.delete();
			menu = null;
		}

		menu = new ItemMenu( this );
		menu.target = e.position;
		function outsideMenu(e : MouseEvent):Void {
			if (!menu.containsPoint(e.position)) {
				menu.delete();
				menu = null;
				stage.off('click', outsideMenu);
				stage.off('contextmenu', outsideMenu);
			}
		}
		stage.on('click', outsideMenu);
		stage.on('contextmenu', outsideMenu);
		parent.addSibling( menu );
	}

	/**
	  * initialize a TextBox
	  */
	private function initBox(box : TextBox):Void {
		box.fontFamily = 'Ubuntu';
		box.multiline = true;
	}

/* === Computed Instance Fields === */

	/* the width of [this] */
	override private function get_w():Float {
		var res:Float = (padding.horizontal + nameBox.width);
		return res;
	}

	/* the height of [this] */
	override private function get_h():Float {
		var res:Float = (padding.top + nameBox.height + padding.bottom);
		return res;
	}

	/* the item that [this] refers to */
	public var item(get, never):Null<Item>;
	private inline function get_item():Null<Item> {
		return slot.item;
	}

/* === Instance Fields === */

	public var slot : Slot;
	public var nameBox : TextBox;
	public var padding : Padding;
	public var hovered : Bool;
	public var menu : Null<ItemMenu>;
}
