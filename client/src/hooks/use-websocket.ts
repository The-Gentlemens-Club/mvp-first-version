import { useEffect, useRef, useState, useCallback } from 'react';

interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: number;
}

interface UseWebSocketOptions {
  reconnectAttempts?: number;
  reconnectDelay?: number;
  onMessage?: (message: WebSocketMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
}

export function useWebSocket(url: string, options: UseWebSocketOptions = {}) {
  const {
    reconnectAttempts = 5,
    reconnectDelay = 3000,
    onMessage,
    onConnect,
    onDisconnect,
    onError
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
  
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const reconnectCount = useRef(0);
  const mountedRef = useRef(true);

  const connect = useCallback(() => {
    if (!mountedRef.current) return;
    
    try {
      setConnectionStatus('connecting');
      ws.current = new WebSocket(url);
      
      ws.current.onopen = () => {
        if (!mountedRef.current) return;
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectCount.current = 0;
        onConnect?.();
      };
      
      ws.current.onmessage = (event) => {
        if (!mountedRef.current) return;
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          setLastMessage(message);
          onMessage?.(message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };
      
      ws.current.onclose = () => {
        if (!mountedRef.current) return;
        setIsConnected(false);
        setConnectionStatus('disconnected');
        onDisconnect?.();
        
        // Attempt reconnection if within retry limits
        if (reconnectCount.current < reconnectAttempts) {
          reconnectCount.current++;
          reconnectTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              connect();
            }
          }, reconnectDelay);
        }
      };
      
      ws.current.onerror = (error) => {
        if (!mountedRef.current) return;
        setConnectionStatus('error');
        onError?.(error);
        console.error('WebSocket error:', error);
      };
      
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionStatus('error');
    }
  }, [url, onMessage, onConnect, onDisconnect, onError, reconnectAttempts, reconnectDelay]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (ws.current && isConnected) {
      try {
        ws.current.send(JSON.stringify(message));
        return true;
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
        return false;
      }
    }
    return false;
  }, [isConnected]);

  useEffect(() => {
    mountedRef.current = true;
    connect();
    
    return () => {
      mountedRef.current = false;
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    lastMessage,
    sendMessage,
    reconnect: connect,
    disconnect
  };
}

export default useWebSocket;