"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import debounce from "lodash.debounce";
import { Search } from "lucide-react";
import { InputWithIcon } from "@/components/Form/InputWithIcon";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/selectWithCloseIcon";

type Option = {
  label: string;
  value: string;
  queryKey?: string;
};

interface SearchWithSelectProps {
  placeholder?: string;
  queryKey?: string;
  selectKey?: string;
  selectOptions?: Option[];
}

export default function SearchWithSelect({
  placeholder = "Search...",
  queryKey = "q",
  selectOptions = [],
}: SearchWithSelectProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedQueryKey, setSelectedQueryKey] = useState(queryKey);

  // Set initial values from URL
  useEffect(() => {
    const matchedOption = selectOptions.find((opt) =>
      searchParams.has(opt.queryKey || queryKey)
    );

    if (matchedOption) {
      setSelectedOption(matchedOption.value); // set filter yang dipilih
      setSelectedQueryKey(matchedOption.queryKey || queryKey); // set query key yg dipakai
      setSearchTerm(searchParams.get(matchedOption.queryKey!) ?? ""); // isi pencarian dari URL
    } else {
      setSelectedOption("");
      setSelectedQueryKey(queryKey);
      setSearchTerm(searchParams.get(queryKey) ?? "");
    }
  }, [searchParams, selectOptions, queryKey]);

  const updateUrl = useCallback(
    (search: string, select: string, key: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Bersihkan semua queryKey dari filter
      selectOptions.forEach((opt) => {
        if (opt.queryKey) {
          params.delete(opt.queryKey);
        }
      });

      params.set(key, search);

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [router, pathname, searchParams, selectOptions]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string, key: string) => {
        updateUrl(value, selectedOption, key);
      }, 500),
    [updateUrl, selectedOption]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value, selectedQueryKey);
  };

  const handleSelectChange = (value: string) => {
    const selected = selectOptions.find((opt) => opt.value === value);

    const newKey = selected?.queryKey || queryKey;
    const newValue = searchTerm;

    setSelectedOption(value);
    setSelectedQueryKey(newKey);

    updateUrl(newValue, value, newKey);
  };

  const resetFilter = () => {
    setSearchTerm("");
    setSelectedOption("");
    setSelectedQueryKey(queryKey);

    const params = new URLSearchParams(searchParams.toString());

    params.delete(queryKey);
    selectOptions.forEach((opt) => {
      if (opt.queryKey) {
        params.delete(opt.queryKey);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-xl">
      <InputWithIcon
        type="text"
        variant="default"
        placeholder={placeholder}
        startIcon={<Search />}
        className="w-full"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {selectOptions.length > 0 && (
        <Select value={selectedOption} onValueChange={handleSelectChange}>
          <SelectTrigger
            value={selectedOption}
            className="w-full sm:w-40"
            onReset={() => resetFilter()}
          >
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {selectOptions.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
