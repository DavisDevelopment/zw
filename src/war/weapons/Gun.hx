package war.weapons;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.io.Ptr;
import tannus.io.Signal;
import tannus.ds.Object;

import war.weapons.*;
import war.items.UseData;
import war.npc.Organism;
import war.player.Avatar;
import war.items.Inventory;

import gryffin.Tools.*;
import haxe.Serializer;
import haxe.Unserializer;

class Gun extends Weapon {
	/* Constructor Function */
	public function new():Void {
		super();

		type = '$type/gun';

		fire_delay = 0;
		last_fire = null;
		projectile_class = Projectile;

		mod_damage();
	}

/* === Instance Methods === */

	/**
	  * Check if [this] Weapon can be used
	  */
	override public function usable():Bool {
		return (sinceLastFire >= fire_delay && hasAmmo());
	}

	/**
	  * whether any ammo is present
	  */
	private function hasAmmo():Bool {
		var amm = ammoItem();
		return (amm != null && amm.count > 0);
	}

	/**
	  * get a reference to the Ammo item
	  */
	private function ammoItem():Null<Ammo> {
		if (storage != null) {
			return cast storage.slotByType('supply/ammunition').item;
		}
		else {
			return null;
		}
	}

	/**
	  * get the ammo count
	  */
	public function ammoCount():Int {
		var ai = ammoItem();
		if (ai == null) {
			return 0;
		}
		else {
			return ai.count;
		}
	}

	/**
	  * Use [this] Weapon
	  */
	override public function use(data : UseData):Void {
		var ammoi = ammoItem();
		ammoi.count--;
		if (ammoi.count == 0) {
			storage.itemSlot( ammoi ).item = null;
		}

		/* get the Projectile */
		var proj:Projectile = createProjectile( data );

		/* give the Projectile any additional info that it needs */
		proj.owner = data.user;

		/* activate the Projectile */
		proj.fire();

		last_fire = now;
	}

	/**
	  * the text to display on the HUD
	  */
	override public function hudText():String {
		return [
			'lvl $level $name',
			'ammo: $ammo'
		].join('\n');
	}

	/**
	  * Create the Projectile for [this] Weapon
	  */
	private function createProjectile(data : UseData):Projectile {
		/* get the Angle at which to fire the gun */
		var angle:Angle = data.origin.angleTo( data.target );

		/* create the Projectile */
		var p:Projectile = Type.createInstance(projectile_class, untyped [this, data.origin, angle]);

		return p;
	}

	/**
	  * Add modifiers to [damage]
	  */
	private function mod_damage():Void {
		_damage.modify(function(v : Int):Int {
			if (storage != null) {
				var inv:Inventory = cast storage;
				var player:Avatar = cast inv.owner;
				return (v + (5 * ((level - 1) + (player.skill.level - 1))));
			}
			return (v + (5 * (level - 1)));
		});
	}

	/**
	  * get the data of [this] Gun
	  */
	override public function data():Object {
		var o:Object = super.data();
		o['fire_delay'] = fire_delay;
		o['projectile_class'] = Type.getClassName( projectile_class );
		return o;
	}

	/**
	  * set the data of [this] Gun
	  */
	override public function apply(o : Object):Void {
		super.apply( o );

		projectile_class = cast Type.resolveClass(o['projectile_class']);
	}

	/**
	  * unserialize [this] Gun
	  */
	@:keep
	override public function hxUnserialize(u : Unserializer):Void {
		super.hxUnserialize( u );

		defer(mod_damage.bind());
	}

/* === Computed Instance Fields === */

	/* the current time */
	private var now(get, never):Float;
	private inline function get_now():Float {
		return (Date.now().getTime());
	}

	/* the time which has passed since the last time [this] Weapon fired */
	public var sinceLastFire(get, never):Float;
	private function get_sinceLastFire():Float {
		if (last_fire != null) {
			return (now - last_fire);
		}
		else {
			return 0;
		}
	}

	/* the number of 'bullets' [this] Gun has available to it */
	public var ammo(get, never):Int;
	private inline function get_ammo():Int return ammoCount();

/* === Instance Fields === */

	/* the number of milliseconds [this] Weapon must wait after firing before it can fire again */
	public var fire_delay : Float;

	/* the time of the last firing of [this] Weapon */
	public var last_fire : Null<Float>;

	/* the Projectile class to use to create new Projectiles */
	private var projectile_class : Class<Projectile>;
}
