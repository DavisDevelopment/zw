package war.player;

import tannus.io.VoidSignal;

import Math.*;

class Skill {
	/* Constructor Function */
	public function new():Void {
		_xp = 0;
		_lvl = 1;
		increase = new VoidSignal();
	}

/* === Instance Methods === */

	/**
	  * Give xp to [this] Skill
	  */
	public function grant_xp(amount : Int):Void {
		_xp += amount;

		if (xp >= xp_needed) {
			_xp -= xp_needed;
			level_up();
		}
	}

	/**
	  * Level [this] Skill up
	  */
	private function level_up():Void {
		_lvl++;
		increase.fire();
	}

/* === Computed Instance Fields === */

	/* the amount of xp towards the next level */
	public var xp(get, never):Int;
	private inline function get_xp():Int {
		return _xp;
	}

	/* the current level of [this] Skill */
	public var level(get, never):Int;
	private inline function get_level():Int {
		return _lvl;
	}

	/* the amount of xp needed to reach the next level */
	public var xp_needed(get, never):Int;
	private inline function get_xp_needed():Int {
		return (25 * (level - 1) + 100);
	}

/* === Instance Fields === */
	
	private var _xp : Int;
	private var _lvl : Int;
	public var increase : VoidSignal;
}
