import type { AnyAutoStore } from "../types";

export * from "./refState";

export type IAutoStorePlugin = (store: AnyAutoStore) => void;
