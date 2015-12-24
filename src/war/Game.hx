package war;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.Page;

import tannus.html.Win;
import tannus.ds.AsyncStack in Stack;

import war.world.World;
import war.player.Avatar;
import war.utils.FPS;
import war.ui.*;
import war.ds.State;

import haxe.Serializer;
import haxe.Unserializer;

class Game extends Page {
	/* Constructor Function */
	public function new(s : Stage):Void {
		super();
		
		instance = this;
		stage = s;
		state = new State();
		state.init();
		world = new World(this, 40);
		player = new Avatar( this );
		hud = new HUD(s, this);
		hud.addItem(new PlayerHealthBar(s, this.player));
		hud.addItem(new PlayerLevelBar(s, this.player));
		hud.addItem(new WaveDisplay(s, this.world));
		hud.addItem(new EquippedDisplay( player ));

		fps = new FPS();

		addChild( world );
		addChild( player );
		addChild( fps );
		addChild( hud );
		world.wave.stop();

		var w = Win.current;

		w.expose('world', world);
		w.expose('player', player);
		state.onready(function() {
			load(function() {
				trace('game loaded');
			});
		});
	}

/* === Instance Methods === */

	/**
	  * save [this] Game
	  */
	public function save(?cb : Void->Void):Void {
		var stack = new Stack();

		/* save the Player data */
		stack.push(function(done) {
			state.getPlayerFile(function(f) {
				var s = new Serializer();
				s.useCache = true;
				s.useEnumIndex = true;
				s.serialize(player.state());
				var data:String = s.toString();
				f.file().write( data ).then(function(x) {
					done();
				});
			});
		});

		/* save the World data */
		stack.push(function(done) {
			state.getWorldFile(function(f) {
				var s = new Serializer();
				s.useCache = true;
				s.useEnumIndex = true;
				s.serialize(world.state());
				var data:String = s.toString();
				f.file().write( data ).then(function(x) {
					done();
				});
			});
		});

		stack.run(function() {
			if (cb != null) {
				cb();
			}
		});
	}

	/**
	  * load [this] Game
	  */
	public function load(cb : Void->Void):Void {
		var stack = new Stack();

		stack.push(function(done) {
			state.getPlayerFile(function(f) {
				f.read().then(function(data) {
					if (data.length == 0) {
						done();
					}
					else {
						var playerState = Unserializer.run(data.toString());
						player.patch( playerState );
						done();
					}
				});
			});
		});

		stack.push(function(done) {
			state.getWorldFile(function(f) {
				f.read().then(function(data) {
					if (data.length > 0) {
						var worldState = Unserializer.run(data.toString());
						world.patch( worldState );
					}

					done();
				});
			});
		});

		stack.run(function() {
			cb();
		});
	}

/* === Instance Fields === */

	public var world : World;
	public var player : Avatar;
	public var fps : FPS;
	public var hud : HUD;
	public var state : State;

/* === Static Fields === */

	public static var instance : Game;
}
