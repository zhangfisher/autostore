import type { AnyAutoStore } from "../types";

export * from "./cascadeDestroy";
export * from "./refState";

export type IAutoStorePlugin = (store: AnyAutoStore) => void;
