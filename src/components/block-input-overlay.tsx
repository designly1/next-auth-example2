interface I_BlockInputOverlayProps {
  enabled: boolean;
}

export function BlockInputOverlay({ enabled }: I_BlockInputOverlayProps) {
  if (!enabled) return null;

  return <div className="z-50 absolute inset-0 bg-black/10" />;
}
