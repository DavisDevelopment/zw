package war.ui;

import tannus.geom.*;
import tannus.events.*;
import war.ui.TextButton;

class ResumeButton extends TextButton {
	/* Constructor Function */
	public function new(pm : PauseMenu):Void {
		super();

		menu = pm;
		text = 'Resume Game';
		fontFamily = 'Ubuntu';
		fontSize = 24;
		y = 25;
	}

/* === Instance Methods === */

	/**
	  * when [this] button gets clicked
	  */
	override public function click(e : MouseEvent):Void {
		super.click( e );

		menu.close();
	}

/* === Instance Fields === */

	public var menu : PauseMenu;
}
