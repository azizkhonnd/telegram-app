import { z } from 'zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Form, FormField, FormItem, FormDescription, FormControl, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { confirmTextSchema } from '@/lib/validation';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';
import { axiosClient } from '@/http/axios';
import { generateToken } from '@/lib/generate-token';

type Language = 'en' | 'ru' | 'uz';

const DangerZoneForm = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as Language;

  const schema = confirmTextSchema(currentLanguage);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { confirmText: '' },
  });

  const { mutate, status } = useMutation({
    mutationFn: async () => {
      const token = await generateToken(session?.currentUser?._id);
      const { data } = await axiosClient.delete('/api/user', { headers: { Authorization: `Bearer ${token}` } });
      return data;
    },
    onSuccess: () => {
      signOut();
    },
  });

  const isLoading = status === 'pending';

  const onSubmit = form.handleSubmit(() => {
    mutate();
  });

  return (
    <>
      <p className="text-xs text-muted-foreground text-center">
        {t("Are you sure you want to delete your account? This action cannot be undone.")}
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-2 w-full font-spaceGrotesk font-bold" variant={'destructive'}>
            {t("Delete permanently")}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Are you absolutely sure?")}</DialogTitle>
            <DialogDescription>
              {t(
                "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
              )}
            </DialogDescription>
          </DialogHeader>
          <Separator />
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-2">
              <FormField
                control={form.control}
                name="confirmText"
                render={({ field }) => (
                  <FormItem>
                    <FormDescription>
                      {t("Please type")} <span className="font-bold">{t("DELETE")}</span> {t("to confirm.")}.
                    </FormDescription>
                    <FormControl>
                      <Input className="bg-secondary" disabled={isLoading} {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
              <Button className="w-full font-bold" disabled={isLoading}>
                {t("Submit")}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DangerZoneForm;
