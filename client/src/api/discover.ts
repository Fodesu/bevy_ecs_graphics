import { fetcher, isBrpError, type JsonValue } from "./bevy_remote";

export interface Method {
  name: string;
  params: JsonValue[];
}

export interface DiscoverResult {
  info: {
    title: string;
    version: string;
  };
  methods: Method[];
  openrpc: string;
  servers: {
    name: string;
    url: string;
  };
}

export async function discover(): Promise<Method[]> {
  let payload = await fetcher<DiscoverResult>("rpc.discover", []);
  if (isBrpError(payload)) {
    console.error("throw error");
    throw new Error(payload.error.message);
  }
  console.log("payload : ", payload);
  return payload.result.methods;
}
