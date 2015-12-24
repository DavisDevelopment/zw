package war.player;

import tannus.io.Byte;

using StringTools;

abstract Keys (KeyMap) from KeyMap to KeyMap {
	/* Constructor Function */
	public inline function new():Void {
		this = new KeyMap();
	}

/* === Instance Methods === */

	/**
	  * get a value
	  */
	@:arrayAccess
	public inline function get(i : Int):Bool {
		return (this.exists( i ) ? this.get( i ) : false);
	}

	/**
	  * set a value
	  */
	@:arrayAccess
	public inline function set(i:Int, v:Bool):Void {
		this.set(i, v);
	}

	/**
	  * get a value by key
	  */
	public inline function letter(key : String):Bool {
		return get(key.toUpperCase().charCodeAt(0));
	}
}

private typedef KeyMap = Map<Int, Bool>;
