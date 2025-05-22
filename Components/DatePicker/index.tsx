"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components//ui/form";

type DatePickerProps = {
  control: any;
  name: string;
  required?: boolean;
  onlyUtc?: boolean;
};

function parseSafeDate(input: string | Date | null | undefined): Date | null {
  if (!input) return null;
  if (input instanceof Date) return input;
  const parsed = new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function getUTCDateOnly(date: Date) {
  // Return Date object dengan waktu 00:00:00 di zona UTC
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

export function DatePicker({ control, name, required = false, onlyUtc = false }: DatePickerProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Safely parse and optionally convert to UTC-only
        const rawDate = parseSafeDate(field.value);
        const value = onlyUtc && rawDate ? getUTCDateOnly(rawDate) : rawDate;

        return (
          <FormItem className="flex flex-col">
            <FormLabel required={required}>Event Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value || undefined}
                  onSelect={(selected) => {
                    if (selected) {
                      const updated = onlyUtc
                        ? getUTCDateOnly(selected)
                        : selected;
                      field.onChange(updated);
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
