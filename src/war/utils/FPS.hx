package war.utils;

import gryffin.core.Entity;
import gryffin.core.Stage;
import gryffin.display.Ctx;

using tannus.math.TMath;

class FPS extends Entity {
	/* Constructor Function */
	public function new():Void {
		super();
		counts = new Array();
		lastTime = null;
		framesThisSecond = 0;
	}

/* === Instance Methods === */

	/**
	  * Render the FPS counter
	  */
	override public function render(s:Stage, c:Ctx):Void {
		var fps:Int = Math.round(counts.average());
		var text:String = 'FPS: $fps';

		c.save();
		c.fillStyle = 'black';
		var mesur = c.measureText( text );
		c.font = '12pt Monospace';
		c.fillText(text, 0, 20);
		c.restore();
	}

	/**
	  * Update the FPS counter
	  */
	override public function update(s : Stage):Void {
		var now = getNow();
		
		if (lastTime != null) {
			if ((now - lastTime) <= 1000) {
				framesThisSecond++;
			}
			else {
				counts.push( framesThisSecond );
				framesThisSecond = 0;
				lastTime = now;
			}
		}
		else {
			lastTime = now;
		}
	}

	/**
	  * Get the current time, in ms
	  */
	private inline function getNow():Float {
		return (Date.now().getTime());
	}

/* === Instance Fields === */

	private var lastTime : Null<Float>;
	private var counts : Array<Float>;
	private var framesThisSecond : Int;
}
