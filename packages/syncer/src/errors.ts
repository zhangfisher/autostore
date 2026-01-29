import type { StateOperate } from "autostore";
import type { StateRemoteOperate } from "./types";

export class AutoStoreSyncError extends Error {
    operate?: StateOperate | StateRemoteOperate;
}
