import React, { } from "react";
import { InputForm } from "@/src/lib/ui/Form";

export function TrainerForm() {
    return (
        <InputForm
            onSubmit={(data) => {
                // go to /onboarding-trainer with post form data
                let form = document.createElement("form");
                form.method = "POST";
                form.action = "/onboarding-trainer";
                for (const key in data) {
                    let input = document.createElement("input");
                    input.type = "hidden";
                    input.name = key;
                    input.value = data[key];
                    form.appendChild(input);
                }
                document.body.appendChild(form);
                form.submit();
            }}
            fields={[
                {
                    type: "text",
                    label: "Business Name",
                    placeholder: "Enter your business name",
                    description:
                        "This will be the name of your business when displayed to customers.",
                    zod: (z: any) => z.string().min(2, {
                        message: "Username must be at least 2 characters.",
                    })
                },
                {
                    type: "text",
                    label: "First Name",
                    placeholder: "Enter your first name",
                    zod: (z: any) => z.string()
                },
                {
                    type: "text",
                    label: "Last Name",
                    placeholder: "Enter your last name",
                    zod: (z: any) => z.string()
                },
                {
                    type: "text",
                    label: "Phone Number",
                    placeholder: "Enter your phone number",
                    zod: (z: any) => z.string().min(10).max(10).regex(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/, {
                        message: "Please enter a valid phone number."
                    })
                },
                {
                    type: "search-select",
                    label: "Country",
                    placeholder: "What country do you live in?",
                    zod: (z: any) => z.string(),
                    options: [
                        { "value": "us", "label": "United States" },
                        { "value": "ca", "label": "Canada" },
                        { "value": "mx", "label": "Mexico" },
                        { "value": "gb", "label": "United Kingdom" },
                        { "value": "de", "label": "Germany" },
                        { "value": "fr", "label": "France" },
                        { "value": "it", "label": "Italy" },
                        { "value": "es", "label": "Spain" },
                        { "value": "au", "label": "Australia" },
                        { "value": "jp", "label": "Japan" },
                        { "value": "cn", "label": "China" },
                        { "value": "in", "label": "India" },
                        { "value": "br", "label": "Brazil" },
                        { "value": "za", "label": "South Africa" },
                        { "value": "ru", "label": "Russia" }
                    ]
                }
            ]}
        />
    )
}