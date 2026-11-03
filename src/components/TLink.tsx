"use client";

import Link from "next/link";
import { useApp } from "./AppProvider";

type Props = React.ComponentProps<typeof Link> & { href: string };

// Internal link that plays the scoop page transition before routing.
export default function TLink({ href, onClick, ...rest }: Props) {
  const { navigate } = useApp();
  return (
    <Link
      href={href}
      data-cursor="link"
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    />
  );
}
