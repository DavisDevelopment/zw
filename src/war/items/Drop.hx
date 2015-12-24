package war.items;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.Tooltip;

import tannus.geom.*;
import tannus.io.Signal;

import war.core.Ent;
import war.npc.Organism;
import war.items.Item;
import war.items.UseType;
import war.world.World;

import Math.*;
import gryffin.Tools.*;

class Drop extends Ent {
	/* Constructor Function */
	public function new(i : Item):Void {
		super();

		rotation = 0;
		item = i;
		lifetime = (60 * 1000);
		dateCreated = now;
		tip = new Tooltip();
		tip.target = rect;
		tip.direction = Top;
		tip.box.fontSize = 8;
		addSibling( tip );
		tip.hide();
		w = h = 25;

		image = item.draw(ceil(w), ceil(h));
	}

/* === Instance Methods === */

	/**
	  * Render [this] Drop
	  */
	override public function render(s:Stage, c:Ctx):Void {
		c.save();
		//c.translate(rect.centerX, rect.centerY);
		//c.rotate( rotation.radians );
		//c.translate(-rect.centerX, -rect.centerY);
		c.drawComponent(image, 0, 0, image.width, image.height, x, y, w, h);
		c.restore();
	}

	/**
	  * Update [this] Drop
	  */
	override public function update(s : Stage):Void {
		super.update( s );

		tip.text = item.tooltip();

		/* kill [this] if it's too old */
		if (age >= lifetime) {
			delete();
			return ;
		}

		/* attempt to find the World instance */
		if (world == null) {
			// try to get it from the Stage
			var w:Null<World> = s.get('war.world.World').at( 0 );
			// if we got it successfully
			if (w != null) {
				// save that shit
				world = w;
			}
		}
		// if we have already found that shit
		else {
			// do the shit
			w = h = world.tileWidth;
		}
	}

	/**
	  * [item] is being picked up by [o]
	  */
	public function pickup(o : Organism):Void {
		/* if [item] can be used, and should be used immediately upon being picked up */
		if (item.useType == UseType.Pickup && item.usable()) {
			var udata:UseData = new UseData();
			udata.target = udata.origin = o.pos;
			udata.user = o;

			/* then [o] uses [item] */
			item.use( udata );
			
			/* and our job is done */
			delete();
			tip.delete();
		}

		/* otherwise */
		else {
			/* attempt to add [item] to [o]'s inventory */
			var added:Bool = o.inventory.addItem( item );

			/* if [item] is successfully added */
			if ( added ) {
				/* our job is done here */
				delete();
				tip.delete();
			}
		}
	}

/* === Computed Instance Fields === */

	/* the amount of time that's passed since [this] was created */
	private var age(get, never):Float;
	private inline function get_age():Float {
		return (now - dateCreated);
	}

/* === Instance Fields === */

	public var item : Item;
	public var tip : Tooltip;
	public var image : Canvas;
	public var lifetime : Float;

	public var rotation : Angle;

	// reference to the World instance
	private var world : Null<World>;

	// the Date on which [this] was created
	private var dateCreated : Float;
}
