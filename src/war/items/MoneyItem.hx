package war.items;

import gryffin.display.*;

import war.items.Item;
import war.player.Avatar;
import war.npc.Organism;

class MoneyItem extends Item {
	/* Constructor Function */
	public function new(amount : Int):Void {
		super();

		name = 'Money';
		type = 'misc/cash';
		count = amount;
		description = '$$${count}';
		useType = Pickup;
		icon = Image.load('../assets/images/cash.png');
	}

/* === Instance Methods === */

	/**
	  * determine whether the given Organism can pick [this] Item up
	  */
	override public function canPickup(o : Organism):Bool {
		return Std.is(o, Avatar);
	}

	/**
	  * use [this] Item
	  */
	override public function use(data : UseData):Void {
		cast(data.user, Avatar).money += count;
	}

	/* the tooltip displayed for [this] item */
	override public function tooltip():String {
		return ("$"+count);
	}

	/**
	  * Draw [this] Item to a Canvas
	  */
	override public function draw(w:Int, h:Int):Canvas {
		var c:Canvas = Canvas.create(w, h);
		c.context.drawComponent(icon, 0, 0, icon.width, icon.height, 0, 0, w, h);
		return c;
	}

/* === Instance Fields === */

	private var icon : Image;
}
