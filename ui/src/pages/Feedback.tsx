'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea'; // Assuming you have a Textarea component.

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full Name must be at least 2 characters.',
  }),
  walletAddress: z.string().min(2, {
    message: 'Wallet Address is required.',
  }),
  email: z.string().email().optional(),
  telegram: z.string().min(2, {
    message: 'Telegram is required.',
  }),
  description: z.string().min(2, {
    message: 'Description is required.',
  }),
});

export const FeedbackForm: React.FC = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      walletAddress: '',
      email: '',
      telegram: '',
      description: '',
    },
  });

  // Define the onSubmit function
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('Form Data:', data);
  };

  return (
    <section className="px-28 py-20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border border-app-violet rounded-lg text-left w-1/2 mx-auto p-10"
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl text-app-purple">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-left bg-app-slate/20 text-app-purple placeholder:text-app-purple/40 p-2"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="walletAddress"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl text-app-purple">
                  Wallet Address
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-left bg-app-slate/20 text-app-purple placeholder:text-app-purple/40 p-2"
                    placeholder="0x1234567890ABCDEF"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl text-app-purple">
                  Email ID (Optional)
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-left bg-app-slate/20 text-app-purple placeholder:text-app-purple/40 p-2"
                    placeholder="example@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="telegram"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xl text-app-purple">
                  Telegram
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full text-left bg-app-slate/20 text-app-purple placeholder:text-app-purple/40 p-2"
                    placeholder="@username"
                    {...field}
                  />
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
                <FormLabel className="text-xl text-app-purple">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us more..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="relative inline-flex items-center justify-center w-full h-12 px-4 py-3 align-middle font-medium group mt-6 rounded-lg">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform rounded-lg translate-x-1 translate-y-1 bg-app-slate group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-app-slate rounded-lg group-hover:bg-app-slate"></span>
            <span className="relative text-black group-hover:text-white text-center rounded-lg font-semibold text-lg">
              Submit
            </span>
          </Button>
        </form>
      </Form>
    </section>
  );
};
