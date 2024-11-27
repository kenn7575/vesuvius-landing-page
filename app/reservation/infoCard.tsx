import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { assembleDate } from "./helpers";

const FormSchema = z.object({
  name: z.string().nonempty("Indtast venligst dit navn"),
  email: z.string().email("Indtast venligst en gyldig email"),
  phone: z.string().min(8, "Indtast venligst et gyldigt telefonnummer"),
  comment: z.string().optional(),
});

export function InfoCard({
  selectedDay,
  selectedTime,
  peopleCount,
}: {
  selectedDay: string | undefined;
  selectedTime: string | undefined;
  peopleCount: number;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      comment: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!selectedDay || !selectedTime) {
      alert("Vælg venligst en dag og et tidspunkt for reservationen");
      return;
    }

    const dateForReservation = assembleDate(selectedDay, selectedTime);

    const backendUrl = process.env.BACKEND_URL || "http://localhost:5005";
    fetch(`${backendUrl}/reservations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: dateForReservation,
        number_of_people: peopleCount,
        customer_name: data.name,
        email: data.email,
        customer_phone_number: data.phone,
      }),
    })
      .then((response) => {
        if (response.ok) {
          const params = new URLSearchParams();
          params.append("count", peopleCount.toString());
          params.append("date", dateForReservation.toString());
          router.push(`/reservation/confirmation?${params.toString()}`);
        } else {
          alert("Der skete en fejl under oprettelsen af reservationen 1");
        }
      })
      .catch((error) => {
        console.error("Error creating reservation:", error);
        alert("Der skete en fejl under oprettelsen af reservationen " + error);
      });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skriv dine oplysninger</CardTitle>
        <CardDescription>
          Udfyld formeularen med dine oplysninger for at reservere et bord.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Navn</FormLabel>
                  <FormControl>
                    <Input placeholder="Mig" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Mig@eksemple.dk"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon nummer</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="12 34 56 78" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kommentar</FormLabel>
                  <FormControl>
                    <Input placeholder="Eks. allergier" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Book bord</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
