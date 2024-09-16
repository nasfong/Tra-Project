import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns";
import { Constant } from "./constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dateDisplay(date: string, formatStr: string): string {
  const isoDate = new Date(date);
  return format(isoDate, formatStr)
}

export function statusDisplay(value: number): string | undefined {
  const status = Constant.status
  return Object.keys(status).find(key => status[key as keyof typeof status] === value);
}

