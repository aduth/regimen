/**
 * Number of kilograms per pound
 *
 * @type {Number}
 */
const KILOGRAMS_PER_POUND = 2.2046226218;

/**
 * Returns weight rounded to the nearest plate.
 *
 * @param  {Number} weight   Absolute weight
 * @param  {Number} minPlate Minimum available plate size
 * @return {Number}          Weight rounded to nearest plate
 */
export function roundToNearestPlate( weight, minPlate ) {
	return Math.round( weight / ( minPlate * 2 ) ) * ( minPlate * 2 );
}

/**
 * Returns equivalent pound weight in kilograms.
 *
 * @param  {Number} weight Weight in pounds
 * @return {Number}        Weight in kilograms
 */
export function toKilograms( weight ) {
	return weight / KILOGRAMS_PER_POUND;
}

/**
 * Returns equivalent kilogram weight in pounds.
 *
 * @param  {Number} weight Weight in kilograms
 * @return {Number}        Weight in pounds
 */
export function toPounds( weight ) {
	return weight * KILOGRAMS_PER_POUND;
}
