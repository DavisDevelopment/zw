package war.weapons;

import gryffin.display.*;

import war.items.Item;
import war.items.UseData;
import war.items.UseType;

import war.weapons.Gun;

class Ammo extends Item {
	/* Constructor Function */
	public function new():Void {
		super();
		type = 'supply/ammunition';
		name = 'Ammo';
		description = 'used by guns';
		equippable = false;
		useType = None;
		stackable = 100000;

		icon = Image.load('../assets/images/ammo.png');
	}

/* === Instance Methods === */

	/* draw [this] Item to a Canvas */
	override public function draw(w:Int, h:Int):Canvas {
		var c:Canvas = Canvas.create(w, h);
		c.context.drawComponent(icon, 0, 0, icon.width, icon.height, 0, 0, w, h);
		return c;
	}

	/* the value of [this] Item */
	override public function base_value():Int {
		return 2;
	}

/* === Instance Fields === */

	private var icon : Image;
}
