package ;

import tannus.html.Win;
import tannus.events.MouseEvent;
import tannus.io.Ptr;
import tannus.dom.Element;
import tannus.internal.CompileTime in Ct;
import tannus.geom.Angle;
import js.html.CanvasElement;

import gryffin.core.*;
import gryffin.ui.*;

import war.world.*;
import war.player.Avatar;
import war.items.Drop;
import war.Game;

using tannus.ds.StringUtils;
using tannus.ds.ArrayTools;

class GameMain {
	/* Constructor Function */
	public function new():Void {
		canvas = cast Win.current.document.getElementById('stage');
		stage = new Stage( canvas );
		Reflect.setProperty(Win.current, 'stage', stage);
		stage.fill();

		game = new Game( stage );
		stage.addChild( game );
		game.open();

		listen();
		consoleUtils();
	}

/* === Instance Methods === */

	/**
	  * Listen for some Events on the Stage
	  */
	private function listen():Void {
		stage.on('click', click);
	}

	/**
	  * make console-commands
	  */
	private function consoleUtils():Void {
		var w = Win.current;
		w.expose('pauseZombies', function() {
			for (z in game.world.wave.zombies) {
				z.cache();
			}
		});

		w.expose('killAll', function() {
			for (z in game.world.wave.zombies) {
				z.hurt( z.max_health );
			}
		});

		w.expose('grab', function() {
			var drops:Selection<Drop> = stage.get('war.items.Drop');
			for (d in drops) {
				d.pickup(game.player);
			}
		});

		w.expose('point', function(x:Float, y:Float) {
			return new tannus.geom.Point(x, y);
		});
	}

	/**
	  * Function fired when the Stage is clicked
	  */
	private function click(e : MouseEvent):Void {
		//var p = e.position;
		//var t = game.world.tileAt(p.x, p.y);
		//if (t != null) {
			//t.type = Terrain.Dirt;
			//t.left.type = Dirt;
			//t.right.type = Dirt;
		//}
	}

/* === Instance Fields === */

	/* the Stage */
	public var stage : Stage;

	/* the Canvas Element being used */
	public var canvas : CanvasElement;

	/* the Game page */
	public var game : Game;

/* === Static Methods === */

	/* Main Function */
	public static function main():Void {
		var g = new GameMain();
	}
}
