import { useFormContext } from 'react-hook-form';
import { ApplyInformationSchemaType } from '../../schemas';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@/components/ui/Form/form';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/Select/select';
import { Checkbox } from '@/components/ui/Checkbox/checkbox';
import { MemberCareer } from '@/components/shared/MemberCareer';

// type Props = {
//   qualifications:
//     | {
//         id: number;
//         name: string;
//         required: boolean;
//       }[]
//     | [];
// };

// export const ApplyInfomationForm = ({ qualifications }: Props) => {
export const ApplyInfomationForm = () => {
  const { control } = useFormContext<ApplyInformationSchemaType>();

  return (
    <>
      <div>
        <FormField
          control={control}
          name='memberCareer'
          render={({ field: { ref, onChange, ...restField } }) => (
            <FormItem>
              <FormLabel>経験年数</FormLabel>
              <Select {...restField} onValueChange={onChange}>
                <FormControl>
                  <SelectTrigger ref={ref} className='w-[180px]'>
                    <SelectValue placeholder='未設定' />
                  </SelectTrigger>
                </FormControl>
                <MemberCareer />
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/*
      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='qualifications'
          render={({ field: { value, ...restField } }) => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>保有資格・免許</FormLabel>
              </div>
              {qualifications.map((qualification, index) => (
                <FormItem key={qualification.id}>
                  <FormControl>
                    <Checkbox
                      checked={value?.includes(qualification.id)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? restField.onChange([...value, qualification.id])
                          : restField.onChange(
                              value?.filter((value) => value !== qualification.id),
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className='text-sm font-normal'>{qualification.name}</FormLabel>
                </FormItem>
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}
    </>
  );
};
