import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React from "react";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Combobox } from "./ComboBox";


type InputFormProps = {
    fields: {
        type: "text" | "search-select"
        label: string
        placeholder: string
        description?: string
        options?: { value: string, label: string }[]
        zod: (z: any) => z.ZodType<any, any>
    }[]
    onSubmit: (data: any) => void
    defaultValues?: {
        [key: string]: string
    }
}

export function InputForm({ onSubmit, fields, defaultValues }: InputFormProps) {
    const FormSchema = z.object(
        Object.fromEntries(
            fields.map(fieldItem => [fieldItem.label, fieldItem.zod(z)])
        )
    );

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {
                    fields.map(fieldItem => (
                        <FormField
                            key={fieldItem.label}
                            control={form.control}
                            name={fieldItem.label}
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>{fieldItem.label}</FormLabel>
                                    <FormControl>
                                        {fieldItem.type === "search-select" ? (
                                            <Combobox placeholder={fieldItem.placeholder} options={fieldItem.options as any} name={fieldItem.label} field={field} />
                                        ):(
                                            <Input placeholder={fieldItem.placeholder} {...field} />
                                        )}
                                    </FormControl>
                                    {fieldItem.description && (
                                        <FormDescription>
                                            {fieldItem.description}
                                        </FormDescription>
                                    )}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    ))
                }
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
