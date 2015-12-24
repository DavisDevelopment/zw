package war.world;

import tannus.graphics.Color;

import war.world.Terrain;

class TerrainTools {
	/**
	  * Determine what Color the given Terrain should be
	  */
	public static function color(t : Terrain):Color {
		switch ( t ) {
			case Grass:
				return new Color(0, 128, 0);

			case Dirt:
				return new Color(51, 26, 0);
			
			case Stone:
				return new Color(64, 64, 64);

			case Sand:
				var min = new Color(153, 102, 0);
				var max = new Color(255, 255, 102);
				return max;//.mix(max, 50);

			case Water:
				var min = Color.fromInt( 0x0099FF );
				var max = Color.fromInt( 0x0000FF );
				return min;//.mix(max, 50);
		}
	}
}
