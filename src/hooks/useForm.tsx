import { useEffect, useCallback, useState } from "react";

import _ from "lodash";

//Types
import type { NestedKeyOf } from "@/utils/types";

type TFormDefault = Record<string, any>;

export interface FormStateHookProps<TData> {
	initial?: Partial<TData>;
	/**
	 * @description Watch initial data and keep sync, this might replace current state.
	 */
	syncInitial?: Array<unknown>;
	/**
	 * @description Watch for changes in array and trigger clean.
	 */
	cleanWatcher?: Array<unknown>;
	/**
	 * @description print logs in console with state
	 */
	debug?: boolean;
}

export function useFormState<TForm extends Record<string, any> = TFormDefault>(props: FormStateHookProps<TForm> = {}) {
	const [state, dispatch] = useState<TForm>(() => {
		//If initial state set.
		if (props.initial) {
			return props.initial as TForm;
		}

		return {} as TForm;
	});

	/**
	 * Debug every state change
	 */
	useEffect(() => {
		if (props.debug) {
			console.log("DEBUG: useFormState =>", JSON.stringify(state));
		}
	}, [state]);

	/**
	 * Sync initial changes.
	 */
	useEffect(() => {
		//Only check if is defined.
		if (props.syncInitial && Object.keys(props.initial || []).length) {
			dispatch(props.initial as TForm);
		}
	}, props.syncInitial || []);

	/**
	 * Watcher for "cleanup"
	 * this is helpfull if the hook is used on a modal component
	 */
	useEffect(() => {
		if (!_.isEmpty(state)) {
			cleanup();
		}
	}, props.cleanWatcher || []);

	/**
	 * @description Update state by key using lodash set/unset.
	 */
	const updateState = useCallback(
		(fields: TForm, params: { name: string; value: any; persist?: boolean; empty?: boolean }) => {
			/**
			 * Check if value is empty, null or undefined and unset.
			 * If persist is true, don't delete field.
			 */
			if ((_.isNil(params.value) || params.value === "") && !params.persist) {
				//Remove field from state
				_.unset(fields, params.name);

				//Return early
				return fields;
			}

			/**
			 * If persist is set
			 */
			if (params.persist) {
				/**
				 * and is not a boolean, update to null by default.
				 */
				if (!_.isBoolean(params.value) && !params.value) {
					// if empty is true, set to "" else set to null
					if (params.empty) {
						params.value = "";
					} else {
						params.value = null;
					}
				}
			}

			/**
			 * Set new/existing field
			 */
			_.set<TForm>(fields as object, params.name, params.value);
		},
		[],
	);

	/**
	 * @description Update fields by key using lodash set/unset.
	 */
	const mutateField = useCallback((params: { name: string; value: any; persist?: boolean; empty?: boolean }) => {
		dispatch((prev) => {
			const fields = { ...prev };

			updateState(fields, params);

			return fields;
		});
	}, []);

	/**
	 * @description Update multiple fields by key using lodash set/unset.
	 */
	const mutateBulkField = useCallback((fields: Array<{ name: string; value: any; persist?: boolean }>) => {
		dispatch((prev) => {
			const newFields = { ...prev };

			_.forEach(fields, (field) => updateState(newFields, field));

			return newFields;
		});
	}, []);

	/**
	 * @description Extend "mutateField" by using debounce
	 */
	const mutateBounceField = useCallback(_.debounce(mutateField, 200), [mutateField]);

	/**
	 * @description Get value of a field by key
	 */
	const getField = useCallback(
		(field: NestedKeyOf<TForm>, opts?: { default: any }) => {
			return _.get(state, field, opts?.default);
		},
		[state],
	);

	/**
	 * @description Clean up form
	 */
	const cleanup = useCallback(() => {
		if (props.initial) {
			dispatch(props.initial as TForm);

			return;
		}

		dispatch({} as TForm);
	}, [props.initial]);

	/**
	 * @description set object to form, e.g to push entire object to form state
	 */
	const setForm = useCallback((data: Record<string, unknown>, opts: { force?: boolean } = {}) => {
		dispatch((prev) => {
			if (opts.force) return data as TForm;
			
			return { ...prev, ...data };
		});
	}, []);

	return {
		state,
		cleanup,
		field: {
			get: getField,
			mutate: mutateField,
			mutateBulk: mutateBulkField,
			mutateBounce: mutateBounceField,
			set: setForm,
		},
	};
}
