import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalServiceService {

  constructor() { }
 
  
  // full CURD operation in localstorage
 // Set a value in local storage
 setItem(key: string, value: any): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Get a value from local storage
getItem(key: string): any {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

// Remove a value from local storage
removeItem(key: string): void {
  localStorage.removeItem(key);
}

// Clear all values from local storage
clear(): void {
  localStorage.clear();
}
  // full CURD operation in localstorage

}
