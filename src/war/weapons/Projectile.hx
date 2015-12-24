package war.weapons;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.math.TMath;

import war.weapons.Weapon;
import war.weapons.Gun;
import war.npc.Organism;
import war.world.World;

class Projectile {
	/* Constructor Function */
	public function new(gun:Gun, origin:Point, angle:Angle):Void {
		pos = origin;
		vel = new Velocity(0, angle);
		size = 5;
		speed = 10;
		weapon = gun;
		in_flight = false;
		targets = new Array();
	}

/* === Instance Methods === */

	/**
	  * Move [this] Projectile
	  */
	public function move():Void {
		pos += vel.vector;

		collisions();
	}

	/**
	  * this projectile has been fired.
	  * attempt to find a target
	  */
	public function fire():Void {
		in_flight = true;
		targets = stage.get('war.npc.Zombie!:dead').selected;

		while ( in_flight ) {
			move();
		}
	}

	/**
	  * Detect and handle collisions
	  */
	public function collisions():Void {
		/* detect collisions with Walls */
		var w:World = owner.world;
		if ( !w.containsPoint(pos) ) {
			stop();
			return ;
		}

		/* detect collisions with Zombies */
		for (e in targets) {
			if (hitting( e )) {
				hit( e );
				return ;
			}
		}
	}

	/**
	  * [this] Projectile has struck the given Organism
	  */
	public function hit(o : Organism):Void {
		weapon.attack( o );
		stop();
	}

	/**
	  * Check if [this] Projectile is colliding with the given Organism
	  */
	public function hitting(o : Organism):Bool {
		return o.containsPoint( pos );
	}

	/**
	  * declare that [this] Projectile has stopped
	  */
	private inline function stop():Void {
		in_flight = false;
	}

/* === Computed Instance Fields === */

	/* the speed of [this] Projectile */
	public var speed(get, set):Float;
	private inline function get_speed():Float return vel.speed;
	private inline function set_speed(v : Float):Float return (vel.speed = v);

	/* the Stage to which [owner] is attached */
	private var stage(get, never):Stage;
	private inline function get_stage():Stage return owner.stage;

/* === Instance Fields === */

	/* the current position of [this] Projectile */
	public var pos : Point;

	/* the effective radius of [this] Projectile */
	public var size : Float;

	/* the current velocity of [this] Projectile */
	public var vel : Velocity;

	/* the weapon from which [this] Projectile was fired */
	public var weapon : Gun;

	/* the Organism that fired [this] Projectile */
	public var owner : Organism;

	/* whether [this] projectile is still airborne */
	private var in_flight : Bool;

	/* the list of possible targets */
	private var targets : Array<Organism>;
}
