import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form/form';
import { Checkbox } from '@/components/ui/Checkbox/checkbox';
import { useApplyInformationForm } from '@/screens/ApplyScreen/ApplyForm/ApplyInfomationForm/useApplyInformationForm';
import { MemberCareer } from '@/components/ui/Select/MemberCareer';

type Props = {
  qualifications:
    | {
        id: number;
        name: string;
        required: boolean;
      }[]
    | [];
};

export const ApplyInfomationForm = ({ qualifications }: Props) => {
  const { control, handleQualificationChange } = useApplyInformationForm();

  return (
    <>
      <div>
        <MemberCareer />
      </div>

      <div className='flex flex-row gap-x-4'>
        <FormField
          control={control}
          name='qualifications'
          render={() => (
            <FormItem>
              <FormLabel>保有資格・免許</FormLabel>
              {qualifications.map((qualification, index) => (
                <FormField
                  key={index}
                  control={control}
                  name='qualifications'
                  render={({ field: { value, onChange, ...restField } }) => (
                    <FormItem key={index}>
                      <FormControl>
                        <Checkbox
                          {...restField}
                          checked={value?.includes(qualification.id)}
                          onCheckedChange={(checked: boolean) =>
                            handleQualificationChange(checked, value, qualification.id)
                          }
                        />
                      </FormControl>
                      <FormLabel className='text-sm font-normal'>{qualification.name}</FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
