import { useId } from 'react';

type Props = {
  className?: string;
  leftLabel: string;
  rightLabel: string;
  onToggle: () => void;
  toggled: boolean;
};

export function BillingOption({ className, leftLabel, rightLabel, toggled, onToggle }: Props) {
  const id = useId(); // Generates a unique ID (React 18+)

  const activeColor = 'rgb(2, 41, 90)'; // Color when active
  const inactiveColor = 'rgb(144, 144, 144)'; // Color when inactive

  return (
    <div className="relative flex items-center">
      {/* Monthly Label */}
      <span
        className="mr-2 text-sm font-semibold" // Font weight increased for thicker text
        style={{ color: toggled ? inactiveColor : activeColor }}
      >
        {leftLabel}
      </span>

      {/* Toggle Switch */}
      <div className={`${className} relative inline-block`}>
        <input
          id={id}
          type="checkbox"
          checked={toggled}
          onChange={onToggle}
          className="hidden peer"
        />
        <label
          htmlFor={id}
          data-left-label={leftLabel}
          data-right-label={rightLabel}
          className="relative inline-flex items-center justify-between px-1 py-1 rounded-full cursor-pointer peer-checked:bg-[rgb(2,41,90)] w-10 h-5 bg-[rgb(2,41,90)]"
        >
          <span className="sr-only">{rightLabel}</span>
          <span
            className={`absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform transform ${
              toggled ? 'translate-x-5' : 'translate-x-0'
            }`}
          ></span>
        </label>
      </div>

      {/* Yearly Label */}
      <span
        className="ml-2 text-sm font-semibold" // Font weight increased for thicker text
        style={{ color: toggled ? activeColor : inactiveColor }}
      >
        {rightLabel}
      </span>
    </div>
  );
}
