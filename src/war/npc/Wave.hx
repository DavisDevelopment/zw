package war.npc;

import gryffin.core.*;
import gryffin.display.*;

import tannus.math.Random;
import tannus.io.VoidSignal;

import war.world.World;
import war.npc.Zombie;
import war.items.Inventory;

import gryffin.Tools.wait;

using Lambda;
using tannus.math.RandomTools;
using tannus.ds.ArrayTools;

class Wave extends Entity {
	/* Constructor Function */
	public function new(w:World, lvl:Int):Void {
		super();

		level = lvl;
		delay = 10000;
		count = Math.round(10 + (2.5 * level));
		zombies = new Array();
		world = w;

		disabled = false;
		onstop = new VoidSignal();
	}

/* === Instance Methods === */

	/**
	  * Initialize [this] Wave
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		wait(delay, activate);
	}

	/**
	  * Activate [this] Wave, and all the zombies therein
	  */
	public function activate():Void {
		/* generate the zombies */
		generate();

		for (z in zombies) {
			/* add the zombie to the Stage */
			addSibling( z );
		}
	}

	/**
	  * Generate the Zombies for [this] Wave
	  */
	private function generate():Void {
		for (i in 0...count) {
			var zombie:Zombie = new Zombie( this );
			zombies.push( zombie );

			stats( zombie );
			watch( zombie );
		}
	}

	/**
	  * disable the continuous progression through waves
	  */
	public function disable():Void {
		disabled = true;
	}

	/**
	  * abort the current wave
	  */
	public function stop():Void {
		onstop.fire();
	}

	/**
	  * Generates the stats for a Zombie
	  */
	private function stats(z : Zombie):Void {
		var r = new Random();

		z.level = r.randint(1, level);
		
		z.stats( r );
	}

	/**
	  * Listen for events on a Zombie
	  */
	private function watch(z : Zombie):Void {
		/* when the Zombie dies */
		z.on('death', function(e) {
			/* delete it from our list of zombies */
			zombies.remove( z );

			/* then check to see if [this] Wave is over */
			checkFinished();
		});

		/* if [this] Wave gets stopped prematurely */
		onstop.once(function() {
			if ( !z.dead ) {
				// ensure that their inventory is empty
				z.inventory = new Inventory(1, z);

				// kill them
				z.hurt( z.health );
			}
		});
	}

	/**
	  * Determine if [this] Wave is finished, and handle it if it is
	  */
	private function checkFinished():Void {
		/* if there are no zombies left */
		if (zombies.empty() && !disabled) {
			/* make a new Wave */
			var nextWave:Wave = new Wave(world, ++level);

			/* replace [this] one with the next */
			world.wave = nextWave;
			addSibling( nextWave );
			delete();
			world.game.save();
		}
	}

/* === Instance Fields === */

	public var level : Int;
	public var delay : Int;
	public var world : World;
	public var count : Int;
	public var zombies : Array<Zombie>;

	private var disabled : Bool;
	private var onstop : VoidSignal;
}
