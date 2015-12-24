package war.items;

import tannus.events.MouseEvent;

import tannus.geom.Point;

import war.npc.Organism;

class UseData {
	/* Constructor Function */
	public function new():Void {
		target = new Point();
		origin = target;

		altKey = false;
		ctrlKey = false;
		shiftKey = false;
	}

/* === Instance Fields === */

	public var target : Point;
	public var origin : Point;
	public var user : Organism;

	public var altKey : Bool;
	public var ctrlKey : Bool;
	public var shiftKey : Bool;

/* === Static Methods === */

	/**
	  * Build UseData from a MouseEvent
	  */
	public static function fromMouseEvent(e : MouseEvent):UseData {
		var u = new UseData();

		u.target = e.position;
		u.altKey = e.altKey;
		u.ctrlKey = e.ctrlKey;
		u.shiftKey = e.shiftKey;

		return u;
	}
}
