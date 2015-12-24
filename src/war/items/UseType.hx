package war.items;

@:enum
abstract UseType (Int) to Int {
	/* cannot be used at all */
	var None = -1;

	/* use by clicking while equipped */
	var Normal = 0;

	/* continuous use by holding down the mouse button */
	var Continuous = 2;

	/* use immediately upon pickup */
	var Pickup = 1;
}
