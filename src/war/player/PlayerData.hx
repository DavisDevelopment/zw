package war.player;

import war.npc.OrganismData;
import war.npc.Organism;
import war.player.Avatar;

import tannus.geom.*;
import tannus.io.Getter;
import tannus.ds.tuples.Tup2;

import haxe.Serializer;
import haxe.Unserializer;

class PlayerData extends OrganismData {
	/* Constructor Function */
	public function new(p : Avatar):Void {
		super( p );

		skill = new Tup2(p.skill.level, p.skill.xp);
		vel = new Tup2(p.vel.angle.degrees, p.vel.speed);
		money = p.money;
		inventory = Serializer.run( p.inventory );
	}

/* === Instance Methods === */

	/**
	  * apply [this] data to an Organism
	  */
	@:access(war.player.Skill)
	override public function apply(o : Organism):Void {
		super.apply( o );

		if (Std.is(o, Avatar)) {
			var p:Avatar = cast o;

			p.skill._lvl = skill._0;
			p.skill._xp = skill._1;
			p.vel.angle = new Angle( vel._0 );
			p.vel.speed = vel._1;
			p.money = money;
			var inv:war.items.Inventory = Unserializer.run( inventory );
			inv.owner = p;
			p.inventory = inv;
		}
	}

	/**
	  * serialize [this] data
	  */
	@:keep
	override public function hxSerialize(s : Serializer):Void {
		super.hxSerialize( s );

		var w = s.serialize.bind( _ );
		w( vel );
		w( skill );
		w( money );
		w( inventory );
	}

	/**
	  * unserialize [this] data
	  */
	@:keep
	override public function hxUnserialize(u : Unserializer):Void {
		super.hxUnserialize( u );

		var r:Getter<Dynamic> = new Getter(u.unserialize.bind());
		vel = r;
		skill = r;
		money = r;
		inventory = r;
	}

/* === Instance Fields === */

	public var skill : Tup2<Int, Int>;
	public var money : Int;
	public var vel : Tup2<Float, Float>;
	public var inventory : String;
}
