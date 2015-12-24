package war.items;

import gryffin.display.Canvas;
import gryffin.display.TextBox;

import tannus.geom.*;
import tannus.io.Signal;
import tannus.io.VoidSignal;
import tannus.io.Ptr;
import tannus.ds.Object;

import war.npc.Organism;
import war.items.UseData;
import war.items.UseType;

import haxe.Serializer;
import haxe.Unserializer;

class Item {
	/* Constructor Function */
	public function new():Void {
		type = 'base';
		name = 'item';
		description = 'item';
		equippable = false;
		useType = Normal;
		stackable = 0;
		count = 0;
		storage = null;
	}

/* === Instance Methods === */

	/**
	  * Determine whether [this] Item can be used
	  */
	public function usable():Bool {
		return true;
	}

	/**
	  * The item's tooltip
	  */
	public function tooltip():String {
		return name;
	}

	/**
	  * the text to display underneath [this] item in the HUD
	  */
	public function hudText():String {
		return name;
	}

	/**
	  * Use [this] Item
	  */
	public function use(data : UseData):Void {
		trace( data );
	}

	/**
	  * Determine whether the given Organism can pick [this] Item up
	  */
	public function canPickup(o : Organism):Bool {
		return ( !o.dead );
	}

	/**
	  * generate a Canvas with which to display [this] Item when needed
	  */
	public function draw(w:Int, h:Int):Canvas {
		var can = Canvas.create(w, h);
		var c = can.context;

		var tb = new TextBox();
		tb.fontFamily = 'Ubuntu';
		tb.bold = true;
		tb.text = name;
		tb.autoScale(w, h);
		c.drawComponent(tb, 0, 0, tb.width, tb.height, 0, 0, tb.width, tb.height);

		return can;
	}

	/**
	  * get the base-value of [this] Item
	  */
	public function base_value():Int {
		return 0;
	}

	/**
	  * get the serializable data from [this]
	  */
	public function data():Object {
		var self:Object = new Object( this );
		return self.plucka([
			'type', 'name', 'description',
			'equippable', 'useType', 'stackable',
			'count'
		]);
	}

	/**
	  * apply some data to [this] Item
	  */
	public function apply(data : Object):Void {
		var self:Object = new Object( this );

		self.write( data );
	}

	/**
	  * serialize [this] Item
	  */
	@:keep
	public function hxSerialize(s : Serializer):Void {
		s.serialize(data());
	}

	/**
	  * unserialize [this] Item
	  */
	@:keep
	public function hxUnserialize(u : Unserializer):Void {
		apply(u.unserialize());
	}

/* === Computed Instance Fields === */

	/**
	  * Whether [this] item can be stacked
	  */
	public var canStack(get, never):Bool;
	private inline function get_canStack():Bool return (stackable > 0);

/* === Instance Fields === */

	/* the name of the type of [this] Item */
	public var type : String;

	/* the name of [this] Item */
	public var name : String;

	/* the description of [this] Item */
	public var description : String;

	/* whether [this] item can be equipped */
	public var equippable : Bool;

	/* when/why to use [this] Item */
	public var useType : UseType;

	/* the maximum stack-size of [this] Item */
	public var stackable : Int;

	/* the number of [this] Item */
	public var count : Int;

	/* the ItemStorage (if any) that [this] is in */
	public var storage : Null<ItemStorage>;
}
