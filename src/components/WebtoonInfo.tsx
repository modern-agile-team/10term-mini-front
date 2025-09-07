interface WebtoonInfoProps {
  title: string;
  writer: string;
  description: string;
  thumbnailUrl: string;
}

export const WebtoonInfo = ({ title, writer, description, thumbnailUrl }: WebtoonInfoProps) => {
  return (
    <div className="flex my-5 space-x-4">
      <img src={thumbnailUrl} alt={title} className="border" width={193} height={250} />
      <div className="flex flex-col space-y-2">
        <h1 className="text-xl font-medium">{title}</h1>
        <div className="flex space-x-2">
          <h2 className="font-bold">{writer}</h2>
          <h2>· 글/그림</h2>
        </div>
        <p className="whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default WebtoonInfo;
