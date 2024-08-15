import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NestedData, OnboardingProps } from './types/auth';
import { ApiResponse, ErrorResponse, SidebarLink } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stringifyParse = (value: any) => JSON.parse(JSON.stringify(value));

export const handleError = (error: any): ErrorResponse => {
  if (error.message !== 'No session') console.error(error);

  return { success: false, message: (error.message as string) || 'An unexpected error occurred' };
};

export const isErrorResponse = (response: ApiResponse): response is ErrorResponse => {
  return !response.success && !!response.message;
};

export const formatJson = (json: any) => {
  const intl = Intl.DateTimeFormat().resolvedOptions();
  const formatDateWithTimezone = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(intl.locale, { timeZone: intl.timeZone });
  };

  const traverseAndFormatDates = (obj: any): any => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(obj[key])) {
            obj[key] = formatDateWithTimezone(obj[key]);
          } else if (typeof obj[key] === 'object') {
            traverseAndFormatDates(obj[key]);
          }
        }
      }
    }
  };

  const jsonClone = JSON.parse(JSON.stringify(json));
  traverseAndFormatDates(jsonClone);
  let jsonString = JSON.stringify(jsonClone, null, 2);

  jsonString = jsonString
    .replace(/&/g, '&amp;') // Escape & as &amp;
    .replace(/</g, '&lt;') // Escape < as &lt;
    .replace(/>/g, '&gt;') // Escape > as &gt;
    .replace(/"/g, '&quot;'); // Escape " as &quot;

  // Replace string values with Tailwind class for strings
  jsonString = jsonString.replace(/&quot;([^&]+)&quot;:/g, '<span style="color: #5be82c; font-weight: normal">&quot;$1&quot;</span>'); // Strings

  return jsonString;
};

export const findBreadcrumbs = (links: SidebarLink[], path: string, breadcrumbs: SidebarLink[] = []): SidebarLink[] => {
  for (const link of links) {
    if (link.route === path) {
      return [...breadcrumbs, link];
    }
    if (link.routes) {
      const found = findBreadcrumbs(link.routes, path, [...breadcrumbs, link]);
      if (found.length) {
        return found;
      }
    }
  }
  return [];
};

export function toObject(value: any): Record<string, any> {
  // Check if value is already an object and not null
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value;
  }

  // Try to parse value if it's a string
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Parsing failed, ignore and return empty object
    }
  }

  // Default to empty object if not an object or failed to parse
  return {};
}

export const extractTwoLevelValues = (data: Record<string, any>): Record<string, any> => {
  const result: Record<string, any> = {};

  for (const key in data) {
    if (typeof data[key] === 'object' && !Array.isArray(data[key])) {
      for (const nestedKey in data[key]) {
        result[nestedKey] = data[key][nestedKey];
      }
    } else {
      result[key] = data[key];
    }
  }

  return result;
};

// RECURSIVELY LOOK AND APPLY CHANGES TO ONBOARDING AWNSERS
export function detectAndApplyChanges<T extends object>(original: any, updated: any): T {
  function deepCompareAndUpdate(original: any, updated: any): any {
    if (typeof original === 'string' && typeof updated === 'string') {
      try {
        const originalObj = JSON.parse(original);
        const updatedObj = JSON.parse(updated);
        return JSON.stringify(deepCompareAndUpdate(originalObj, updatedObj));
      } catch (e) {
        return updated; // If parsing fails, return the updated string
      }
    }

    if (typeof original !== 'object' || original === null || typeof updated !== 'object' || updated === null) {
      return updated !== undefined ? updated : original;
    }

    const updatedObject: any = Array.isArray(original) ? [...original] : { ...original };
    for (const key in updated) {
      updatedObject[key] = deepCompareAndUpdate(original[key], updated[key]);
    }

    return updatedObject;
  }

  return deepCompareAndUpdate(original, updated) as T;
}
