package war.world;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.io.VoidSignal;
import tannus.io.ByteArray;
import tannus.ds.Grid.GridPos in Pos;

import Math.*;

using war.world.TerrainTools;
using tannus.ds.ArrayTools;

class Tile extends EventDispatcher {
	/* Constructor Function */
	public function new(c : Chunk):Void {
		super();

		chunk = c;
		data = new TileData();
		//box = new TextBox();
		//box.multiline = true;
		//box.fontSize = 7;
	}

/* === Instance Methods === */

	/**
	  * update [this] Tile
	  */
	public function update():Void {
		chunk.updateTile( this );
	}

	/**
	  * render [this] Tile to the given Canvas
	  */
	public function render(canvas : Canvas):Void {
		var c = canvas.context;
		c.save();
		c.fillStyle = data.type.color().toString();
		c.beginPath();
		c.rect(chunkX, chunkY, chunk.tileWidth, chunk.tileHeight);
		c.closePath();
		c.fill();
		c.restore();

		//box.text = ('$x, $y');
		//c.drawComponent(box, 0, 0, box.width, box.height, chunkX, chunkY, box.width, box.height);
	}

	/**
	  * Check whether the given coordinates fall within [this] Tile's computed rectangle
	  */
	public function contains(x:Float, y:Float):Bool {
		var inX = (x > chunkX && x < (chunkX + chunk.tileWidth));
		var inY = (y > chunkY && y < (chunkY + chunk.tileHeight));
		return (inX && inY);
	}

	/**
	  * get an Array of the neighboring tiles
	  */
	public function neighbors():Array<Tile> {
		var res = new Array();
		if (left != null)
			res.push( left );
		if (right != null)
			res.push( right );
		if (top != null) 
			res.push( top );
		if (bottom != null)
			res.push( bottom );
		return res;
	}

	/**
	  * an array of all tiles whose distance from [this] one is less than or equal to 1
	  */
	public function neighborhood():Array<Tile> {
		var res = [];
		if (left != null)
			res.push( left );
		if (right != null)
			res.push( right );
		if (top != null) {
			res = res.concat([top, top.left, top.right]);
		}
		if (bottom != null) {
			res = res.concat([bottom, bottom.left, bottom.right]);
		}
		return res.macfilter(_ != null);
	}

	/**
	  * test whether [this] Tile is 'touching' a Tile of the given terrain-type
	  */
	public function touching(t : Terrain):Bool {
		for (tile in neighbors()) {
			if (tile.type.equals(t))
				return true;
		}
		return false;
	}

	/**
	  * test whether [this] Tile is 'surrounded' by a given tile-type
	  */
	public function surroundedBy(type : Terrain):Bool {
		if (left != null && right != null) {
			return (left.type.equals(type) && right.type.equals(type));
		}
		else if (top != null && bottom != null) {
			return (top.type.equals(type) && bottom.type.equals(type));
		}
		else {
			return false;
		}
	}

	/**
	  * get all neighboring tiles of the given type
	  */
	public function neighborsOfType(t : Terrain):Array<Tile> {
		return neighborhood().macfilter(_.type.equals(t));
	}

	/**
	  * get all neighboring tiles that are not of the given types
	  */
	public function neighborsNotOfType(types : Array<Terrain>):Array<Tile> {
		return neighborhood().filter(function(tile) {
			for (t in types) {
				if (t.equals(tile.type)) {
					return false;
				}
			}
			return true;
		});
	}

	/**
	  * Encode [this] Tile's data into a ByteArray
	  */
	public inline function encode():ByteArray {
		return data.encode();
	}

	/**
	  * Decode [this] Tile's data from a ByteArray
	  */
	public inline function decode(b : ByteArray):Void {
		data.decode( b );
		update();
	}

/* === Computed Instance Fields === */

	/* the 'x' position of [this] Tile */
	public var x(get, set):Int;
	private inline function get_x():Int return data.x;
	private inline function set_x(v : Int):Int return (data.x = v);

	/* the 'y' position of [this] Tile */
	public var y(get, set):Int;
	private inline function get_y():Int return data.y;
	private inline function set_y(v : Int):Int return (data.y = v);

	/* the 'x' position of [this] Tile in the Chunk */
	public var chunkX(get, never):Float;
	private inline function get_chunkX():Float {
		return (x * chunk.tileWidth);
	}

	/* the 'y' position of [this] Tile in the Chunk */
	public var chunkY(get, never):Float;
	private inline function get_chunkY():Float {
		return (y * chunk.tileHeight);
	}

	/* the 'position' of [this] Tile */
	public var pos(get, never):Pos;
	private inline function get_pos():Pos {
		return new Pos(x, y);
	}

	/* whether [this] Tile is solid */
	public var solid(get, set):Bool;
	private inline function get_solid():Bool return data.solid;
	private inline function set_solid(v : Bool):Bool return (data.solid = v);

	/* whether [this] Tile can be broken */
	public var breakable(get, set):Bool;
	private inline function get_breakable():Bool return data.breakable;
	private inline function set_breakable(v : Bool):Bool return (data.breakable = v);

	/* [this] Tile's health */
	public var health(get, set):Int;
	private inline function get_health():Int return data.health;
	private inline function set_health(v : Int):Int return (data.health = v);

	/* [this] Tile's type */
	public var type(get, set):Terrain;
	private inline function get_type():Terrain return data.type;
	private function set_type(v : Terrain):Terrain {
		var _t:Terrain = data.type;
		data.type = v;
		if (!v.equals( _t )) {
			update();
		}
		return v;
	}

/* === Instance Fields === */

	private var data : TileData;
	public var chunk : Chunk;

	public var left : Null<Tile>;
	public var right : Null<Tile>;
	public var top : Null<Tile>;
	public var bottom : Null<Tile>;

	private var box : TextBox;
}
