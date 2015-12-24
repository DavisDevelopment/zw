package war.npc;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.math.Random;
import tannus.math.Percent;
import tannus.ds.Value;

import war.npc.Organism;
import war.ai.*;
import war.player.Avatar;
import war.ui.ZombieHealthBar;
import war.items.*;
import war.weapons.*;

import Math.*;
import Std.int;

using Lambda;
using tannus.ds.ArrayTools;
using tannus.math.RandomTools;

class Zombie extends Organism {
	/* Constructor Function */
	public function new(w : Wave):Void {
		super();

		speed = 1;
		velocity = new Velocity(0, 0);
		reach = 25;
		healthbar = new ZombieHealthBar( this );
		damage_value = Value.create( 2 );
		damage_value.mod(_ + floor((level < 4 ? level : level / 2) * _));
		wave = w;
		player = w.world.game.player;

		addEffect(new Bumble());
		__generateInventory();
	}

/* === Instance Methods === */

	/**
	  * Generate the Stats for [this] Zombie
	  */
	@:allow( war.npc.Wave )
	private function stats(r : Random):Void {
		/* randomize the position of [this] Zombie */
		pos = new Point(r.randint(round(world.x), round(world.w)), r.randint(-35, -60));

		/* randomize the speed of [this] Zombie */
		speed = r.randint(2, 3);

		/* set the max health of [this] Zombie, based on it's level */
		max_health = (100 + (20 * level));
		health = max_health;
	}

	/**
	  * Update [this] Zombie
	  */
	override public function update(s : Stage):Void {
		w = h = (world.tileWidth + (world.tileWidth * 0.3));

		if (player == null) {
			player = s.get('war.player.Avatar').at( 0 );
		}

		super.update( s );
	}

	/**
	  * Render [this] Zombie
	  */
	override public function render(s:Stage, c:Ctx):Void {
		c.save();
		c.beginPath();
		c.fillStyle = 'grey';
		c.rect(x, y, w, h);
		c.closePath();
		c.fill();
		c.restore();
	}

	/**
	  * detect and handle collisions
	  */
	override private function collisions():Void {
		super.collisions();

		var zombies = wave.zombies;
		for (zombie in zombies) {
			if (zombie != this && rect.containsRect(zombie.rect)) {
				var cd = collisionData( zombie );

				// they are colliding with us from the left
				if ( cd[0] ) {
					zombie.x = (x - zombie.w);
				}
				else {
					zombie.x = (x + w);
				}

				// they are colliding with us from the top
				if ( cd[1] ) {
					zombie.y = (y - zombie.h);
				}
				else {
					zombie.y = (y + h);
				}
			}
		}
	}

	/**
	  * calculate collision details
	  */
	private inline function collisionData(o : Zombie):Array<Bool> {
		return [(o.rect.centerX < rect.centerX), (o.rect.centerY < rect.centerY)];
	}

	/**
	  * Draw debug-specific illustrations
	  */
	private function drawDebugData(c : Ctx):Void {
		var m = center;

		/* == illustrate the reach of [this] Zombie == */
		c.save();
		c.beginPath();
		c.globalAlpha = 0.7;
		c.fillStyle = '#F00';
		c.arc(m.x, m.y, reach, 0, 2*Math.PI, false);
		c.closePath();
		c.fill();
		c.restore();
	}

	/**
	  * Attack the Player
	  */
	public function attack(player : Avatar):Void {
		player.hurt(damage_value.get());
	}

	/**
	  * when [this] Zombie dies
	  */
	override public function die():Void {
		// grant the player experience
		player.skill.grant_xp(ceil(10 + (3.6 * level)));

		/* drop the entire contents of our inventory */
		for (slot in inventory) {
			if ( !slot.free ) {
				var drop = slot.drop();
				drop.x = (x + [int(-w), int(w)].randint());
				drop.y = (y + [int(-h), int(h)].randint());
				addSibling( drop );
			}
		}

		// now do the usual stuff (dispatch events, delete self, etc)
		super.die();
	}

	/**
	  * randomly generate an Inventory for [this] Zombie
	  */
	private function __generateInventory():Void {
		inventory = new Inventory(5 + ceil(1.75 * level), this);
		var r = new Random();
		/* choose randomly whether to drop health */
		if ([6, 9].has(r.randint(0, 10))) {
			// the maximum health a zombie can drop is 10% of it's maxmimum health
			var p:Percent = new Percent(r.randint(0, 10));
			inventory.addItem(new HealthItem(floor(p.of(max_health))));
		}

		/* choose randomly whether to drop money or ammo */
		if (r.randchance(2, 5)) {
			// the money dropped by a zombie is always in the range(0 - (12 * level))
			var moneys:Int = r.randint(0, (r.randint(5, 12) * level));
			if (moneys > 0) {
				var cash = new MoneyItem( moneys );
				inventory.addItem( cash );
			}
		}
		else {
			var ammos:Int = r.randint(0, (10 * level));
			if (ammos > 0) {
				var ammo = new Ammo();
				ammo.count = ammos;
				inventory.addItem( ammo );

				/* decide randomly whether to drop a gun */
				var hasGun:Bool = r.randchance(12, 100);
				if ( hasGun ) {
					var gunTypes:Array<Class<Gun>> = [Pistol];
					var type = r.choice( gunTypes );
					var gun = Type.createInstance(type, []);
					inventory.addItem( gun );
				}
			}
		}
	}

/* === Instance Fields === */

	public var speed : Float;
	public var velocity : Velocity;
	public var reach : Float;
	public var damage_value : Value<Int>;
	public var healthbar : ZombieHealthBar;
	private var player : Null<Avatar>;
	private var wave : Wave;
}
