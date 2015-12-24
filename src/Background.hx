package ;

import chrome.Runtime;
import chrome.Windows;
import chrome.app.AppWindow;

class Background {
	/* Constructor Function */
	public function new():Void {
		listen();
	}

/* === Instance Methods === */

	/**
	  * Listen for events and shit
	  */
	private function listen():Void {
		Runtime.onLaunch(function(data):Void {
			Windows.create('../pages/index.html', null, function(appw) {
				appw.maximize();
				appw.drawAttention();
			});
		});
	}

/* === Static Methods === */

	/* main function */
	public static function main():Void {
		new Background();
	}
}
