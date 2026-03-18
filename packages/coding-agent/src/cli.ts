#!/usr/bin/env node
/**
 * CLI entry point for the refactored coding agent.
 * Uses main.ts with AgentSession and new mode modules.
 *
 * Test with: npx tsx src/cli-new.ts [args...]
 */
process.title = "pi";

import { EnvHttpProxyAgent, setGlobalDispatcher } from "undici";
import { main } from "./main.js";

// Fix timeout issue: https://github.com/badlogic/pi-mono/issues/2257
// Default undici timeout is 300s, extend to 1 hour for long-running LLM calls
setGlobalDispatcher(
	new EnvHttpProxyAgent({
		bodyTimeout: 3600_000, // 1 hour
		headersTimeout: 3600_000, // 1 hour
	}),
);

main(process.argv.slice(2));
