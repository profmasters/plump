/**
 * Plumb Control OS - Authenticated API Client
 * Enforces canonical security verification, claim headers, and audit tracing.
 * 
 * Boundary Chain:
 * Client route guard -> Server-side session/claim verification -> API authorization -> Tenant/platform scope -> Audit logging
 */

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

export async function fetchWithSession<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const headers = new Headers(options.headers || {});
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    const res = await fetch(endpoint, {
      ...options,
      headers,
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      return {
        error: body.error || 'API_REQUEST_FAILED',
        message: body.message || `Request failed with status ${res.status}`,
        statusCode: res.status,
      };
    }

    return {
      data: body as T,
      statusCode: res.status,
    };
  } catch (err: any) {
    return {
      error: 'NETWORK_ERROR',
      message: err.message || 'Failed to communicate with Plumb Control OS API server.',
      statusCode: 0,
    };
  }
}
