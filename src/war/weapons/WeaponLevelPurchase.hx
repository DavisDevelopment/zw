package war.weapons;

import war.weapons.Weapon;
import war.ds.Purchase;
import war.player.Avatar;

using war.ds.PurchaseTools;

class WeaponLevelPurchase extends Purchase {
	/* Constructor Function */
	public function new(w : Weapon):Void {
		super();
		weapon = w;
		name = 'Level Up ($$${w.levelUpCost()})';
		description = 'advance ${w.name} to the next level';
	}

/* === Instance Methods === */

	/**
	  * check whether the player can afford [this] Purchase
	  */
	override public function canAfford(p : Avatar):Bool {
		return (p.money >= weapon.levelUpCost());
	}

	/**
	  * make [this] Purchase
	  */
	override public function make(p : Avatar):Void {
		p.money -= weapon.levelUpCost();
		weapon.level++;
	}

/* === Instance Fields === */

	private var weapon : Weapon;
}
