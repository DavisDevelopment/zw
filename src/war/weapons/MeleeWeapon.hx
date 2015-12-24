package war.weapons;

import gryffin.core.*;

import tannus.geom.*;
import tannus.ds.Value;
import tannus.ds.IntRange;
import tannus.internal.CompileTime in Ct;

import war.npc.Organism;
import war.player.Avatar;
import war.weapons.Weapon;
import war.items.UseData;

import Math.*;

class MeleeWeapon extends Weapon {
	/* Constructor Function */
	public function new():Void {
		super();
		type = ('$type/melee');

		max_durability = 100;
		durability = 0;
		max_distance = 20;
	}

/* === Instance Methods === */

	/**
	  * Whether [this] Weapon is currently usable
	  */
	override public function usable():Bool {
		return ( !broken );
	}

	/**
	  * Use [this] Weapon
	  */
	override public function use(data : UseData):Void {
		/* attempt to find a target */
		var target:Null<Organism> = findTarget( data );
		if (target != null) {
			attack( target );
		}
	}

	/**
	  * search for a target
	  */
	private function findTarget(data : UseData):Null<Organism> {
		var stage = data.user.stage;
		var targets:Selection<Organism> = stage.get('~war.npc.Organism');
		if (targets.length == 0) {
			return null;
		}
		else {
			var effective_range:Float = (data.user.w + max_distance);
			for (o in targets) {
				if (!o.dead && !o.is('war.player.Avatar') && data.origin.distanceFrom( o.center ) < effective_range) {
					return o;
				}
			}
			return null;
		}
	}

	/**
	  * attack a given target
	  */
	override public function attack(o : Organism):Void {
		durability -= 1;
		var bleeding = new war.ai.Bleed(6000, damage);
		o.addEffect( bleeding );
		super.attack( o );
	}

	/* the base-value of [this] item */
	override public function base_value():Int {
		return Math.floor(50 + (10 * (level - 1)));
	}

/* === Computed Instance Fields === */

	/* whether [this] Weapon is currently broken */
	public var broken(get, never):Bool;
	private inline function get_broken():Bool return (durability >= max_durability);

/* === Instance Fields === */

	/* the maximum durability of [this] Weapon */
	private var max_durability : Int;

	/* the current durability of [this] Weapon */
	private var durability : Int;

	/* the maximum effective distance of [this] Weapon */
	public var max_distance : Float;
}
