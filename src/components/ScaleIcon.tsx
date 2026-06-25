type ScaleIconProps = {
  className?: string;
};

export default function ScaleIcon({ className = "h-12 w-12" }: ScaleIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 8v48M20 12h24M16 20h32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M16 20L8 36h16L16 20ZM48 20l8 16H40l8-16Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="56" r="3" fill="currentColor" />
    </svg>
  );
}
