import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { useTranslation } from "react-i18next"

import { buttonVariants } from "./button"
import { cn } from "../radix/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const { t } = useTranslation();

  // Custom labels for weekdays
  const weekdayLabels = {
    0: t('blockBuilder.calendar.weekday.sunday', 'Dom'),
    1: t('blockBuilder.calendar.weekday.monday', 'Seg'),
    2: t('blockBuilder.calendar.weekday.tuesday', 'Ter'),
    3: t('blockBuilder.calendar.weekday.wednesday', 'Qua'),
    4: t('blockBuilder.calendar.weekday.thursday', 'Qui'),
    5: t('blockBuilder.calendar.weekday.friday', 'Sex'),
    6: t('blockBuilder.calendar.weekday.saturday', 'Sáb'),
  };

  // Custom labels for months
  const monthLabels = {
    0: t('blockBuilder.calendar.month.january', 'Janeiro'),
    1: t('blockBuilder.calendar.month.february', 'Fevereiro'),
    2: t('blockBuilder.calendar.month.march', 'Março'),
    3: t('blockBuilder.calendar.month.april', 'Abril'),
    4: t('blockBuilder.calendar.month.may', 'Maio'),
    5: t('blockBuilder.calendar.month.june', 'Junho'),
    6: t('blockBuilder.calendar.month.july', 'Julho'),
    7: t('blockBuilder.calendar.month.august', 'Agosto'),
    8: t('blockBuilder.calendar.month.september', 'Setembro'),
    9: t('blockBuilder.calendar.month.october', 'Outubro'),
    10: t('blockBuilder.calendar.month.november', 'Novembro'),
    11: t('blockBuilder.calendar.month.december', 'Dezembro'),
  };

  // Create formatters for the calendar
  const formatters = {
    formatWeekdayName: (date: Date) => {
      return weekdayLabels[date.getDay() as keyof typeof weekdayLabels];
    },
    formatMonthCaption: (date: Date) => {
      return `${monthLabels[date.getMonth() as keyof typeof monthLabels]} ${date.getFullYear()}`;
    },
  };

  return (
    <div className="w-full">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3 w-full", className)}
        classNames={{
          months: "flex flex-col w-full",
          month: "w-full space-y-4",
          caption: "flex justify-center pt-1 relative items-center mb-4",
          caption_label: "text-base font-medium",
          nav: "flex items-center space-x-1",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse",
          head_row: "flex w-full mb-2",
          head_cell:
            "text-muted-foreground rounded-md w-full font-normal text-[0.8rem] py-2 text-center",
          row: "flex w-full mt-1",
          cell: "text-center text-sm p-0 relative h-9 w-full flex items-center justify-center",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full",
          day_today: "bg-accent text-accent-foreground rounded-full",
          day_outside:
            "day-outside text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className }) => (
            <ChevronLeft className={cn("h-4 w-4", className)} />
          ),
          IconRight: ({ className }) => (
            <ChevronRight className={cn("h-4 w-4", className)} />
          ),
        }}
        formatters={formatters}
        {...props}
      />
      <div className="mt-3 text-center text-sm text-muted-foreground">
        {t('blockBuilder.calendar.today', 'Hoje')}
      </div>
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
