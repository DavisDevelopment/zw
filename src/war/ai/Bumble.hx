package war.ai;

import gryffin.fx.TimedEffect;

import war.npc.Zombie;
import war.player.Avatar;

import tannus.math.Random;
import tannus.geom.Velocity;
import tannus.io.Getter;

/**
  * Effect class used to make zombies seek and attack the Player
  */
class Bumble<T:Zombie> extends TimedEffect<T> {
	public function new():Void {
		super();
		interval = 250;
	}

	/**
	  * Make the Zombie bumble about
	  */
	override public function affect(e : T):Void {
		var pl = player( e );
		var pos = e.pos;
		vel = e.velocity;

		vel.speed = e.speed;
		if (pl != null) {
			/* == if Player is out of reach == */
			if (e.center.distanceFrom(pl.center) > e.reach) {
				vel.angle = (e.center.angleTo( pl.center ));
				pos.moveByPoint( vel.vector );
			}

			/* == if Player is within reach == */
			else {
				e.attack( pl );
			}
		}

		super.affect( e );
	}

	/**
	  * Get a reference to the Avatar
	  */
	private function player(e : T):Null<Avatar> {
		if (e.stage != null) {
			var avatar:Null<Avatar> = e.stage.get('war.player.Avatar').at(0);
			return avatar;
		} else return null;
	}

	private var vel : Velocity;
}
