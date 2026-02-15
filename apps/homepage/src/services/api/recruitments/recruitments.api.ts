import {RecruitmentsStatusType} from '@/schemas/recruitments/recruitments.schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';

export const getRecruitmentsStatus =
  async (): Promise<RecruitmentsStatusType> => {
    try {
      const {data} = await publicAxios.get<RecruitmentsStatusType>(
        ENDPOINT.RECRUITMENTS.STATUS
      );
      return data;
    } catch (error) {
      return handleApiError(error);
    }
  };
