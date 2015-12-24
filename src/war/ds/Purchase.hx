package war.ds;

import war.player.Avatar;

class Purchase {
	/* Constructor Function */
	public function new():Void {
		name = 'purchase';
		description = 'the base purchase';
	}

/* === Instance Methods === */

	/**
	  * whether the Player can afford [this] Purchase
	  */
	public function canAfford(p : Avatar):Bool {
		return true;
	}

	/**
	  * make [this] Purchase
	  */
	public function make(p : Avatar):Void {
		null;
	}

/* === Instance Fields === */

	/* the name of [this] Purchase */
	public var name : String;

	/* the description for [this] Purchase */
	public var description : String;
}
