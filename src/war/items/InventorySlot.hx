package war.items;

import war.npc.Organism;

class InventorySlot extends Slot {
	/* Constructor Function */
	public function new(inv:Inventory, ?item:Item):Void {
		super(inv, item);

		inventory = inv;
	}

/* === Instance Methods === */

/* === Instance Fields === */

	private var inventory : Inventory;
}
