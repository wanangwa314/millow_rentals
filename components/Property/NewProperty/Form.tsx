"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  coordinates: z.string(),
  short_overview: z
    .string()
    .max(100, { message: "Overview should be less that 200 character" }),
  description: z
    .string()
    .min(200, { message: "Description should be atleast 200 characters." }),
  type: z.string().max(20, { message: "Must be 20 characters long or less." }),
  number_of_bedrooms: z.number(),
  number_of_bathrooms: z.number(),
  amenities: z
    .string()
    .min(200, { message: "Description should be atleast 200 characters." }),
  availability_date: z.date(),
  rent_amount: z.number(),
  posted_by: z.string(),
  lease_term: z.number(),
});

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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DataSent } from "@/lib/types/Property";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/AuthContext";

type TNewPropertyForm = {
  className?: string;
  onFormDataSent: (data: DataSent) => void;
};

export default function ProperForm(props: TNewPropertyForm) {
  const { user } = useAuth();

  // 1. Define your form.

  const pointData = { latitude: -15.4164381, longitude: 28.1789347 };
  const formattedCoordinates = `(${pointData.latitude},${pointData.longitude})`;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amenities: "",
      short_overview: "",
      type: "",
      number_of_bathrooms: 3,
      number_of_bedrooms: 4,
      rent_amount: 1500,
      coordinates: formattedCoordinates,
      availability_date: new Date(),
      posted_by: "",
      lease_term: 4,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    //Edit values by adding posted by
    if (user?.id) {
      values.posted_by = user?.id;
    }
    try {
      console.log("Adding data...");
      const { data, error } = await supabase
        .from("properties")
        .insert(values)
        .select();

      if (error) {
        throw new Error(`Supabase error: ${error.message}`);
      }

      if (data) {
        console.log("Adding images to ID: " + data[0].id);
        props.onFormDataSent({ Sent: true, EntryID: data[0].id });
      } else {
        throw new Error("Insert did not return data");
      }
    } catch (error) {
      // Handle specific errors
      if (error instanceof Error) {
        console.error("An error occurred:", error.message);
        // You can display an error message to the user or log it to a service
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${props.className} space-y-8`}
      >
        <FormField
          control={form.control}
          name="short_overview"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief Overview</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_bedrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of bedrooms</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="number_of_bathrooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of bedrooms</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rent_amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rent amount</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
