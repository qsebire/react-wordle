import { ReactEventHandler } from "react";

export function Select({
  options,
  onSelect,
  value,
}: {
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  value: string;
}) {
  return (
    <div className="border border-white rounded-lg p-1">
      <select
        className="px-1"
        onChange={(e) => onSelect(e.target.value)}
        defaultValue={value}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
