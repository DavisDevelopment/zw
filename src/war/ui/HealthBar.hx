package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import war.core.Ent;
import war.npc.Organism;

import tannus.math.Percent;
import tannus.graphics.Color;

using tannus.math.TMath;

class HealthBar extends Ent {
	/* Constructor Function */
	public function new(o : Organism):Void {
		super();

		owner = o;
		full_color = '#F00';
		empty_color = '#0F0';
		h = 15;

		__listen();
	}

/* === Instance Methods === */

	/**
	  * Render [this] Health Bar
	  */
	override public function render(s:Stage, c:Ctx):Void {
		super.render(s, c);

		/* draw the background */
		c.strokeStyle = 'black';
		c.strokeRect(x, y, w, h);

		/* draw the bar itself */
		c.fillStyle = '#F00';//full_color.mix(empty_color, perc);
		c.fillRect(x, y, perc.of(w), h);
	}

	/**
	  * Perform pre-activation event-binding
	  */
	private function __listen():Void {
		/* add [this] to the Stage when [owner] gets added */
		owner.addSibling( this );

		/* delete [this] when [owner] dies */
		owner.on('death', function(e) {
			delete();
		});
	}

/* === Coputed Instance Fields === */

	/* the current health of [owner], as a Percent */
	public var perc(get, never):Percent;
	private inline function get_perc():Percent {
		return Percent.percent(owner.health, owner.max_health);
	}

/* === Instance Fields === */

	public var owner : Organism;
	public var full_color : Color;
	public var empty_color : Color;
}
