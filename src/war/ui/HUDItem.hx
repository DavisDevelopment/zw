package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.ListItem;
import gryffin.ui.Padding;

import tannus.geom.*;

import war.world.World;

class HUDItem extends ListItem {
	/* Constructor Function */
	public function new(s:Stage, w:World):Void {
		super();
		
		stage = s;
		world = w;
		margin = new Padding();

		x = 0;
		y = 0;
	}

/* === Instance Methods === */

/* === Computed Instance Fields === */

	/* the center of [this] item along the x-axis */
	public var centerX(get, set):Float;
	private function get_centerX():Float {
		return (x + (w / 2));
	}
	private function set_centerX(v : Float):Float {
		x = (v - (w / 2));
		return v;
	}

	/* the center of [this] item along the y-axis */
	public var centerY(get, set):Float;
	private function get_centerY():Float return (y + (h / 2));
	private function set_centerY(v : Float):Float {
		y = (v - (h / 2));
		return v;
	}

	/* the center of [this] item */
	public var center(get, never):Point;
	private inline function get_center():Point return Point.linked(centerX, centerY);

/* === Instance Fields === */

	private var world : World;
	public var contentRect : Rectangle;
	public var margin : Padding;
}
