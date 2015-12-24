package war.npc;

import war.npc.Organism;

import tannus.geom.*;
import tannus.io.Getter;

import haxe.Serializer;
import haxe.Unserializer;

class OrganismData {
	/* Constructor Function */
	public function new(o : Organism):Void {
		rect = o.rect.clone();
		health = o.health;
		max_health = o.max_health;
		level = o.level;
	}

/* === Instance Methods === */

	/**
	  * serialize [this] data
	  */
	@:keep
	public function hxSerialize(s : Serializer):Void {
		var w = s.serialize.bind(_);

		w( level );
		w( health );
		w( max_health );
		w( rect );
	}

	/**
	  * unserialize [this] data
	  */
	@:keep
	public function hxUnserialize(u : Unserializer):Void {
		var r:Getter<Dynamic> = new Getter(u.unserialize.bind());

		level = r;
		health = r;
		max_health = r;
		rect = r;
	}

	/**
	  * write some data to [o]
	  */
	public function apply(o : Organism):Void {
		o.rect = rect.clone();
		o.max_health = max_health;
		o.health = health;
		o.level = level;
	}

/* === Instance Fields === */

	public var rect : Rectangle;
	public var health : Int;
	public var max_health : Int;
	public var level : Int;
}
