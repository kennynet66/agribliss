import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Form, FormControl, FormItem, FormLabel, FormField } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export type fieldDetail = {
    fieldLabel: string,
    fieldName: string,
    inputType?: string
    fieldPlaceHolder: string
    required?: boolean | true
    fieldType?: "input" | "select" | "date"
    options?: { label: string; value: string }[]
    cutomRules?: object
}

interface FormBuilderProps {
    fields: fieldDetail[],
    submitUrl?: string
    buttonText?: string,
    onSubmit?: SubmitHandler<FieldValues>
}
const FormBuilder: React.FC<FormBuilderProps> = ({ fields, buttonText = "Submit", onSubmit }) => {
    const form = useForm();
    const handleSubmit = async(values: FieldValues) => {
        if (onSubmit) {
            onSubmit(values)
        } else {
            console.log("Form Submitted:", values)
        }
    }
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    {fields.map((formField, index) => {
                        if(!formField.fieldType)  return formField.fieldType = "input";
                        return (
                            <FormField key={formField.fieldName || index} name={formField.fieldName} render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{formField.fieldLabel}</FormLabel>
                                    <FormControl>
                                        {formField.fieldType === "select" ? (
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={formField.fieldPlaceHolder || "Select..."} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {formField.options?.map((opt) => (
                                                        <SelectItem key={opt.value} value={opt.value}>
                                                            {opt.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        ): formField.fieldType === "date" ? (
                                            <Calendar></Calendar>
                                        ): (
                                        <Input type={formField.inputType || "text"} placeholder={formField.fieldPlaceHolder} {...field} {...formField.cutomRules} />) }
                                    </FormControl>
                                </FormItem>
                            )} />
                        )
                    })}
                <Button type="submit" className="bg-gradient-primary hover:bg-primary/90">
                    {buttonText}
                </Button>
                </form>
            </Form>
        </>
    )
}

export default FormBuilder