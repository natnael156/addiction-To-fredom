import { cn } from '@/utils/helpers';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium',
        {
          'bg-primary-100 text-primary-700': variant === 'primary',
          'bg-secondary-100 text-secondary-700': variant === 'secondary',
          'bg-amber-100 text-amber-700': variant === 'accent',
          'bg-gray-100 text-gray-700': variant === 'neutral',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
