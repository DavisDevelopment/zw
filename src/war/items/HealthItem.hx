package war.items;

import gryffin.display.Image;
import gryffin.display.Canvas;

import war.items.Item;
import war.player.Avatar;
import war.npc.Organism;

class HealthItem extends Item {
	/* Constructor Function */
	public function new(points : Int):Void {
		super();

		name = 'Health';
		type = 'booster/health';
		count = points;
		description = '${count}hp';
		useType = Pickup;
		icon = Image.load('../assets/images/health.png');
	}

/* === Instance Methods === */

	/**
	  * determine whether the given Organism can pick [this] Item up
	  */
	override public function canPickup(o : Organism):Bool {
		return (Std.is(o, Avatar) && o.health < o.max_health);
	}

	/**
	  * use [this] Item
	  */
	override public function use(data : UseData):Void {
		data.user.hurt( -count );
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
