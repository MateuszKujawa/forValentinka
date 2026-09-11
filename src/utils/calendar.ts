import { MEETING_DATE } from '../constants'

function pad(value: number): string {
  return value.toString().padStart(2, '0')
}

function formatIcsDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

function escapeIcsText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
}

// The event is all-day (VALUE=DATE) rather than a timed appointment, since
// MEETING_DATE is a day, not a specific hour.
export function buildMeetingIcs(summary: string): string {
  const start = formatIcsDate(MEETING_DATE)
  const end = formatIcsDate(addDays(MEETING_DATE, 1))
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ForValentinka//PL',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:walentynka-spotkanie-20261003@forvalentinka.app',
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:${escapeIcsText(summary)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}
