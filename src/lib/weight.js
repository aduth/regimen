export function roundToNearestPlate( weight, minPlateWeight ) {
	return Math.round( weight / ( minPlateWeight * 2 ) ) * ( minPlateWeight * 2 );
}
