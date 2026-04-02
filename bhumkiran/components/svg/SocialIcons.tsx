import React from "react";

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

function Svg({
  size = 18,
  className,
  children,
  title,
  viewBox = "0 0 24 24",
}: Props & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function FacebookIcon({ size, className, title = "Facebook" }: Props) {
  return (
    <Svg size={size} className={className} title={title} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M13.5 22v-8h2.7l.4-3H13.5V9.1c0-.9.2-1.5 1.5-1.5H16.7V4.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.5v3H10v8h3.5z"
      />
    </Svg>
  );
}

export function InstagramIcon({ size, className, title = "Instagram" }: Props) {
  return (
    <Svg size={size} className={className} title={title} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm8.4 2H7.8A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4Zm-4.2 3.4A4.6 4.6 0 1 1 7.4 12 4.6 4.6 0 0 1 12 7.4Zm0 2A2.6 2.6 0 1 0 14.6 12 2.6 2.6 0 0 0 12 9.4Zm5-2.5a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1Z"
      />
    </Svg>
  );
}

export function LinkedInIcon({ size, className, title = "LinkedIn" }: Props) {
  return (
    <Svg size={size} className={className} title={title} viewBox="0 0 24 24">
      <path
        fill="currentColor"
        d="M20.4 20.4h-3.2v-5.1c0-1.2 0-2.7-1.6-2.7-1.6 0-1.9 1.3-1.9 2.6v5.2H10.5V10h3.1v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v5.7ZM6.9 8.6a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8ZM5.3 20.4V10h3.2v10.4H5.3Z"
      />
    </Svg>
  );
}

