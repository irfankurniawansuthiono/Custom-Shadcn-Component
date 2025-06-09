// this is a custom hooks to save form input in local storage and load it when the page is reloaded
import { useRef } from "react";
import {
  useForm,
  UseFormProps,
  UseFormReturn,
  FieldValues,
} from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

interface UseFormWithPersistProps<T extends FieldValues> {
  storageKey: string;
  useFormOptions: UseFormProps<T>;
  exclude?: (keyof T)[];
  storage?: Storage;
}

export function useFormWithPersist<T extends FieldValues>({
  storageKey,
  useFormOptions,
  exclude = [],
  storage = typeof window !== "undefined" ? window.localStorage : undefined,
}: UseFormWithPersistProps<T>): UseFormReturn<T> {
  const raw = storage?.getItem(storageKey);
  let mergedDefaults: UseFormProps<T>["defaultValues"] =
    useFormOptions.defaultValues;

  if (raw) {
    try {
      mergedDefaults = { ...mergedDefaults, ...JSON.parse(raw) };
    } catch (e) {
      console.warn("Invalid localStorage data for", storageKey);
    }
  }

  const defaultValues =
    useRef<UseFormProps<T>["defaultValues"]>(mergedDefaults);

  const form = useForm<T>({
    ...useFormOptions,
    defaultValues: defaultValues.current,
  });

  useFormPersist(storageKey, {
    watch: form.watch,
    setValue: form.setValue,
    storage,
    exclude: exclude as string[],
  });

  return form;
}

// usage 
  const form = useFormWithPersist({
    storageKey: "addProductForm",
    useFormOptions: {
      resolver: zodResolver(addProductsSchema),
    defaultValues: {
      kodeSKU: "",
      barcode: "",
      nameOffline: "",
      nameOnline: "",
      description: "",
      weight: 0,
      shopeeLink: "",
      shopeeLink2: "",
      tokopediaLink: "",
      blibliLink: "",
      bigsellerLink: "",
      distributorName: "",
      tiktokLink: "",
      tocoLink: "",
      categoryId: 0,
      brandId: "",
      supplierId: "",
      supplierId2: "",
      modalExclude: 0,
      productPhotoLink: "",
      nonEditProductPhotoLink: "",
      modalInclude: 0,
      ppnPrice: 0,
      stock: 0,
      minStock: 0,
      satuan: [{ name: "", pcs: 0, margin: 0 }],
    },
    },
    exclude: ["productPhotoLink", "nonEditProductPhotoLink","ppnPrice", "modalInclude"]
  });
