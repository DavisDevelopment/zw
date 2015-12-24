package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.events.*;

import war.player.Avatar;
import war.player.Controls;

import gryffin.Tools.*;

class PauseMenu extends Page {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		super();

		player = p;
		resumeButton = cast new ResumeButton( this );
		quitButton = cast new QuitButton( this );
		addChild( resumeButton );
		addChild( quitButton );
	}

/* === Instance Methods === */

	/**
	  * when [this] Page opens
	  */
	override public function open():Void {
		super.open();
	}

	/**
	  * when [this] Page closes
	  */
	override public function close():Void {
		super.close();
		delete();
		if (prev_page != null) {
			prev_page.open();
		}
		defer(function() {
			player.controls.nextkey(27, player.pressedEsc);
		});
	}

	/**
	  * update [this] Page
	  */
	override public function update(stage : Stage):Void {
		super.update( stage );

		resumeButton.centerX = stage.rect.centerX;
		quitButton.centerX = stage.rect.centerX;
	}

/* === Instance Fields === */

	public var player : Avatar;
	public var resumeButton : TextButton;
	public var quitButton : TextButton;
}
