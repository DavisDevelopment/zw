package war.world;

import tannus.io.ByteArray;
import tannus.io.Getter;
import tannus.ds.Object;
import tannus.ds.tuples.*;

import war.world.World;
import war.npc.Wave;

import haxe.Serializer;
import haxe.Unserializer;
import haxe.Json;

class WorldData {
	/* Constructor Function */
	public function new(w : World):Void {
		wave = w.wave.level;
	}

/* === Instance Methods === */

	/**
	  * Serialize [this] data
	  */
	@:keep
	public function hxSerialize(s : Serializer):Void {
		var w = s.serialize.bind(_);

		w( wave );
	}

	/**
	  * Unserialize [this] data
	  */
	@:keep
	public function hxUnserialize(u : Unserializer):Void {
		var n:Getter<Dynamic> = new Getter(u.unserialize.bind());

		wave = n;
	}

	/**
	  * apply [this] data to a World
	  */
	public function apply(w : World):Void {
		w.wave.stop();
		w.wave = new Wave(w, wave);
		w.addSibling( w.wave );
	}

/* === Instance Fields === */

	public var wave : Int;
}
