import { Fragment, ReactNode, isValidElement } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type PopupFormProps = {
  title?: string;
  trigger: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  description?: ReactNode;
  contentClassName?: string;
};

export default function PopupForm({
  title = "نموذج",
  trigger,
  children,
  isOpen,
  setIsOpen,
  description,
  contentClassName,
}: PopupFormProps) {
  const canUseTriggerAsChild =
    isValidElement(trigger) && trigger.type !== Fragment;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {canUseTriggerAsChild ? (
          trigger
        ) : (
          <span className="inline-flex cursor-pointer">{trigger}</span>
        )}
      </DialogTrigger>

      <DialogContent
        dir="rtl"
        className={cn(
          "max-h-[calc(100vh-2rem)] overflow-hidden rounded-xl border bg-background p-0 shadow-2xl [&>button]:left-4 [&>button]:right-auto sm:max-w-lg",
          contentClassName,
        )}
      >
        <DialogHeader className="border-b bg-muted/30 px-6 py-5 text-right sm:text-right">
          <DialogTitle className="text-xl leading-7">{title}</DialogTitle>
          {description && (
            <DialogDescription className="leading-6">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="max-h-[calc(100vh-11rem)] overflow-y-auto px-6 py-5">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
