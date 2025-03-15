import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from './cn';

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
  translations?: {
    hours?: string;
    minutes?: string;
  };
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  className,
  disabled = false,
  translations = {}
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [hours, minutes] = value.split(':').map(Number);
  const [selectedHours, setSelectedHours] = useState(hours || 12);
  const [selectedMinutes, setSelectedMinutes] = useState(minutes || 0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when value changes
  useEffect(() => {
    const [newHours, newMinutes] = value.split(':').map(Number);
    setSelectedHours(newHours || 12);
    setSelectedMinutes(newMinutes || 0);
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleHoursChange = (newHours: number) => {
    setSelectedHours(newHours);
    onChange(`${String(newHours).padStart(2, '0')}:${String(selectedMinutes).padStart(2, '0')}`);
  };

  const handleMinutesChange = (newMinutes: number) => {
    setSelectedMinutes(newMinutes);
    onChange(`${String(selectedHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`);
  };

  const incrementHours = () => {
    const newHours = (selectedHours + 1) % 24;
    handleHoursChange(newHours);
  };

  const decrementHours = () => {
    const newHours = (selectedHours - 1 + 24) % 24;
    handleHoursChange(newHours);
  };

  const incrementMinutes = () => {
    const newMinutes = (selectedMinutes + 5) % 60;
    handleMinutesChange(newMinutes);
  };

  const decrementMinutes = () => {
    const newMinutes = (selectedMinutes - 5 + 60) % 60;
    handleMinutesChange(newMinutes);
  };

  const hoursOptions = Array.from({ length: 24 }, (_, i) => i);
  const minutesOptions = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <div 
        className={cn(
          "flex items-center w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-950 dark:focus-within:ring-blue-600 transition-colors",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
        <span className="flex-1 text-gray-900 dark:text-gray-100">
          {String(selectedHours).padStart(2, '0')}:{String(selectedMinutes).padStart(2, '0')}
        </span>
        {!disabled && (
          <div className="flex flex-col">
            <ChevronUp 
              className="h-3 w-3 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                incrementHours();
              }}
            />
            <ChevronDown 
              className="h-3 w-3 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                decrementHours();
              }}
            />
          </div>
        )}
        <span className="mx-1 text-gray-500 dark:text-gray-400">:</span>
        {!disabled && (
          <div className="flex flex-col">
            <ChevronUp 
              className="h-3 w-3 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                incrementMinutes();
              }}
            />
            <ChevronDown 
              className="h-3 w-3 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" 
              onClick={(e) => {
                e.stopPropagation();
                decrementMinutes();
              }}
            />
          </div>
        )}
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex p-2">
            <div className="w-1/2 border-r border-gray-200 dark:border-gray-700 pr-2 max-h-48 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 text-center">{t(translations.hours || 'scheduleModal.timePicker.hours')}</div>
              {hoursOptions.map((hour) => (
                <div
                  key={hour}
                  className={cn(
                    "py-1 px-2 text-center cursor-pointer rounded-md text-sm transition-colors",
                    selectedHours === hour
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => {
                    handleHoursChange(hour);
                    setIsOpen(false);
                  }}
                >
                  {String(hour).padStart(2, '0')}
                </div>
              ))}
            </div>
            <div className="w-1/2 pl-2 max-h-48 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 text-center">{t(translations.minutes || 'scheduleModal.timePicker.minutes')}</div>
              {minutesOptions.map((minute) => (
                <div
                  key={minute}
                  className={cn(
                    "py-1 px-2 text-center cursor-pointer rounded-md text-sm transition-colors",
                    selectedMinutes === minute
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => {
                    handleMinutesChange(minute);
                    setIsOpen(false);
                  }}
                >
                  {String(minute).padStart(2, '0')}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { TimePicker }; 