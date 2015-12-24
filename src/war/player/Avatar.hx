package war.player;

import gryffin.core.*;
import gryffin.display.*;

import tannus.geom.*;
import tannus.io.Signal;
import tannus.io.VoidSignal;

import war.npc.Organism;
import war.npc.OrganismData;
import war.npc.Zombie;
import war.world.World;
import war.items.*;
import war.weapons.*;
import war.ui.PlayerHealthBar;

import gryffin.Tools.*;
import haxe.Serializer;
import haxe.Unserializer;

using tannus.math.TMath;

class Avatar extends Organism {
	/* Constructor Function */
	public function new(g : Game):Void {
		super();

		controls = new Controls( this );
		keys = new Keys();
		
		inventory = new Inventory(10, this);
		inventory.addItem(new Pistol());
		var ammo = new Ammo();
		ammo.count = 5000;
		inventory.addItem( ammo );

		vel = new Velocity(0, 0);
		speed = 3;
		money = 0;
		_using = false;
		skill = new Skill();

		world.firstUpdate.once(function() {
			rect.center = world.rect.center;
		});

		controls.nextkey(81, pressedQ);
		controls.nextkey(27, pressedEsc);
	}

/* === Instance Methods === */

	/**
	  * Initialize [this] Avatar
	  */
	override public function init(stage : Stage):Void {
		super.init( stage );

		rect.center = world.rect.center;
	}

	/**
	  * Update [this] Avatar
	  */
	override public function update(s : Stage):Void {
		super.update( s );
		w = h = game.world.tileWidth;

		/* continue to use the currently equipped item */
		if (_using && equipped.useType == Continuous) {
			var udata:UseData = new UseData();
			udata.target = s.getMousePosition();
			udata.user = this;
			use( udata );
		}

		move();
		pickups();
	}

	/**
	  * Render [this] Avatar
	  */
	override public function render(s:Stage, c:Ctx):Void {
		c.fillStyle = '#000';
		c.fillRect(x, y, w, h);

		var eq = inventory.equipped.item;
		/*
		if (Std.is(eq, MeleeWeapon)) {
			var wep:MeleeWeapon = cast eq;
			var m = center;
			c.save();
			c.beginPath();
			c.fillStyle = '#F00';
			c.strokeStyle = '#F00';
			c.arc(m.x, m.y, wep.max_distance, 0, 2*Math.PI, false);
			c.closePath();
			c.globalAlpha = 0.65;
			c.fill();
			c.globalAlpha = 1.0;
			c.stroke();
			c.restore();
		}
		*/
	}

	/**
	  * Handle player movement
	  */
	private function move():Void {
		/* reset [this]'s velocity */
		vel.x = 0;
		vel.y = 0;

		/* == vertical movement == */
		if (keys.letter('W')) {
			vel.y -= speed;
		}
		else if (keys.letter('S')) {
			vel.y += speed;
		}

		/* == horizontal movement == */
		if (keys.letter('A')) {
			vel.x -= speed;
		}
		else if (keys.letter('D')) {
			vel.x += speed;
		}

		/* actually move the avatar */
		vel.x = vel.x.clamp(-speed, speed);
		vel.y = vel.y.clamp(-speed, speed);
		x += vel.x;
		y += vel.y;


	}

	/**
	  * Search the stage for pickups
	  */
	private function pickups():Void {
		var drops:Selection<Drop> = stage.get('war.items.Drop');
		for (drop in drops) {
			if (drop.collidesWith(rect) && drop.item.canPickup(this)) {
				drop.pickup( this );
			}
		}
	}

	/**
	  * Use the currently equipped item
	  */
	public function use(data : UseData):Void {
		inventory.use( data );
	}

	/**
	  * when the user presses the Q key
	  */
	public function pressedQ(e : tannus.events.KeyboardEvent):Void {
		var invPage = new war.ui.InventoryView( this );
		stage.addChild( invPage );
		invPage.open();

		defer(function() {
			controls.nextkey(81, function(e) {
				invPage.close();
				defer(controls.nextkey.bind(81, pressedQ));
			});
		});
	}

	/**
	  * when the user presses the Esc key
	  */
	public function pressedEsc(e : tannus.events.KeyboardEvent):Void {
		var pm = new war.ui.PauseMenu( this );
		stage.addChild( pm );
		pm.open();
	}

	/**
	  * get the current state of [this] Avatar
	  */
	override public function state():OrganismData {
		return cast new PlayerData( this );
	}

/* === Computed Instance Fields === */

	/* the item we currently have equipped */
	public var equipped(get, never):Null<Item>;
	private inline function get_equipped():Null<Item> return inventory.equippedItem;

/* === Instance Fields === */

	public var controls : Controls;
	public var keys : Keys;

	public var skill : Skill;
	public var money : Int;
	public var vel : Velocity;
	public var speed : Float;
	public var _using : Bool;
}
