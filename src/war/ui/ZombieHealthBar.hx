package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import war.npc.Zombie;
import war.ui.HealthBar;

class ZombieHealthBar extends HealthBar {
	/* Constructor Function */
	public function new(z : Zombie):Void {
		super(cast z);
	}

/* === Instance Methods === */

	/**
	  * Update [this] Health Bar
	  */
	override public function update(s : Stage):Void {
		super.update( s );

		w = (owner.w + (0.65 * owner.w));
		h = 6;
		var dw:Float = (w - owner.w);
		x = (owner.x - (dw / 2));
		y = (owner.y - h - 4);
	}
}
