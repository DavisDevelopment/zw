package war.items;

import war.items.*;

import haxe.ds.Vector;

using Lambda;
using tannus.ds.ArrayTools;

class ItemStorage {
	/* Constructor Function */
	public function new(numberOfSlots : Int):Void {
		slots = new Array();
		size = numberOfSlots;

		__makeSlots();
	}

/* === Instance Methods === */

	/**
	  * add an Item to [this] Storage
	  */
	public function addItem(item : Item):Bool {
		var firstFreeSlot:Null<Slot> = null;

		for (slot in slots) {
			if (slot.free && firstFreeSlot == null) {
				firstFreeSlot = slot;
			}
			else if (!slot.free && item.canStack && (item.count > 0) && (slot.item.count < item.stackable) && slot.item.type == item.type) {
				slot.item.count += item.count;
				if (slot.item.count > slot.item.stackable) {
					var rem:Int = (slot.item.count - slot.item.stackable);
					slot.item.count = slot.item.stackable;
					item.count = rem;
				}
				else {
					item.count = 0;
				}

				/* if the item-stack has been emptied, we're done */
				if (item.count == 0) {
					return true;
				}			
			}
		}
		if (firstFreeSlot != null) {
			firstFreeSlot.item = item;
			return true;
		}
		return false;
	}

	/**
	  * get the index of the given Slot
	  */
	public inline function indexOf(slot : Slot):Int {
		return slots.indexOf( slot );
	}

	/**
	  * Get the slot associated with the given Item
	  */
	public function itemSlot(item : Item):Null<Slot> {
		for (slot in slots) {
			if (!slot.free && slot.item == item) {
				return slot;
			}
		}
		return null;
	}

	/**
	  * get a reference to the first Slot with an Item that matches the given type
	  */
	public function slotByType(type : String):Null<Slot> {
		for (slot in slots) {
			if (!slot.free && slot.item.type == type) {
				return slot;
			}
		}
		return null;
	}

	/**
	  * Convert the contents of a Slot to a Drop
	  */
	public function drop(index : Int):Drop {
		var slot:Null<Slot> = slots[index];
		if (slot == null) {
			throw new js.Error('Cannot be dropped! There is no Slot at position $index');
		}
		else {
			if ( slot.free ) {
				throw new js.Error('Cannot be dropped! Slot is empty');
			}
			else {
				return slot.drop();
			}
		}
	}

	/**
	  * Iterate over all of [this]'s Slots
	  */
	public function iterator():Iterator<Slot> {
		return slots.iterator();
	}

	/**
	  * Create the Vector of empty Slots
	  */
	private function __makeSlots():Void {
		for (i in 0...size) {
			var slot = freshSlot();
			slots.push( slot );
		}
	}

	/**
	  * create and return a new, unmodified Slot object
	  */
	private function freshSlot():Slot {
		return new Slot( this );
	}

/* === Instance Fields === */

	private var slots : Array<Slot>;
	private var size : Int;
}
