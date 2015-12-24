package war.items;

import war.items.Inventory;
import war.items.Item;
import war.items.SlotType;
import war.items.UseData;

import tannus.geom.Point;

class Slot {
	/* Constructor Function */
	public function new(owner:ItemStorage, ?itm:Item):Void {
		storage = owner;
		item = itm;
	}

/* === Instance Methods === */

	/**
	  * Check whether [this] Slot is currently usable
	  */
	public function usable():Bool {
		return (!free && item.usable());
	}

	/**
	  * Use the item held in [this] Slot
	  */
	public function use(data : UseData):Void {
		item.use( data );
	}

	/**
	  * drop [this] Slot's contents
	  */
	public function drop():Drop {
		return new Drop( item );
	}

/* === Computed Instance Fields === */

	/**
	  * The Item which [this] Slot contains
	  */
	public var item(get, set):Null<Item>;
	private function get_item():Null<Item> {
		return _item;
	}
	private function set_item(v : Null<Item>):Null<Item> {
		if (_item != null) {
			_item.storage = null;
		}
		_item = v;
		if (_item != null) {
			_item.storage = storage;
		}
		return _item;
	}

	/**
	  * Whether [this] Slot is currently 'free'
	  */
	public var free(get, never):Bool;
	private inline function get_free():Bool {
		return (item == null);
	}

	/**
	  * The index of [this] Slot
	  */
	public var index(get, never):Int;
	private inline function get_index():Int {
		return storage.indexOf(this);
	}

/* === Instance Fields === */

	/* the Item (if any) stored in [this] Slot */
	private var _item : Null<Item>;

	/* the ItemStorage object that [this] Slot is owned by */
	private var storage : ItemStorage;
}
