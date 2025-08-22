import { useSearchParams } from 'react-router';
import { Advertisement } from '@/components/Advertisement';
import { useAdvertisement } from '@/hooks/useAdvertisement';

export default function WebtoonSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const { randomAdvertisementLarge, randomAdvertisementSmall } = useAdvertisement(null, keyword);

  return (
    <div className="flex justify-between mt-[30px]">
      <div className="w-2/3">
        <span className="mr-1 text-xl text-site-red font-semibold">'{keyword}'</span>
        <span className="text-xl font-semibold">에 대한 검색결과 입니다.</span>
      </div>
      <Advertisement largeAdSrc={randomAdvertisementLarge} smallAdSrc={randomAdvertisementSmall} />
    </div>
  );
}
