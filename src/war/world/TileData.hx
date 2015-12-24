package war.world;

import tannus.io.ByteArray;

import war.world.Terrain;

class TileData {
	/* Constructor Function */
	public function new():Void {
		x = 0;
		y = 0;
		solid = false;
		breakable = false;
		health = 100;
		type = Terrain.Grass;
	}

/* === Instance Methods === */

	/**
	  * Encode [this] TileData to a ByteArray
	  */
	public function encode():ByteArray {
		var data:ByteArray = new ByteArray( 6 );
		data.seek( 0 );
		data.writeByte( x );
		data.writeByte( y );
		data.writeByte(type.getIndex());
		data.writeByte(solid ? 1 : 0);
		data.writeByte(breakable ? 1 : 0);
		data.writeByte( health );
		return data;
	}

	/**
	  * Read some TileData from a ByteArray
	  */
	public function decode(b : ByteArray):Void {
		b.seek( 0 );
		x = b.readByte();
		y = b.readByte();
		type = Terrain.createByIndex(b.readByte());
		solid = (b.readByte() == 1);
		breakable = (b.readByte() == 1);
		health = b.readByte();
	}

/* === Instance Fields === */

	public var x : Int;
	public var y : Int;
	public var type : Terrain;
	public var solid : Bool;
	public var breakable : Bool;
	public var health : Int;
}
