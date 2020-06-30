/**
 * @module stateManager
 */
import React from "react";
import * as _ from "lodash";

import storage from "./storage";
import { filterArray } from "./array/filterArray";

class Store<T> {
  state: T;

  private listeners: React.Dispatch<any>[];

  private readonly opts: any;

  constructor(initialState: T, listeners: React.Dispatch<any>[], opts?: any) {
    if (opts && opts.local) {
      storage
        .get(opts.local)()
        .then(localState => this.setState(localState));
    }

    this.state = initialState;
    this.listeners = listeners;
    this.opts = opts;
  }

  private setState = (value: T | ((previous: T) => T)) => {
    let val = value;
    if (value instanceof Function) {
      val = value(this.state);
    }

    Promise.resolve(val).then(async resp => {
      this.state = { ...this.state, ...resp };
      this.listeners.forEach(listener => {
        listener(this.state);
      });
      if (this.opts && this.opts.local) {
        let stateKeys = Object.keys(this.state);
        if (Array.isArray(this.opts.blacklist)) {
          this.opts.blacklist.forEach((key: string) => {
            stateKeys = filterArray(stateKeys, key, "indexOf", true);
          });
        }
        let state = {};
        stateKeys.map((k: string) => {
          // @ts-ignore
          state = { ...state, [k]: _.cloneDeep(this.state[k]) };
          return k;
        });
        await storage.set(this.opts.local)(this.state);
      }
    });
  };

  /* eslint-disable react-hooks/rules-of-hooks */
  useCustom = (): [T, (value: T | ((previous: T) => T)) => void] => {
    const [, newListener] = React.useState();
    React.useEffect(() => {
      this.listeners.push(newListener);
      return () => {
        this.listeners = this.listeners.filter(
          listener => listener !== newListener,
        );
      };
    }, []);

    return [this.state, this.setState];
  };
}

/**
 * Exports a custom local state manager function to be used in place of any Redux like logic
 * @function stateManager
 * @param {Object} initialState - The initial state of the manager
 * @param {Object} [opts] - State manager opts
 * @returns {() => [Object, Function]} Current state and function for state updating
 */
export default function stateManager<T>(initialState: T, opts?: any) {
  const newStore = new Store<T>(initialState, [], opts);

  return newStore.useCustom;
}
