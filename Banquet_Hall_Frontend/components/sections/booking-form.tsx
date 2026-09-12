"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
import toast from "react-hot-toast";
import {
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  MessageSquare,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import bookServices from "@/services/BookService";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// const bookingSchema = z.object({
//   firstName: z.string().min(2, "First name is required"),
//   lastName: z.string().min(2, "Last name is required"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Valid phone number required"),
//   // eventType: z.string().min(1, "Please select an event type"),
//   // eventDate: z.string().min(1, "Please select a date"),
//   // guestCount: z.string().min(1, "Please select guest count"),
//   message: z.string().optional(),
// })

// type BookingFormData = z.infer<typeof bookingSchema>

// const eventTypes = [
//   "Wedding Reception",
//   "Wedding Ceremony",
//   "Birthday Party",
//   "Corporate Event",
//   "Anniversary",
//   "Engagement Party",
//   "Baby Shower",
//   "Other",
// ]

// const guestRanges = [
//   "50-100 guests",
//   "100-200 guests",
//   "200-300 guests",
//   "300-400 guests",
//   "400-500 guests",
//   "500+ guests",
// ]

export function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    message: "",
  });

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   formState: { errors },
  //   reset,
  // } = useForm<BookingFormData>({
  //   resolver: zodResolver(bookingSchema),
  // })

  // const onSubmit = async (data: BookingFormData) => {
  //   setIsSubmitting(true)
  //   // Simulate API call
  //   await new Promise((resolve) => setTimeout(resolve, 2000))
  //   console.log("Booking data:", data)
  //   setIsSubmitting(false)
  //   setIsSuccess(true)
  //   reset()
  //   // Reset success state after 5 seconds
  //   setTimeout(() => setIsSuccess(false), 5000)
  // }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      formData.get("firstname") != "" &&
      formData.get("lastname") != "" &&
      formData.get("email") != "" &&
      formData.get("phone") != "" &&
      formData.get("message") != ""
    ) {
      try {
        const uploadBookings = await bookServices({
          firstname: formData.get("firstname") as string,
          lastname: formData.get("lastname") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          message: formData.get("message") as string,
        });
        console.log("Submitted: ", uploadBookings);
        toast.success("Your query submitted, Thank you!");
      } catch (error) {
        console.log("Error: ", error);
      }
      setForm({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        message: "",
      });
      return;
    }
    toast.error("Please fill all credentials!!")
    setForm({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <section
      id="booking"
      className="py-24 lg:py-32 bg-linear-to-b from-background to-cream"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-2 text-sm font-medium tracking-widest uppercase text-primary border border-primary/30 rounded-full mb-6"
          >
            Book Your Event
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6"
          >
            Start Planning Your{" "}
            <span className="text-gold-gradient">Dream Event</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Fill out the form below and our team will get back to you within 24
            hours
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="glass-card rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
            {/* Success State */}
            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-card z-10 flex flex-col items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                    Booking Request Sent!
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Thank you for your inquiry. Our team will contact you within
                    24 hours to discuss your event.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-primary" />
                    First Name
                  </Label>
                  <Input
                    id="firstname"
                    name="firstname"
                    value={form.firstname}
                    onChange={(e) =>
                      setForm({ ...form, firstname: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    Last Name
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    value={form.lastname}
                    onChange={(e) =>
                      setForm({ ...form, lastname: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Event Details */}
              {/* <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Event Type
                  </Label>
                  <Select onValueChange={(value) => setValue("eventType", value)}>
                    <SelectTrigger className={errors.eventType ? "border-destructive" : ""}>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-sm text-destructive">{errors.eventType.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    Preferred Date
                  </Label>
                  <Input
                    id="eventDate"
                    type="date"
                    {...register("eventDate")}
                    className={`border-input focus:border-primary transition-colors ${
                      errors.eventDate ? "border-destructive" : ""
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="text-sm text-destructive">{errors.eventDate.message}</p>
                  )}
                </div>
              </div> */}

              {/* Guest Count */}
              {/* <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Expected Guests
                </Label>
                <Select onValueChange={(value) => setValue("guestCount", value)}>
                  <SelectTrigger className={errors.guestCount ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select guest count range" />
                  </SelectTrigger>
                  <SelectContent>
                    {guestRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.guestCount && (
                  <p className="text-sm text-destructive">{errors.guestCount.message}</p>
                )}
              </div> */}

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  Additional Details (Optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Tell us more about your event, special requests, or any questions you have..."
                  className="min-h-30 border-input focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Booking Request"
                )}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By submitting this form, you agree to our privacy policy and
                terms of service.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
