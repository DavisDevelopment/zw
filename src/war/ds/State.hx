package war.ds;

import tannus.mvc.Model;
import tannus.storage.chrome.ChromeStorage in Store;
import tannus.chrome.Storage.sync in store;
import tannus.chrome.FileSystem in Fs;
import tannus.html.fs.*;

class State extends Model {
	/* Constructor Function */
	public function new():Void {
		super();

		storage = new Store(store);
	}

/* === Instance Methods === */

	/**
	  * get the state-folder
	  */
	public function getFolder(cb : WebDirectoryEntry->Void):Void {
		if (folder == null) {
			Fs.chooseDirectory().then(function(d) {
				folder = Fs.retainEntry(cast d);
				cb( d );
				save();
			});
		}
		else {
			Fs.restoreEntry(folder, untyped cb);
		}
	}

	/**
	  * get the player-file
	  */
	public function getPlayerFile(cb : WebFileEntry->Void):Void {
		getFolder(function(dir) {
			dir.createFile(cast 'player.dat').then( cb );
		});
	}

	/**
	  * get the world-file
	  */
	public function getWorldFile(cb : WebFileEntry->Void):Void {
		getFolder(function(dir) {
			dir.createFile(cast 'world.dat').then( cb );
		});
	}

/* === Computed Instance Fields === */

	/* state-folder */
	public var folder(get, set):Null<String>;
	private function get_folder():Null<String> {
		return get('folder');
	}
	private function set_folder(v : Null<String>):Null<String> {
		return set('folder', v);
	}
}
