/**
 * Kakao Maps API Types (Partial)
 * 필요한 부분만 정의합니다.
 */
declare namespace kakao.maps {
  /**
   * SDK 로드 완료 후 실행될 콜백을 등록합니다.
   * autoload=false 일 때 필수입니다.
   */
  export function load(callback: () => void): void;

  export namespace services {
    export enum Status {
      OK = 'OK',
      ZERO_RESULT = 'ZERO_RESULT',
      ERROR = 'ERROR',
    }

    export interface Place {
      id: string;
      place_name: string;
      category_name: string;
      category_group_code: string;
      category_group_name: string;
      phone: string;
      address_name: string;
      road_address_name: string;
      x: string;
      y: string;
      place_url: string;
      distance: string;
    }

    export interface PlacesSearchOptions {
      category_group_code?: string;
      location?: kakao.maps.LatLng;
      radius?: number;
      rect?: string;
      size?: number;
      page?: number;
      sort?: 'accuracy' | 'distance';
    }

    export type PlacesSearchResult = Place[];

    export class Places {
      constructor(map?: kakao.maps.Map);
      setMap(map: kakao.maps.Map | null): void;
      keywordSearch(
        keyword: string,
        callback: (
          result: PlacesSearchResult,
          status: Status,
          pagination: Pagination
        ) => void,
        options?: PlaceSearchOptions
      ): void;
    }

    export interface Pagination {
      nextPage(): void;
      prevPage(): void;
      gotoPage(page: number): void;
      current: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      totalCount: number;
    }
  }
}

interface Window {
  kakao: typeof kakao;
}
