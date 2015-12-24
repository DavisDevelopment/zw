package war.ui;

import gryffin.core.*;
import gryffin.display.*;
import gryffin.ui.*;

import tannus.geom.*;
import tannus.events.*;

import war.core.Ent;

class TextButton extends Ent {
	/* Constructor Function */
	public function new():Void {
		super();

		box = new TextBox();
		hovered = false;

		on('click', click);
	}

/* === Instance Methods === */

	/* update [this] Button */
	override public function update(stage : Stage):Void {
		super.update( stage );

		var mp = stage.getMousePosition();
		if (mp != null) {
			hovered = containsPoint( mp );
		}

		if ( hovered ) {
			stage.cursor = 'pointer';
		}
	}

	/* render [this] Shit */
	override public function render(stage:Stage, c:Ctx):Void {
		super.render(stage, c);

		c.drawComponent(box, 0, 0, w, h, x, y, w, h);
	}

	/* when [this] shit gets clicked */
	public function click(e : MouseEvent):Void {
		e.preventDefault();
	}

/* === Computed Instance Fields === */

	/* the textual content of [this] Button */
	public var text(get, set):String;
	private inline function get_text():String return box.text;
	private inline function set_text(v : String):String return (box.text = v);

	/* the font-family of [this] button */
	public var fontFamily(get, set):String;
	private inline function get_fontFamily():String return box.fontFamily;
	private inline function set_fontFamily(v : String):String return (box.fontFamily = v);

	/* the font-size of [this] button */
	public var fontSize(get, set):Int;
	private inline function get_fontSize():Int return box.fontSize;
	private inline function set_fontSize(v : Int):Int return (box.fontSize = v);

	/* the width of [this] button */
	override private function get_w():Float {
		return box.width;
	}

	/* the height of [this] button */
	override private function get_h():Float {
		return box.height;
	}

/* === Instance Fields === */

	private var box : TextBox;

	private var hovered : Bool;
}
