/**
 * Type shim for lucide-react.
 * The installed package (0.546.0) is missing its bundled .d.ts files, so we
 * declare the icons we use here. Safe to delete if the package is reinstalled
 * with proper types.
 */
declare module 'lucide-react' {
  import type { ComponentType, SVGProps } from 'react';

  export type LucideProps = SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
  };

  type Icon = ComponentType<LucideProps>;

  export const MapPin: Icon;
  export const GraduationCap: Icon;
  export const Sparkles: Icon;
  export const Briefcase: Icon;
  export const ExternalLink: Icon;
  export const Gamepad2: Icon;
  export const Globe: Icon;
  export const ArrowUpRight: Icon;
  export const Send: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const MessageCircle: Icon;
}
