/**
 * @description Utility type to recursively generate nested key paths
 */
export type NestedKeyOf<ObjectType extends object> = {
	[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends infer R | undefined
		? R extends object
			? Key extends "array"
				? never
				: `${Key}` | `${Key}.${NestedKeyOf<R>}`
			: `${Key}`
		: ObjectType[Key] extends object
			? Key extends "array"
				? never
				: `${Key}` | (ObjectType[Key] extends Array<any> ? never : `${Key}.${NestedKeyOf<ObjectType[Key]>}`)
			: `${Key}`;
}[keyof ObjectType & (string | number)];
