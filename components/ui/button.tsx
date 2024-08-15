import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ComingSoon } from '@/components/ComingSoon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useViewport from '@/lib/hooks/useViewPort';

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/80 ',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-gray-800 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-12 rounded-lg px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  comingSoon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, iconLeft, iconRight, comingSoon, loading, children, ...props }, ref) => {
    const { isMobile } = useViewport();
    const Comp = asChild ? Slot : 'button';

    return (
      <span className={cn('relative inline-flex items-center w-full', size, className)}>
        <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} disabled={loading} {...props}>
          {iconLeft && <span className="left-3 absolute h-5 w-5">{iconLeft}</span>}
          {children}
          {iconRight && <span className="right-3 absolute h-5 w-5">{iconRight}</span>}
          {comingSoon && isMobile && <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-blue-500" />}
        </Comp>
        {comingSoon && !isMobile && (
          <div className="absolute left-2">
            <ComingSoon />
          </div>
        )}
        {comingSoon && isMobile && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="absolute top-0 right-0 h-full w-full opacity-0 cursor-default" tabIndex={-1} />
            </PopoverTrigger>
            <PopoverContent side="top" sideOffset={5} align="end" className="w-full bg-transparent shadow-none border-none p-0">
              <ComingSoon />
            </PopoverContent>
          </Popover>
        )}
      </span>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
