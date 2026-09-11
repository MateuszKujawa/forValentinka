// Month is 0-indexed in JS Date, so 9 = October. Keeps the meeting date/time
// fixed and absolute so the countdown is always correct regardless of when
// (or on which device) it's opened.
export const MEETING_DATE = new Date(2026, 9, 3, 0, 0, 0)

// Anchor for the "closing the distance" timeline — exactly one month before
// the meeting, so the two emoji travel the full track over 30 days. No
// specific relationship date was given, so this is a placeholder; change it
// to a date that means something (e.g. when the distance started) if needed.
export const TIMELINE_START_DATE = new Date(2026, 8, 3, 0, 0, 0)
