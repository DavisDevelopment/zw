package war.weapons;

import tannus.geom.*;
import tannus.ds.Value;
import tannus.ds.IntRange;

import war.npc.Organism;
import war.player.Avatar;
import war.weapons.MeleeWeapon;
import war.items.UseData;

import Math.*;

class Club extends MeleeWeapon {
	/* Constructor Function */
	public function new():Void {
		super();

		type = '$type+club';
		name = 'Club';
		description = 'good for smashing zombie skulls';

		base_damage = 5;
		max_distance = 30;
	}
}
