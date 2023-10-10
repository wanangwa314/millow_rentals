"use client";

import * as z from "zod";

const propertySchema = z.object({
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  description: z.string(),
  type: z.string(),
  pictures: z.array(z.string()),
  posted_by: z.number(),
  number_of_views: z.number(),
  applied_for_viewing: z.number(),
  square_footage: z.number(),
  number_of_bedrooms: z.number(),
  number_of_bathrooms: z.number(),
  amenities: z.string(),
  availability_date: z.date(),
  rent_amount: z.number(),
  lease_term: z.number(),
});

export default propertySchema;
