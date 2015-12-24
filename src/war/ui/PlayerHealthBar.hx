package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.math.Percent;

import war.player.Avatar;
import war.world.World;
import war.ui.HealthBar;
import war.ui.HUDItem;

class PlayerHealthBar extends HUDItem {
	/* Constructor Function */
	public function new(s:Stage, p:Avatar):Void {
		super(s, p.world);
	
		box = new TextBox();
		box.fontFamily = 'Ubuntu';
		contentRect = new Rectangle();
		player = p;
		tannus.html.Win.current.expose('healthbar', this);
	}

/* === Instance Methods === */

	/**
	  * Update [this] HealthBar
	  */
	override public function update(s : Stage):Void {
		super.update( s );

		w = (contentRect.width * 0.85);
		h = 20;
		var txt:String = '${player.health}hp / ${player.max_health}hp';
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

		var perc:Percent = Percent.percent(player.health, player.max_health);

		c.fillStyle = '#F00';
		c.fillRect(x, y, perc.of(w), h);
		c.drawComponent(box, 0, 0, box.width, box.height, x, y, box.width, box.height);
	}

/* === Instance Fields === */

	public var player : Avatar;
	public var box : TextBox;
}
