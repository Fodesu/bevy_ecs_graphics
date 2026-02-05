import { api } from "@/lib/axios";

export interface BrpRequest {
  jsonrpc: "2.0";
  method: string;
  id?: number;
  params?: JsonValue;
}

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export type Result<T> = {
  result: T;
};
export type Error = {
  error: BrpError;
};

export interface BrpError {
  code: number;
  message: string;
  data?: JsonValue;
}

export type BrpPayload<T> = Result<T> | Error;

export interface BrpSuccessResponse<T> {
  jsonrpc: "2.0";
  id: number;
  result: T;
}

export interface BrpErrorResponse {
  jsonrpc: "2.0";
  id: number | null;
  error: BrpError;
}

export type BrpResponse<T> = BrpSuccessResponse<T> | BrpErrorResponse;

export async function fetcher<T>(
  method: string,
  params: JsonValue,
): Promise<Result<T> | Error> {
  const rpcbody: BrpRequest = {
    jsonrpc: "2.0",
    method,
    params,
    id: Date.now(),
  };
  const { data } = await api.post<BrpResponse<T>>("", rpcbody);
  console.log(data);
  // 将标准 JSON-RPC 格式转换为内部使用的格式
  if ("error" in data) {
    return { error: data.error };
  }
  return { result: data.result };
}

export function isBrpError<T>(payload: Result<T> | Error): payload is Error {
  return payload && "error" in payload;
}
