import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import propertySchema from "@/lib/Form Schemas/propertySchema"; // Import the Zod schema
import ImageInput from "./ImageInput"; // Import the ImageInput component

export default function propertyForm() {
  const { register, handleSubmit } = useForm();
  const [createProperty] = useMutation(
    "INSERT INTO properties (...) VALUES (...)"
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { coordinates, description, type, pictures, ...otherFields } = data;

    const propertyData = {
      coordinates,
      description,
      type,
      pictures,
      ...otherFields,
    };

    // Validate using Zod schema
    try {
      const validatedData = propertySchema.parse(propertyData);
      // Insert data into the properties table
      await createProperty({ variables: { ...validatedData } });
      alert("Property added successfully!");
    } catch (error) {
      console.error("Validation failed:", error.errors);
    }
  };

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      username: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
