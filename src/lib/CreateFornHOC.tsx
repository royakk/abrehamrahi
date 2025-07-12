import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
  useFieldArray,
  type UseFormProps,
  type SubmitHandler,
  type FieldValues,
  type UseFieldArrayProps,
  type UseFieldArrayReturn,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { type ReactNode } from "react";

export function createFormHOC<T extends FieldValues>(schema: any) {
  const useFormMethods = (options?: UseFormProps<T>) =>
    useForm<T>({
      resolver: yupResolver(schema) as any,
      ...options,
    });

  const useFormContextTyped = () => useFormContext<T>();

  const ControllerField = ({
    name,
    render,
  }: {
    name: keyof T | `${string}.${string}`;
    render: Parameters<typeof Controller<T>>[0]["render"];
  }) => {
    const { control } = useFormContextTyped();
    return <Controller control={control} name={name as any} render={render} />;
  };

  const useFormArray = (
    props: UseFieldArrayProps<T>
  ): UseFieldArrayReturn<T> => {
    const methods = useFormContextTyped();
    return useFieldArray({ control: methods.control, ...props });
  };

  // ✅ The Functional Provider wrapper
  const Provider = (
    Component: () => ReactNode,
    options?: UseFormProps<T>
  ): React.FC<{ onSubmit?: SubmitHandler<T> }> => {
    return function WrappedComponent({ onSubmit }) {
      const methods = useFormMethods(options);
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit!)}>
            <Component />
          </form>
        </FormProvider>
      );
    };
  };

  return {
    Provider, // ⬅️ the functional wrapper
    Controller: ControllerField,
    useFormContext: useFormContextTyped,
    useFormArray,
  };
}
