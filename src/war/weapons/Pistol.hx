package war.weapons;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.io.Ptr;
import tannus.io.Signal;

import war.weapons.*;
import war.items.UseData;
import war.npc.Organism;

@:keep
class Pistol extends Gun {
	/* Constructor Function */
	public function new():Void {
		super();

		type = '$type+pistol';
		name = 'Pistol';
		description = 'A generic handgun';
		base_damage = 18;
		iconName = 'pistol';

		projectile_class = Bullet;
	}

/* === Instance Methods === */

	/* the base-value of [this] Pistol */
	override public function base_value():Int {
		return Math.floor(250 + (75 * (level - 1)));
	}
}
