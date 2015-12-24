package war.ai;

import gryffin.fx.TimedEffect;

import war.npc.Organism;

class Bleed extends TimedEffect<Organism> {
	/* Constructor Function */
	public function new(duration:Int, dmg:Int):Void {
		super();
		interval = 1000;
		lifetime = duration;
		damage = dmg;
	}

/* === Instance Methods === */

	/* affect the Organism */
	override public function affect(o : Organism):Void {
		super.affect( o );
		o.hurt( damage );
	}

/* === Instance Fields === */

	public var damage : Int;
}
