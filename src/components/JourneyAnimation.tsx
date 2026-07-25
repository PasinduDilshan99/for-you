"use client";
import { useEffect, useRef, useState } from "react";
import { motion, Transition } from "framer-motion";

// real-world height ratio, so the girl figure isn't drawn the same size as the boy
const BOY_HEIGHT_FT = 5.9;
const GIRL_HEIGHT_FT = 4.8;
const HEIGHT_RATIO = GIRL_HEIGHT_FT / BOY_HEIGHT_FT; // ≈ 0.81

const BOY_SCALE = 2;
const GIRL_SCALE = BOY_SCALE * HEIGHT_RATIO;

interface FigureProps {
  variant: "boy" | "girl";
  pose?: "stand" | "kneel";
  isWalking?: boolean;
  facing?: 1 | -1;
  scale?: number;
}

function Flower({
  x = 0,
  y = 0,
  size = 1,
}: {
  x?: number;
  y?: number;
  size?: number;
}) {
  const petal = "#ffb3c6";
  const center = "#ffd76b";
  const stem = "#4a7a4a";

  return (
    <g transform={`translate(${x}, ${y}) scale(${size})`}>
      {/* stem */}
      <path
        d="M 0 0 Q -2 8 0 16"
        stroke={stem}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* leaf */}
      <path d="M 0 8 Q 6 6 8 10 Q 3 12 0 8 Z" fill={stem} />
      {/* petals */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-5"
          rx="3.2"
          ry="5"
          fill={petal}
          transform={`rotate(${deg})`}
        />
      ))}
      {/* center */}
      <circle r="2.6" fill={center} />
    </g>
  );
}

function Leg({
  side,
  isWalking,
  color,
}: {
  side: "front" | "back";
  isWalking: boolean;
  color: string;
}) {
  const skin = "#f2c9a0";
  const sign = side === "front" ? 1 : -1;

  const cycleTransition: Transition = isWalking
    ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" };

  const thigh = isWalking ? [0, 30 * sign, 0, -30 * sign, 0] : [0, 3 * sign, 0];
  const kneeAdjusted =
    side === "front"
      ? isWalking
        ? [0, -34, -8, 0, 0]
        : [0, 0, 0]
      : isWalking
        ? [0, 0, -8, -34, 0]
        : [0, 0, 0];

  return (
    <motion.g
      animate={{ rotate: thigh }}
      transition={cycleTransition}
      style={{ originX: "0px", originY: "18px" }}
    >
      <rect x="-4" y="18" width="8" height="17" rx="4" fill={color} />
      <motion.g
        animate={{ rotate: kneeAdjusted }}
        transition={cycleTransition}
        style={{ originX: "0px", originY: "35px" }}
      >
        <rect x="-3.5" y="35" width="7" height="16" rx="3.5" fill={color} />
        <rect x="-4" y="50" width="14" height="5" rx="2.5" fill={skin} />
      </motion.g>
    </motion.g>
  );
}

export function Figure({
  variant,
  pose = "stand",
  isWalking = false,
  facing = 1,
  scale,
}: FigureProps) {
  const resolvedScale = scale ?? (variant === "boy" ? BOY_SCALE : GIRL_SCALE);

  const skin = "#f2c9a0";
  const boyShirt = "#5b8dd6";
  const boyPants = "#33415c";
  const boyHair = "#3a2e28";
  const girlDress = "#e88fa3";
  const girlHair = "#4a2e22";

  const armTransition: Transition = isWalking
    ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" };
  const bobTransition: Transition = isWalking
    ? { duration: 0.25, repeat: Infinity, ease: "easeInOut" }
    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" };

  const armA = isWalking ? [0, -24, 0, 24, 0] : [0, -2, 0];
  const armB = isWalking ? [0, 24, 0, -24, 0] : [0, 2, 0];
  const bob = isWalking ? [0, -4, 0, -4, 0] : [0, -1.5, 0];

  const legColor = variant === "boy" ? boyPants : girlDress;

  if (pose === "kneel") {
    return (
      <g transform={`scale(${resolvedScale})`}>
        <rect x="-9" y="16" width="8" height="12" rx="3" fill={boyPants} />
        <path
          d="M 0 16 L 9 16 L 13 26 L 20 26"
          stroke={boyPants}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="-9" y="-8" width="18" height="24" rx="6" fill={boyShirt} />
        <rect x="-15" y="0" width="7" height="16" rx="3.5" fill={skin} />
        <motion.g
          initial={{ rotate: 0 }}
          animate={{ rotate: -30 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          style={{ originX: "8px", originY: "-4px" }}
        >
          <rect x="6" y="-6" width="16" height="7" rx="3.5" fill={skin} />
        </motion.g>
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, duration: 0.6, ease: "backOut" }}
          style={{ originX: "24px", originY: "-8px" }}
        >
          <Flower x={24} y={-8} size={1.1} />
        </motion.g>
        <circle cy="-20" r="10" fill={skin} />
        <path
          d="M -10 -24 Q 0 -36 10 -24 Q 10 -28 0 -30 Q -10 -28 -10 -24 Z"
          fill={boyHair}
        />
      </g>
    );
  }

  return (
    <motion.g
      animate={{ y: bob, scaleX: facing }}
      transition={{
        ...bobTransition,
        scaleX: { duration: 0.4, ease: "easeInOut" },
      }}
      style={{ scale: resolvedScale }}
    >
      {/* back arm */}
      <motion.g
        animate={{ rotate: armB }}
        transition={armTransition}
        style={{ originX: "-8px", originY: "-2px" }}
      >
        <rect x="-14" y="-2" width="7" height="20" rx="3.5" fill={skin} />
      </motion.g>

      {/* back leg */}
      <g transform="translate(-3, 0)">
        <Leg side="back" isWalking={isWalking} color={legColor} />
      </g>
      {/* front leg */}
      <g transform="translate(3, 0)">
        <Leg side="front" isWalking={isWalking} color={legColor} />
      </g>

      {/* torso / clothes */}
      {variant === "boy" ? (
        <rect x="-10" y="-4" width="20" height="26" rx="6" fill={boyShirt} />
      ) : (
        <path d="M -11 -4 L 11 -4 L 16 22 L -16 22 Z" fill={girlDress} />
      )}

      {/* front arm, holding a flower if this is the boy */}
      <motion.g
        animate={{ rotate: armA }}
        transition={armTransition}
        style={{ originX: "8px", originY: "-2px" }}
      >
        <rect x="7" y="-2" width="7" height="20" rx="3.5" fill={skin} />
        {variant === "boy" && <Flower x={10.5} y={18} size={0.9} />}
      </motion.g>

      {/* head */}
      <circle cy="-18" r="10" fill={skin} />

      {variant === "boy" ? (
        <path
          d="M -10 -22 Q 0 -33 10 -22 Q 10 -26 0 -28 Q -10 -26 -10 -22 Z"
          fill={boyHair}
        />
      ) : (
        <>
          <path
            d="M -11 -22 Q 0 -34 11 -22 Q 11 -27 0 -29 Q -11 -27 -11 -22 Z"
            fill={girlHair}
          />
          <path
            d="M -11 -20 Q -14 -6 -10 6"
            stroke={girlHair}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 11 -20 Q 14 -6 10 6"
            stroke={girlHair}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </>
      )}
    </motion.g>
  );
}

export function journeyBoyX(day: number, totalDays: number) {
  const progress = Math.min((day - 1) / (totalDays - 1), 1);
  return 80 + progress * 400;
}

export function JourneyAnimation({
  day,
  totalDays = 9,
}: {
  day: number;
  totalDays?: number;
}) {
  const boyX = journeyBoyX(day, totalDays);
  const girlX = 610;

  const prevDayRef = useRef(day);
  const [facing, setFacing] = useState<1 | -1>(1);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (day !== prevDayRef.current) {
      setFacing(day > prevDayRef.current ? 1 : -1);
      setIsMoving(true);
      prevDayRef.current = day;
    }
  }, [day]);

  return (
    <svg viewBox="0 0 680 260" className="w-full max-w-3xl mx-auto">
      <line
        x1="20"
        y1="205"
        x2="660"
        y2="205"
        stroke="rgba(255,255,255,0.15)"
      />

      <g transform={`translate(${girlX}, 205)`}>
        <Figure variant="girl" />
      </g>

      <motion.g
        animate={{ x: boyX, y: 205 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={() => setIsMoving(false)}
      >
        <Figure
          variant="boy"
          pose="stand"
          isWalking={isMoving}
          facing={facing}
        />
      </motion.g>
    </svg>
  );
}
