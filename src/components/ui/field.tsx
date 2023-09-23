import { Label } from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  useId,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from "react";

type FieldProps = ComponentPropsWithoutRef<"input"> & {
  error?: string;
  label: string;
};

const Field = forwardRef<ElementRef<typeof Slot>, FieldProps>(function Field(
  { error, label, ...rest },
  ref
) {
  const id = useId();
  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Slot {...rest} id={id} ref={ref} aria-invalid={!!error} />
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </>
  );
});

export default Field;
