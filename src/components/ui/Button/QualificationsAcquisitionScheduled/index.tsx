import { Button } from '@/components/ui/Button/button';
import { FC } from 'react';

type Props = {
  isHidden: boolean;
  onClick: () => void;
};
export const QualificationsAcquisitionScheduledButton: FC<Props> = ({
  isHidden,
  onClick,
}: Props) => {
  if (isHidden) {
    return <></>;
  }
  return <Button onClick={onClick}>取得予定（1年以内）の資格・免許を追加する</Button>;
};
