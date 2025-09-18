import React, { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
  value?: string;
  error?: boolean;
  hint?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value = "",
  error = false,
  hint,
}) => {
  // Manage the selected value

  let inputClasses = `h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 ${
    value
      ? "text-gray-800 dark:text-white/90"
      : "text-gray-400 dark:text-gray-400"
  } ${className}`;

  if (error) {
    inputClasses += ` text-error-800 border-error-500 focus:ring-3 focus:ring-error-500/10  dark:text-error-400 dark:border-error-500`;
  } else {
    inputClasses += ` border-gray-300`;
  }

  return (
    <div>
      <select
        id={id}
        className={inputClasses}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value;
          onChange(value);
        }}
      >
        {/* Placeholder option */}
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {placeholder}
        </option>
        {/* Map over options */}
        {options.map((option) => (
          <option
            key={`${option.label}-${option.value}`}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
      {hint && (
        <p
          className={`mt-1.5 text-xs ${
            error ? "text-error-500" : "text-gray-500"
          }`}
        >
          {hint}
        </p>
      )}
    </div>
  );
};

export default Select;
