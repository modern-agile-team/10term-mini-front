interface AdvertisementProps {
  largeAdSrc: string;
  smallAdSrc: string;
}

export const Advertisement = ({ largeAdSrc, smallAdSrc }: AdvertisementProps) => {
  return (
    <div className="mt-20 w-1/5 space-y-4">
      {largeAdSrc && <img src={largeAdSrc} alt="대형 광고" />}
      {smallAdSrc && <img src={smallAdSrc} alt="소형 광고" />}
    </div>
  );
};
