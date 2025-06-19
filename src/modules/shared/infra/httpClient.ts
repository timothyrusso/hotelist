import type { Result } from "../domain/entities/Result";

/**
 * Sends an HTTP request to the specified URL with the given options and returns a promise
 * that resolves to a Result object containing the response data or an error.
 *
 * @template T - The type of the data expected in the successful response.
 * @param {string} url - The URL to which the request is sent.
 * @param {RequestInit} [options] - Optional configuration for the request.
 * @returns {Promise<Result<T>>} A promise that resolves to a Result object with the response data
 * if successful, or an error if the request fails.
 */
export async function httpClient<T>(
	url: string,
	options?: RequestInit,
): Promise<Result<T>> {
	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`HTTP error, status: ${response.status}`);
		}

		const data = await response.json();

		return { success: true, data };
	} catch (error) {
		const err = error instanceof Error ? error : new Error("Unknown error");
		console.error(err);

		return { success: false, error: err };
	}
}
