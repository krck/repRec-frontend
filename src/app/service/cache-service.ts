import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root', // Singleton
})
export class CacheService {

    constructor() { }

    private cache: { [key: string]: any } = {};

    // Get the cached value or null
    get(key: string): any {
        return this.cache[key] || null;
    }

    // Set the cached value
    set(key: string, value: any): void {
        this.cache[key] = value;
    }

    // Clear the cached value
    clear(key: string): void {
        delete this.cache[key];
    }

}
