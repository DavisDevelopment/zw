package war.player;

import gryffin.core.Stage;

import tannus.events.*;
import tannus.geom.*;
import tannus.math.TMath;
import tannus.io.Signal;

import war.player.Avatar;
import war.items.UseData;

class Controls {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		player = p;
		keyListeners = new Map();

		player.on('activated', bind);
	}

/* === Instance Methods === */

	/**
	  * Listen for events on the Stage
	  */
	private function bind(s : Stage):Void {
		stage = s;

		bindKeys();
		bindMouse();
	}

	/**
	  * Listen for mouse-events
	  */
	private function bindMouse():Void {
		stage.on('click', handleClick);
		stage.on('mousedown', handleMouse);
		stage.on('mouseup', handleMouse);
	}

	/**
	  * Handle a click-event
	  */
	private function handleClick(e : MouseEvent):Void {
		if (!player.game.isOpen()) {
			return ;
		}

		if ( !e.defaultPrevented ) {
			var use_data:UseData = UseData.fromMouseEvent( e );
			player.use( use_data );
		}
	}

	/**
	  * Handle mouse{up,down} events
	  */
	private function handleMouse(e : MouseEvent):Void {
		if (!e.defaultPrevented) {
			switch ( e.type ) {
				case 'mousedown':
					var eq = player.equipped;
					if (eq != null && eq.useType == Continuous) {
						player._using = true;
					}

				case 'mouseup', 'mouseleave':
					player._using = false;
			}
		}
	}

	/**
	  * Listen for keyboard events on the Stage
	  */
	private function bindKeys():Void {
		stage.on('keydown', toggleKey.bind(_, true));
		stage.on('keyup', toggleKey.bind(_, false));
	}

	/**
	  * Toggle a key
	  */
	private function toggleKey(e:KeyboardEvent, state:Bool):Void {
		player.keys.set(e.keyCode, state);
		if (e.type == 'keyup') {
			pressEvent( e );
		}
	}

	/**
	  * announce that a key has been pressed
	  */
	private function pressEvent(e : KeyboardEvent):Void {
		trace( e.keyCode );
		keysig( e.keyCode ).call( e );
	}

	/**
	  * listen for events of the given keyCode
	  */
	public inline function onkey(code:Int, cb:KeyboardEvent -> Void):Void {
		keysig( code ).on( cb );
	}

	/**
	  * listen for the next event on the given keyCode
	  */
	public inline function nextkey(code:Int, cb:KeyboardEvent->Void):Void {
		keysig( code ).once( cb );
	}

	/**
	  * get the Signal associated with a given keyCode
	  */
	private function keysig(code : Int):Signal<KeyboardEvent> {
		var sig:Signal<KeyboardEvent> = keyListeners[code];
		if (sig == null) {
			sig = keyListeners[code] = new Signal();
		}
		return sig;
	}

/* === Instance Fields === */

	public var stage : Stage;
	public var player : Avatar;
	private var keyListeners : Map<Int, Signal<KeyboardEvent>>;
}
