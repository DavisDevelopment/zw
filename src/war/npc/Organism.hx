package war.npc;

import gryffin.core.*;
import gryffin.display.*;

import tannus.io.Signal;
import tannus.io.VoidSignal;

import war.core.Ent;
import war.world.World;
import war.items.Inventory;

import tannus.math.TMath.*;
import haxe.Serializer;
import haxe.Unserializer;

class Organism extends Ent {
	/* Constructor Function */
	public function new():Void {
		super();

		game = Game.instance;
		level = 1;
		max_health = 100;
		health = 100;

		ondie = new VoidSignal();
	}

/* === Instance Methods === */

	/**
	  * Update [this] Organism
	  */
	override public function update(s : Stage):Void {
		super.update( s );
		
		/* detect and respond to collisions */
		collisions();

		/* if health is at or below zero */
		if (health <= 0) {
			die();
		}
	}

	/**
	  * Handle Collisions
	  */
	private function collisions():Void {
		/* == clamp [this] Organism to the bounds of the world == */
		if (x < world.x) {
			x = world.x;
		}
		else if (x + w > world.x + world.w) {
			x = (world.x + world.w - w);
		}

		if (y < world.y && !is('war.npc.Zombie')) {
			y = world.y;
		}
		else if (y + h > world.y + world.h) {
			y = (world.y + world.h - h);
		}
	}

	/**
	  * mark [this] Organism as 'dead'
	  */
	private function die():Void {
		delete();
		ondie.fire();
		dispatch('death', null);
	}

	/**
	  * Hurt [this] Organism
	  */
	public function hurt(amount : Int):Void {
		health -= amount;
	}

	/**
	  * get [this] Organism's data
	  */
	public function state():OrganismData {
		return new OrganismData( this );
	}

	/**
	  * apply some data to [this]
	  */
	public function patch(data : OrganismData):Void {
		data.apply( this );
	}

/* === Computed Instance Fields === */

	/* whether [this] Organism is currently dead */
	public var dead(get, never):Bool;
	private inline function get_dead():Bool return (health <= 0);

	/* the World */
	public var world(get, never):World;
	private inline function get_world():World return game.world;

	/* setter for [health] */
	private function set_health(v : Int):Int {
		return (health = min(v, max_health));
	}

/* === Instance Fields === */

	/* == Stats == */
	public var game : Game;
	public var inventory : Inventory;
	public var health(default, set): Int;
	public var max_health : Int;
	public var level : Int;
	
	/* == Events == */
	public var ondie : VoidSignal;
}
