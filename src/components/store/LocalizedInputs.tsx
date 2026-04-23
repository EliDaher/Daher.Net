import FormInput from "@/components/ui/custom/FormInput";
import type { LocalizedText } from "@/types/store";

type LocalizedInputsProps = {
  labelAr: string;
  labelEn: string;
  value: LocalizedText;
  onChange: (next: LocalizedText) => void;
};

export function LocalizedInputs({
  labelAr,
  labelEn,
  value,
  onChange,
}: LocalizedInputsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <FormInput
        label={labelAr}
        type="text"
        value={value.ar}
        onChange={(event) =>
          onChange({
            ...value,
            ar: event.target.value,
          })
        }
      />
      <FormInput
        label={labelEn}
        type="text"
        value={value.en}
        onChange={(event) =>
          onChange({
            ...value,
            en: event.target.value,
          })
        }
      />
    </div>
  );
}
