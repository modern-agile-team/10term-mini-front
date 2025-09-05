interface SearchHeaderProps {
  keyword: string;
  totalCount: number;
}

export const SearchHeader = ({ keyword, totalCount }: SearchHeaderProps) => {
  return (
    <>
      <div>
        <span className="mr-1 text-xl text-site-red font-semibold">'{keyword}'</span>
        <span className="text-xl font-semibold">에 대한 검색결과 입니다.</span>
      </div>
      <div className="pt-4 pb-5 border-b">
        <span className="mr-1 text-xl font-semibold">웹툰</span>
        <span>총 {totalCount}</span>
      </div>
    </>
  );
};

export default SearchHeader;
