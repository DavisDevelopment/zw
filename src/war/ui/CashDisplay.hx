package war.ui;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;

import war.player.Avatar;
import war.ui.HUDItem;

class CashDisplay extends HUDItem {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		super(p.game.stage, p.game.world);

		player = p;
		box = new TextBox();
		box.fontFamily = 'Ubuntu';
	}

/* === Instance Methods === */

	/* update [this] item */
	override public function update(s : Stage):Void {
		super.update( s );

		h = 30;

		var txt:String = 'Cash $$${player.money}';
		if (box.text != txt) {
			box.text = txt;
			box.autoScale(null, h);
		}
	}

	/* render [this] item */
	override public function render(s:Stage, c:Ctx):Void {
		c.drawComponent(box, 0, 0, box.width, box.height, x, y, box.width, box.height);
	}

/* === Instance Fields === */

	private var player : Avatar;
	public var box : TextBox;
}
