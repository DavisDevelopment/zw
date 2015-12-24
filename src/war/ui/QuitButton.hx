package war.ui;

import tannus.geom.*;
import tannus.events.*;
import war.ui.TextButton;
import war.Game;

import chrome.Windows;

class QuitButton extends TextButton {
	/* Constructor Function */
	public function new(pm : PauseMenu):Void {
		super();

		menu = pm;
		text = 'Quit Game';
		fontFamily = 'Ubuntu';
		fontSize = 24;
		y = 84;
	}

/* === Instance Methods === */

	/**
	  * when [this] button gets clicked
	  */
	@:access(gryffin.ui.Page)
	override public function click(e : MouseEvent):Void {
		super.click( e );

		var game:Game = cast menu.prev_page;
		game.save(function() {
			var appw = Windows.current();
			appw.close();
		});
	}

/* === Instance Fields === */

	public var menu : PauseMenu;
}
