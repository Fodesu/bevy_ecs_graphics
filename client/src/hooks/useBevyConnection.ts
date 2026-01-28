import { useState, useCallback } from 'react';
import { invoke } from '@tauri-apps/api/core';

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface BevyConnection {
  status: ConnectionStatus;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  checkConnection: () => Promise<boolean>;
}

export function useBevyConnection(): BevyConnection {
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    try {
      setStatus('connecting');
      setError(null);
      
      // 调用 Tauri 命令启动 Bevy 应用
      await invoke('start_bevy_app');
      
      // 检查连接状态
      const isConnected = await invoke('check_bevy_connection');
      
      if (isConnected) {
        setStatus('connected');
      } else {
        setStatus('error');
        setError('无法连接到 Bevy 应用');
      }
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '连接失败');
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await invoke('stop_bevy_app');
      setStatus('disconnected');
      setError(null);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : '断开连接失败');
    }
  }, []);

  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      const isConnected = await invoke('check_bevy_connection');
      if (isConnected) {
        setStatus('connected');
        return true;
      } else {
        setStatus('disconnected');
        return false;
      }
    } catch {
      setStatus('disconnected');
      return false;
    }
  }, []);

  return {
    status,
    error,
    connect,
    disconnect,
    checkConnection,
  };
}