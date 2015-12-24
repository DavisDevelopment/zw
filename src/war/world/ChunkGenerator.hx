package war.world;

import gryffin.core.*;
import gryffin.display.*;

import tannus.ds.Grid;
import tannus.geom.*;
import tannus.graphics.Color;
import tannus.math.Random;
import tannus.math.TMath.*;

import war.world.Chunk;
import war.world.Tile;

using war.world.TerrainTools;
using tannus.math.TMath;
using tannus.math.RandomTools;
using Lambda;
using tannus.ds.ArrayTools;

@:access(war.world.Chunk)
class ChunkGenerator {
	/* Constructor Function */
	public function new(c : Chunk):Void {
		chunk = c;
		grid = chunk.tiles;
		r = new Random();
	}

/* === Instance Methods === */

	/**
	  * begin to mutate the Chunk
	  */
	public function generate():Void {
		var hasWater:Bool = true;//r.randchance(2, 10);
		// if [this] chunk features a body of water
		if ( hasWater ) {
			// water's point of origin
			var start:Tile = grid.get(r.randint(0, grid.w), r.randint(0, grid.h));
			
			// tiles which will be part of the water
			var full = withinRadiusOf(start, 5);
			start.type = Water;
			full.each(_.type = Water);
			var edges = full.macfilter(_.touching(Grass));
			var toGrow = r.sample( edges );
			for (tile in toGrow) {
				var dicks = grow(tile, r.randint(1, 7), 0);
				dicks.each(_.type = Water);
			}
			full = getAllOfType( Water );
			var grassByWater = full.macmap(_.neighborsOfType(Grass)).flatten().unique();
			var noms = grassByWater.splitfilter(function(tile) return tile.surroundedBy(Water));
			noms.pass.each(_.type = Water);

			// tiles on the edge of the water become
			var beach = noms.fail;//full.macfilter(_.touching(Grass));//.macmap(_.neighborsOfType(Grass)).flatten();
			beach = beach.macmap(_.neighborsOfType(Grass)).flatten();
			beach.each( _.type = Sand );
		}
	}

	private function grow(tile:Tile, max_recursion:Int, level:Int, ?collection:Array<Tile>):Array<Tile> {
		if (collection == null)
			collection = new Array();
		if (level == max_recursion)
			return collection;
		else {
			collection.push( tile );
			var friends = tile.neighborhood();
			var nextGrow:Tile;
			do {
				nextGrow = r.choice( friends );
			}
			while (collection.has(nextGrow));
			grow(nextGrow, max_recursion, ++level, collection);
			return collection;
		}
	}

	/**
	  * get all tiles within a certain radius of [this] one
	  */
	public function withinRadiusOf(t:Tile, dis:Int):Array<Tile> {
		var results:Array<Tile> = new Array();
		var origin:Point = new Point(t.x, t.y);
		
		function surrounding(tile : Tile):Void {
			if (tile != t) {
				results.push( tile );
			}

			var friends = tile.neighbors();
			for (n in friends) {
				if (!results.has( n )) {
					var npos = new Point(n.x, n.y);
					if (npos.distanceFrom( origin ) <= dis) {
						surrounding( n );
					}
				}
			}
		}
		surrounding( t );
		return results;
	}

	/**
	  * get all tiles of the given type
	  */
	public function getAllOfType(type : Terrain):Array<Tile> {
		var res = [];
		for (t in grid)
			if (t.type.equals(type))
				res.push( t );
		return res;
	}

/* === Instance Fields === */

	private var r : Random;
	private var chunk : Chunk;
	private var grid : Grid<Tile>;
}
