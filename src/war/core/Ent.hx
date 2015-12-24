package war.core;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;

class Ent extends Entity {
	/* Constructor Function */
	public function new():Void {
		super();

		rect = new Rectangle();
	}

/* === Instance Methods === */

	/**
	  * Check whether a given Point lies inside the boundaries of [this] Entity
	  */
	override public function containsPoint(p : Point):Bool {
		var r = new Rectangle(x, y, w, h);
		return r.containsPoint( p );
	}

	/**
	  * Check whether [this] Ent collides with the given Rectangle
	  */
	public function collidesWith(r : Rectangle):Bool {
		for (p in r.corners) {
			if (containsPoint( p )) {
				return true;
			}
		}
		return false;
	}

/* === Computed Instance Fields === */

	/* the 'x' position of [this] */
	public var x(get, set):Float;
	private function get_x():Float return rect.x;
	private function set_x(v : Float):Float return (rect.x = v);
	
	/* the 'y' position of [this] */
	public var y(get, set):Float;
	private function get_y():Float return rect.y;
	private function set_y(v : Float):Float return (rect.y = v);
	
	/* the width of [this] */
	public var w(get, set):Float;
	private function get_w():Float return rect.w;
	private function set_w(v : Float):Float return (rect.w = v);
	
	/* the height of [this] */
	public var h(get, set):Float;
	private function get_h():Float return rect.h;
	private function set_h(v : Float):Float return (rect.h = v);

	/* the position of [this] */
	public var pos(get, set):Point;
	private function get_pos():Point return Point.linked(x, y);
	private function set_pos(v : Point):Point {
		x = v.x;
		y = v.y;
		return pos;
	}

	/* the center of [this] */
	public var center(get, set):Point;
	private function get_center():Point return rect.center;
	private function set_center(v : Point):Point {
		return (rect.center = v);
	}

	/* the x-coordinate of [this]'s center */
	public var centerX(get, set):Float;
	private function get_centerX():Float return (x + (w / 2));
	private function set_centerX(v : Float):Float {
		return (x = (v - (w / 2)));
	}

	/* the y-coordinate of [this]'s center */
	public var centerY(get, set):Float;
	private function get_centerY():Float return (y + (h / 2));
	private function set_centerY(v : Float):Float return (y = (v - (h / 2)));

/* === Instance Fields === */

	public var rect : Rectangle;
}
