package war.weapons;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.math.TMath;
import tannus.ds.Value;

import war.weapons.Weapon;
import war.weapons.Gun;
import war.weapons.Projectile;
import war.npc.Organism;
import war.player.Avatar;
import war.world.World;

class Bullet extends Projectile {
	/* Constructor Function */
	public function new(gun:Gun, origin:Point, angle:Angle):Void {
		super(gun, origin, angle);

		damage = Value.create( 0 );
	}

/* === Instance Methods === */

	/**
	  * When [this] Bullet hits a target
	  */
	override public function hit(o : Organism):Void {
		o.hurt(weapon.damage + damage.get());

		stop();
	}

	/**
	  * Modify the damage of [this] 
	  */
	private function mod_damage():Void {
		null;
	}

/* === Instance Fields === */

	public var damage : Value<Int>;
}
