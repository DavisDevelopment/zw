package war.world;

import gryffin.core.*;
import gryffin.display.*;

import tannus.ds.Grid;
import tannus.io.ByteArray;
import tannus.html.fs.WebFileSystem in Fs;
import tannus.html.fs.WebFileEntry;
import tannus.sys.Path;
import tannus.ds.Promise;

import war.world.Tile;
import war.world.ChunkGenerator;

import Math.*;

class Chunk {
	/* Constructor Function */
	public function new(w:World, x:Int, y:Int, size:Int):Void {
		world = w;
		this.x = x;
		this.y = y;
		this.size = size;
		generated = false;
	}

/* === Instance Methods === */

	/**
	  * Generate [this] Chunk
	  */
	public function generate():Void {
		tiles = new Grid(size, size);
		__generateDefault();
		canvas = Canvas.create(floor(width), floor(height));

		// map the tiles so that they know their surroundings
		for (tile in tiles) {
			tile.left = tiles.valueAt(tile.pos.left());
			tile.right = tiles.valueAt(tile.pos.right());
			tile.top = tiles.valueAt(tile.pos.top());
			tile.bottom = tiles.valueAt(tile.pos.bottom());
		}

		//var generator = new ChunkGenerator( this );
		//generator.generate();

		for (tile in tiles) {
			updateTile( tile );
		}

		generated = true;
		world.on('resize', onresize);
	}

	/**
	  * Generate a Grid of default Tiles
	  */
	private function __generateDefault():Void {
		for (pos in tiles.positions()) {
			var t = tiles.at( pos );
			var tile = new Tile( this );
			tile.x = pos.x;
			tile.y = pos.y;
			t.set( tile );
		}
	}

	/**
	  * a Tile has updated in [this] Chunk
	  */
	@:allow( war.world.Tile )
	private function updateTile(tile : Tile):Void {
		tile.render( canvas );
	}

	/**
	  * get the Tile at the given coordinates
	  */
	public function tileAt(x:Float, y:Float):Null<Tile> {
		var ix:Int = floor(x / tileWidth);
		var iy:Int = floor(y / tileHeight);

		for (tile in tiles) {
			if (tile.x == ix && tile.y == iy) {
				return tile;
			}
		}
		return null;
	}

	/**
	  * encode [this] Chunk into a ByteArray
	  */
	public function encode():ByteArray {
		var data:ByteArray = new ByteArray();
		for (tile in tiles) {
			data.append(tile.encode());
		}
		return data;
	}

	/**
	  * handle resize events
	  */
	private function onresize(e : Dynamic):Void {
		var csize:Int = floor(tileWidth * size);
		canvas.resize(csize, csize);
		for (t in tiles)
			t.render( canvas );
	}

/* === Computed Instance Fields === */

	/* the total width of [this] Chunk */
	public var width(get, never):Float;
	private inline function get_width():Float return world.w;

	/* the total height of [this] Chunk */
	public var height(get, never):Float;
	private inline function get_height():Float return world.h;

	/* the width of Tiles in the World */
	public var tileWidth(get, never):Float;
	private inline function get_tileWidth():Float return world.tileWidth;

	/* the height of Tiles in the World */
	public var tileHeight(get, never):Float;
	private inline function get_tileHeight():Float return world.tileHeight;

	/* the byte-length of [this] chunk */
	public var dataSize(get, never):Int;
	private inline function get_dataSize():Int {
		return ((size * size) * 6);
	}

/* === Instance Fields === */

	private var tiles : Grid<Tile>;

	public var world : World;
	public var canvas : Canvas;
	public var size : Int;
	public var x : Int;
	public var y : Int;
	public var generated : Bool;
}
