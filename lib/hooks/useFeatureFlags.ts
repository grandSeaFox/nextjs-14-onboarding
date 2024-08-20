import { IFlags } from 'flagsmith/types';
import { useEffect, useState } from 'react';
import flagsmith from '@/lib/services/flagsmith';

export type AllFlags = IFlags;
export type EnabledFlags = Array<string>

export interface Flags {
  allFlags: AllFlags | undefined;
  disabledFlags: EnabledFlags | undefined;
}

const useFeatureFlags = (): Flags => {
  const [allFlags, setAllFlags] = useState<IFlags | undefined>();
  const [disabledFlags, setDisabledFlags] = useState<Array<string> | undefined>();
  useEffect(() => {
      const fetchFlags = async () => {
        try {
          const allFlags = await flagsmith.getFlags();
          const enabledFlags = await flagsmith.getDisabledFlagKeys();
          setAllFlags(allFlags);
          setDisabledFlags(enabledFlags);
        } catch (error) {
          console.error('Error fetching flags:', error);
        }
      };

      fetchFlags();
    }
  , [])


  return {
    allFlags,
    disabledFlags
  };
};

export default useFeatureFlags;