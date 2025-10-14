import type { ComputedOptions } from "../computed/types";


export function getDefaultComputedOptions():ComputedOptions{
    return {
        async    : false,
		enable         : true,
		timeout        : 0,
		depends        : [],
		immediate      : "auto",     
		extras         : undefined,
        objectify	   : true,
		// reentry        : true
    }
}