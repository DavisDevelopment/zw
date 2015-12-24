package war.world;

import gryffin.core.*;
import gryffin.display.*;

import tannus.io.Ptr;
import tannus.io.VoidSignal;
import tannus.geom.*;
import tannus.html.fs.WebFileSystem in Fs;
import tannus.ds.Delta;
import tannus.events.*;

import war.Game;
import war.core.Ent;
import war.world.Tile;
import war.npc.Wave;
import war.ui.*;

import Std.int in i;
import Math.*;

using Lambda;
using tannus.ds.ArrayTools;

@:access(war.world.Tile)
class World extends Ent {
	/* Constructor Function */
	public function new(g:Game, size:Int):Void {
		super();

		game = g;
		priority = -1;
		this.size = size;
		chunk = new Chunk(this, 0, 0, size);
		updated = false;
		firstUpdate = new VoidSignal();
		
		wave = new Wave(this, 1);
		addSibling( wave );
		g.stage.on('resize', onresize);
	}

/* === Instance Methods === */

	/**
	  * Initialize [this] World
	  */
	override public function init(s : Stage):Void {
		w = h = s.height;
		//chunk.generate();
	}

	/**
	  * Render [this] World
	  */
	override public function render(s:Stage, c:Ctx):Void {
		if ( chunk.generated ) {
			c.drawComponent(chunk.canvas, 0, 0, chunk.canvas.width, chunk.canvas.height, x, y, w, h);
		}
	}

	/**
	  * Update [this] World
	  */
	override public function update(s : Stage):Void {
		w = h = (tileWidth * size);
		x = ((s.width / 2) - (w / 2));

		if ( !updated ) {
			firstUpdate.fire();
			updated = true;
		}

		var lastResize = s.mostRecentOccurrenceTime('resize');
		var now = (Date.now().getTime());
		var since = (now - lastResize);
		if (since >= 500) {
			if (!chunk.generated) {
				chunk.generate();
			}
		}
	}

	/**
	  * handle resize-events
	  */
	private function onresize(e : ResizeEvent):Void {
		var osize:Float = (ceil(e.delta.previous.height / size) * size);
		var nsize:Float = (tileWidth * size);
		var event = new ResizeEvent(new Area(osize, osize), new Area(nsize, nsize));

		dispatch('resize', event);
	}

	/**
	  * Get the Tile at the given coordinates
	  */
	@:access(war.world.Chunk)
	public function tileAt(tx:Float, ty:Float):Null<Tile> {
		var p = new Point(tx, ty);
		if (containsPoint( p )) {
			p.iminusPoint( pos );
			return chunk.tileAt(p.x, p.y);
		}
		else {
			return null;
		}
	}

	/**
	  * get the current State of [this] World
	  */
	public function state():WorldData {
		return new WorldData( this );
	}

	/**
	  * set the current State of [this] World
	  */
	public function patch(data : WorldData):Void {
		data.apply( this );
	}

/* === Computed Instance Fields === */

	/* the width of tiles */
	public var tileWidth(get, never):Float;
	private inline function get_tileWidth():Float {
		return ceil(stage.height / size);
	}

	/* the height of tiles */
	public var tileHeight(get, never):Float;
	private inline function get_tileHeight():Float {
		return ceil(stage.height / size);
	}

/* === Instance Fields === */

	public var game : Game;
	public var size : Int;
	public var chunk : Chunk;
	public var wave : Wave;

	private var updated : Bool;
	public var firstUpdate : VoidSignal;
}
