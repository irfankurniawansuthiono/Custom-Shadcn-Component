"use client";

import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import debounce from "lodash.debounce";

type RangeFilterButtonProps = {
  queryKey: string;
  max?: number;
  step?: number;
  defaultValue?: number;
};

const RangeFilterButton = ({
  queryKey,
  max = 1000,
  step = 1,
  defaultValue = 50,
}: RangeFilterButtonProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [value, setValue] = useState<string>(defaultValue.toString());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQueryParam = useCallback(
    debounce((val: string) => {
      const parsed = parseInt(val, 10);
      if (!isNaN(parsed)) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(queryKey, parsed.toString());
        router.push(`?${params.toString()}`);
      }
    }, 500),
    [searchParams, router, queryKey]
  );

  useEffect(() => {
    updateQueryParam(value);
  }, [value, updateQueryParam]);

  const numericValue = parseInt(value, 10);

  return (
    <div className="flex gap-2 items-center w-full">
      <Slider
        value={[isNaN(numericValue) ? 0 : numericValue]}
        max={max}
        step={step}
        onValueChange={(val) => setValue(val[0].toString())}
        className="w-2/3"
      />
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="TABLE COUNT"
        className="w-1/3"
      />
    </div>
  );
};

export default RangeFilterButton;
