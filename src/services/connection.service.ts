import { get, post, put, del } from './api';
import { Business } from './business.service';

export interface Connection {
  id: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  requesterId: string;
  recipientId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  requester?: Business;
  recipient?: Business;
}

export interface ConnectionResponse {
  status: string;
  data: Connection[];
}

export interface ConnectionDetailResponse {
  status: string;
  data: Connection;
}

/**
 * Get all connections for the current user
 */
export const getMyConnections = () => {
  return get<ConnectionResponse>('/connections');
};

/**
 * Get all pending connection requests for the current user
 */
export const getMyConnectionRequests = () => {
  return get<ConnectionResponse>('/connections/requests');
};

/**
 * Send a connection request to another business
 */
export const sendConnectionRequest = (recipientId: string, message: string) => {
  return post<ConnectionDetailResponse>('/connections', { recipientId, message });
};

/**
 * Accept a connection request
 */
export const acceptConnectionRequest = (connectionId: string) => {
  return put<ConnectionDetailResponse>(`/connections/${connectionId}/accept`, {});
};

/**
 * Reject a connection request
 */
export const rejectConnectionRequest = (connectionId: string) => {
  return put<ConnectionDetailResponse>(`/connections/${connectionId}/reject`, {});
};

/**
 * Remove a connection
 */
export const removeConnection = (connectionId: string) => {
  return del<{ status: string; message: string }>(`/connections/${connectionId}`);
};
