package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import war.items.Item;
import war.items.Inventory;
import war.player.Avatar;
import war.ui.HUDItem;

import tannus.geom.*;
import tannus.math.TMath.*;
import tannus.events.MouseEvent;

class EquippedDisplay extends HUDItem {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		super(p.game.stage, p.game.world);

		player = p;
		box = new TextBox();
		box.multiline = true;
		box.fontFamily = 'Ubuntu';
		icon = null;
		lastItem = null;

		margin.top = 20;
	}

/* === Instance Methods === */

	/**
	  * update [this]
	  */
	override public function update(stage : Stage):Void {
		super.update(stage);

		var i = item;
		if (i == null) {
			box.text = 'None';
			icon = Canvas.create(100, 100);
		}
		else {
			var _txt = box.text;
			box.text = i.hudText();
			if (i != lastItem) {
				icon = i.draw(100, 100);
			}
		}

		lastItem = i;
	}

	/**
	  * render [this]
	  */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);

		if (icon == null)
			return ;

		var br:Rectangle = boxRect();
		var ir = iconRect();

		// draw the icon
		c.drawComponent(icon, 0, 0, icon.width, icon.height, ir.x, ir.y, ir.w, ir.h);

		// draw the border
		c.beginPath();
		c.strokeStyle = '#666';
		c.lineWidth = 2;
		c.rect(ir.x, ir.y, ir.w, ir.h);
		c.closePath();
		c.stroke();
		
		// draw the text
		c.drawComponent(box, 0, 0, box.width, box.height, br.x, br.y, br.w, br.h);
	}

	/* rectangle that [box] occupies */
	private inline function boxRect():Rectangle {
		return new Rectangle(x, (y + margin.top + icon.height + 8), box.width, box.height);
	}

	private inline function iconRect():Rectangle {
		return new Rectangle((x + ((w - icon.width) / 2)), y, icon.width, icon.height);
	}

	override private function get_w():Float {
		return (margin.horizontal + max(box.width, (icon != null ? icon.width : 0)));
	}

	override private function get_h():Float {
		return (8 + margin.vertical + box.height + (icon != null ? icon.height : 0));
	}

	/* check whether the given Point lies within [this]'s content area */
	override public function containsPoint(p : Point):Bool {
		return (boxRect().containsPoint(p) || iconRect().containsPoint(p));
	}

	/**
	  * when [this] item gets clicked
	  */
	public function click(e : MouseEvent):Void {
		var kbe = new tannus.events.KeyboardEvent('keyfake', 69);
		player.pressedQ( kbe );
	}

/* === Computed Instance Fields === */

	private var inv(get, never):Inventory;
	private inline function get_inv():Inventory return player.inventory;

	private var item(get, never):Null<Item>;
	private inline function get_item():Null<Item> {
		return inv.equippedItem;
	}

/* === Instance Fields === */

	public var player : Avatar;
	public var box : TextBox;
	public var icon : Null<Canvas>;

	private var lastItem : Null<Item>;
}
