package war.items;

import tannus.geom.*;
import tannus.io.Signal;
import tannus.io.VoidSignal;
import tannus.io.Ptr;
import tannus.io.Getter;

import war.npc.Organism;
import war.items.Item;
import war.items.UseData;
import war.items.UseType;
import war.items.Slot;

import haxe.Serializer;
import haxe.Unserializer;

class Inventory extends ItemStorage {
	/* Constructor Function */
	public function new(size:Int, org:Organism):Void {
		super( size );

		owner = org;
		equippedIndex = 0;
	}

/* === Instance Methods === */

	/**
	  * Use the currently equipped item
	  */
	public function use(data : UseData):Void {
		data.user = owner;
		data.origin = owner.center;
		
		/* if the equipped item can be used */
		if (equipped.usable()) {
			equipped.use( data );
		}
	}

	/**
	  * Equip the Slot with the given index
	  */
	public function equip(id : Int):Void {
		equippedIndex = id;
	}

	/**
	  * override how [this] ItemStorage creates new Slots
	  */
	override private function freshSlot():Slot {
		return cast new InventorySlot( this );
	}

	/**
	  * serialize [this] Inventory
	  */
	@:keep
	public function hxSerialize(s : Serializer):Void {
		var w = s.serialize.bind(_);

		w( size );
		w( equippedIndex );
		for (slot in slots) {
			w( slot.item );
		}
	}

	/**
	  * unserialize [this] Inventory
	  */
	@:keep
	public function hxUnserialize(u : Unserializer):Void {
		var n:Getter<Dynamic> = new Getter(u.unserialize.bind());
		size = n;
		equippedIndex = n;
		slots = new Array();
		for (i in 0...size) {
			var slot = freshSlot();
			slots.push( slot );
			slot.item = n;
		}
	}

/* === Computed Instance Fields === */

	/**
	  * The currently equipped Slot
	  */
	public var equipped(get, never):Slot;
	private inline function get_equipped():Slot {
		return (slots[ equippedIndex ]);
	}

	/**
	  * the currently equipped Item
	  */
	public var equippedItem(get, never):Null<Item>;
	private inline function get_equippedItem():Null<Item> {
		return equipped.item;
	}

/* === Instance Fields === */

	/* the index of the currently equipped slot */
	public var equippedIndex : Int;

	/* the owner of [this] Inventory */
	public var owner : Organism;
}
