package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.List;

import tannus.geom.*;

import war.world.World;
import war.Game;

class HUD extends List<HUDItem> {
	/* Constructor Function */
	public function new(s:Stage, g:Game):Void {
		super();

		stage = s;
		world = g.world;
		x = 0;
		y = 25;
	}

/* === Instance Methods === */

	/* the initial position of items */
	override private function firstPos():Point {
		return new Point(x, y);
	}

	/* update [this] HUD */
	override public function update(stage : Stage):Void {
		contentRect = new Rectangle(world.x+world.w, 0, (stage.width - (world.x+world.w)), stage.height);
		super.update( stage );
	}

	/* render [this] HUD */
	override public function render(s:Stage, c:Ctx):Void {
		super.render(s, c);
	}

	/* update an item */
	override public function updateItem(stage:Stage, item:HUDItem):Void {
		super.updateItem(stage, item);
		item.contentRect = contentRect;
	}

	/* position an item */
	override private function positionItem(p:Point, item:HUDItem):Void {
		p.y += item.margin.top;
		
		item.centerX = contentRect.centerX;
		item.y = p.y;
	
		p.y += item.h;
		p.y += item.margin.bottom;
	}

/* === Instance Fields === */

	public var world : World;

	public var x : Float;
	public var y : Float;
	public var contentRect : Rectangle;
}
