import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import AnimatedQuote from "../components/AnimatedQuote";
import CalendarButton from "../components/CalendarButton";
import DistanceTimeline from "../components/DistanceTimeline";
import FlipNumber from "../components/FlipNumber";
import GlassCard from "../components/GlassCard";
import { MEETING_DATE } from "../constants";
import { useCountdown } from "../hooks/useCountdown";
import { buildMeetingIcs } from "../utils/calendar";

export default function CountdownScreen() {
  const { t } = useTranslation();
  const { days, hours, minutes, seconds, isComplete } =
    useCountdown(MEETING_DATE);

  const units = [
    { label: t("countdown.days"), value: days },
    { label: t("countdown.hours"), value: hours },
    { label: t("countdown.minutes"), value: minutes },
    { label: t("countdown.seconds"), value: seconds },
  ];

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-4 py-10 text-center">
      {isComplete ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm">
          <GlassCard className="px-8 py-10 text-center">
            <div className="mb-3 text-5xl">❤️</div>
            <p className="font-script text-3xl text-[#5b1140] sm:text-4xl">
              {t("countdown.today")}
            </p>
          </GlassCard>
        </motion.div>
      ) : (
        <>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-semibold tracking-[0.3em] text-white uppercase drop-shadow-sm sm:text-sm">
            {t("countdown.title")}
          </motion.p>

          <div className="grid w-full max-w-md grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {units.map((unit, index) => (
              <GlassCard
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col items-center gap-1 px-3 py-5 sm:px-6 sm:py-6">
                <FlipNumber
                  value={unit.value}
                  className="text-4xl font-bold text-[#5b1140] sm:text-5xl"
                />
                <span className="text-xs font-semibold tracking-[0.15em] text-[#8a2f5c] uppercase sm:text-sm">
                  {unit.label}
                </span>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      <CalendarButton
        icsContent={buildMeetingIcs(t("countdown.calendarSummary"))}
        label={t("countdown.addToCalendar")}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex w-full flex-col items-center gap-2">
        <DistanceTimeline />
        <div className="mt-5">
          <AnimatedQuote text="Look Like Barbie Smoke like Marley" />
        </div>
      </motion.div>
    </div>
  );
}
