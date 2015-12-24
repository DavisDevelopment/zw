package war.weapons;

import gryffin.display.*;

import tannus.geom.*;
import tannus.ds.Value;
import tannus.ds.Object;

import war.items.Item;
import war.npc.Organism;
import war.player.Avatar;

import Std.*;
import haxe.Serializer;
import haxe.Unserializer;

@:allow( war.npc.Organism )
class Weapon extends Item {
	/* Constructor Function */
	public function new():Void {
		super();
		type = 'weapon';
		equippable = true;
		
		level = 1;
		base_damage = 1;
		_damage = Value.create( base_damage );
	}

/* === Instance Methods === */

	/**
	  * Determine whether an Organism can pick [this] Weapon up
	  */
	override public function canPickup(o : Organism):Bool {
		return (is(o, Avatar));
	}

	/**
	  * draw [this] onto a Canvas
	  */
	override public function draw(w:Int, h:Int):Canvas {
		var icon:Image = Image.load('../assets/images/weapons/$iconName.png');
		var c = Canvas.create(w, h);
		c.context.drawComponent(icon, 0, 0, icon.width, icon.height, 0, 0, w, h);
		if ( !icon.complete ) {
			icon.ready.once(function() {
				c.context.drawComponent(icon, 0, 0, icon.width, icon.height, 0, 0, w, h);
			});
		}
		return c;
	}

	/**
	  * Use [this] Weapon on then given Organism
	  */
	public function attack(victim : Organism):Void {
		victim.hurt( damage );
	}

	/**
	  * get the cost of levelling [this] Weapon up
	  */
	public function levelUpCost():Int {
		return (75 + ((level - 1) * 20));
	}

	/**
	  * get the data for [this] shit
	  */
	override public function data():Object {
		var o:Object = super.data();
		o['level'] = level;
		o['base_damage'] = base_damage;
		o['iconName'] = iconName;
		return o;
	}

	/**
	  * unserialize [this] weapon
	  */
	@:keep
	override public function hxUnserialize(u : Unserializer):Void {
		super.hxUnserialize( u );

		_damage = Value.create( base_damage );
	}

/* === Computed Instance Fields === */

	/**
	  * The total damage output of [this] Weapon
	  */
	public var damage(get, never):Int;
	private inline function get_damage():Int {
		return (_damage.get());
	}

/* === Instance Fields === */

	/* the base (unmodified) damage of [this] Weapon */
	public var base_damage : Int;

	/* the Value representing the total damage of [this] Weapon */
	private var _damage : Value<Int>;

	/* the level of [this] weapon */
	public var level : Int;

	/* the icon for [this] weapon */
	public var iconName : String;
}
