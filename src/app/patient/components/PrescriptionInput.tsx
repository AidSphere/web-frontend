'use client';
import { useFieldArray, type Control } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CalendarIcon, Plus, Trash2 } from 'lucide-react';
import type { DonationRequestFormValues } from '@/app/patient/_types/donation-request-types';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

interface PrescriptionInputProps {
  control: Control<DonationRequestFormValues>;
}

export default function PrescriptionInput({ control }: PrescriptionInputProps) {
  // Use field array for dynamic medicine items
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <div className='space-y-6'>
      {/* Patient Information Section */}
      <div>
        <h2 className='mb-4 text-xl font-semibold'>Basic Information</h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <FormField
            control={control}
            name='requestName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter request name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='expectedDate'
            render={({ field }) => (
              <FormItem className='mt-2 flex w-full flex-col'>
                <FormLabel>Expected Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Tell us a little bit about yourself'
                    // className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Prescription Items Section */}
      <div>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Prescription Items</h2>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={() => append({ medicine: '', amount: '' })}
          >
            <Plus className='mr-2 h-4 w-4' />
            Add Medicine
          </Button>
        </div>

        {fields.length === 0 ? (
          <div className='rounded-md border border-dashed py-4 text-center'>
            <p className='text-gray-500'>No medicines added yet</p>
            <Button
              type='button'
              variant='link'
              onClick={() => append({ medicine: '', amount: '' })}
            >
              Add your first medicine
            </Button>
          </div>
        ) : (
          <div className='space-y-4'>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='flex items-start gap-3 rounded-md border bg-gray-50 p-3'
              >
                <div className='grid flex-1 grid-cols-1 gap-3 md:grid-cols-2'>
                  <FormField
                    control={control}
                    name={`items.${index}.medicine`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>Medicine Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter medicine name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`items.${index}.amount`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-xs'>Dosage/Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='E.g., 10mg twice daily'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='mt-6'
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                >
                  <Trash2 className='h-4 w-4 text-red-500' />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
