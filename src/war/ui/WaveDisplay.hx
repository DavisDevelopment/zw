package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.math.Percent;

import war.player.Avatar;
import war.world.World;
import war.ui.HealthBar;
import war.ui.HUDItem;

class WaveDisplay extends HUDItem {
	/* Constructor Function */
	public function new(s:Stage, w:World):Void {
		super(s, w);
	
		box = new TextBox();
		box.fontFamily = 'Ubuntu';
		contentRect = new Rectangle();
		margin.top = 18;
	}

/* === Instance Methods === */

	/**
	  * Update [this] HealthBar
	  */
	override public function update(s : Stage):Void {
		super.update( s );

		w = (contentRect.width * 0.85);
		h = 20;
		var wave = world.wave;
		var count:Int = wave.zombies.length;
		var txt:String = 'Wave ${wave.level}  (${count} / ${wave.count})';
		if (box.text != txt) {
			box.text = txt;
			box.autoScale(w, h);
		}
	}

	/**
	  * Render [this] HealthBar
	  */
	override public function render(s:Stage, c:Ctx):Void {
		c.strokeStyle = '#000';
		c.strokeRect(x, y, w, h);

		var perc:Percent = Percent.percent((world.wave.count - world.wave.zombies.length), world.wave.count);

		c.fillStyle = '#0F0';
		c.fillRect(x, y, perc.of(w), h);
		c.drawComponent(box, 0, 0, box.width, box.height, x, y, box.width, box.height);
	}

/* === Instance Fields === */

	public var box : TextBox;
}
