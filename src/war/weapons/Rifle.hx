package war.weapons;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.io.Ptr;
import tannus.io.Signal;

import war.weapons.*;
import war.items.UseData;
import war.items.UseType;
import war.npc.Organism;

class Rifle extends Gun {
	/* Constructor Function */
	public function new():Void {
		super();

		type = '$type+rifle';
		name = 'Rifle';
		description = 'A generic rifle';
		base_damage = 10;
		useType = Continuous;
		fire_delay = 100;

		projectile_class = Bullet;
	}
}
