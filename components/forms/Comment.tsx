"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useOrganization } from '@clerk/nextjs';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CommentValidation } from '@/lib/validations/thread';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { addCommentToThread } from '@/lib/actions/thread.actions';

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

export default function Comment({
  threadId,
  currentUserImg,
  currentUserId,
}: Props) {

    const router = useRouter();
    const pathname = usePathname();
  
    const { organization } = useOrganization();
  
    const form = useForm<z.infer<typeof CommentValidation>>({
      resolver: zodResolver(CommentValidation),
      defaultValues: {
        thread: '',
      },
    });

    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
          threadId,
          values.thread,
          JSON.parse(currentUserId),
          pathname
        );
    
        form.reset();
      };

  return (
    <Form {...form}>
    <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        control={form.control}
        name='thread'
        render={({ field }) => (
          <FormItem className='flex w-full items-center gap-3'>
            <FormLabel>
              <Image
                src={currentUserImg}
                alt='current_user'
                width={48}
                height={48}
                className='rounded-full object-cover'
              />
            </FormLabel>
            <FormControl className='border-none bg-transparent'>
              <Input
                type='text'
                {...field}
                placeholder='Comment...'
                className='no-focus text-light-1 outline-none'
              />
            </FormControl>
          </FormItem>
        )}
      />
      <Button type='submit' className='comment-form_btn'>
        Reply
      </Button>
    </form>
  </Form>
  );
}