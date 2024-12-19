/**
 * A utility class for handling pluralization of words based on a count.
 * 
 * @example
 * ```typescript
 * const itemPluralize = Pluralize.ITEM;
 * console.log(itemPluralize.getString(1)); // "item"
 * console.log(itemPluralize.getString(2)); // "items"
 * console.log(itemPluralize.getString(0)); // "items"
 * console.log(itemPluralize.getPrefixedString(5)); // "5 items"
 * console.log(itemPluralize.getPrefixedString(0, 'No')); // "No items"
 * ```
 */
export class Pluralize {
  constructor(
    private readonly singular: string,
    private readonly plural: string,
    private readonly zero: string = plural,
  ) { }

  static get ITEM(): Pluralize {
    return new Pluralize('item', 'items')
  }

  /**
   * Returns the appropriate string (singular, plural, or zero) based on the provided count.
   * 
   * @param count - A number or an array. If an array is provided, its length will be used as the count.
   * @returns The singular form if the count is 1, the plural form if the count is greater than 1, 
   *          and the zero form if the count is 0.
   */  
  getString(count: number | Array<unknown>): string {
    const resolvedCount = Array.isArray(count) 
      ? count.length 
      : count

    if (resolvedCount === 0) {
      return this.zero
    }

    if (resolvedCount === 1) {
      return this.singular
    }

    return this.plural
  }

  /**
   * Generates a prefixed string based on the provided count.
   * 
   * @param count - A number or an array. If an array is provided, its length will be used as the count.
   * @param ifZero - An optional string to use as the prefix if the count is zero.
   * @returns A string that combines the prefix and the result of `getString` method.
   */
  getPrefixedString(
    count: number | Array<unknown>, 
    ifZero?: string,
  ): string {
    const resolvedCount = Array.isArray(count) 
      ? count.length 
      : count

    const prefix = resolvedCount === 0 && ifZero
      ? ifZero
      : resolvedCount

    return `${prefix} ${this.getString(resolvedCount)}`
  }
}
