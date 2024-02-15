import { useFormContext } from 'react-hook-form';
import { ApplyInformationFormSchemaType } from '../../schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/Form/form';
import { Input } from '@/components/ui/Input/input';

export const ApplyInfomationForm = () => {
  const { control } = useFormContext<ApplyInformationFormSchemaType>();

  return (
    <>
      <div>
        <FormField
          control={control}
          name='MemberCareer'
          render={({ field }) => (
            <FormItem>
              <FormLabel>経験年数</FormLabel>
              <FormControl>
                <Input className='w-[180px]' placeholder='1年' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div>
        <FormField
          control={control}
          name='qualification'
          render={({ field }) => (
            <FormItem>
              <FormLabel>資格</FormLabel>
              <FormControl>
                <Input className='w-[180px]' placeholder='ほげ資格' {...field} />
              </FormControl>
              <FormDescription>ここは説明箇所です.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
