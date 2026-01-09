const Title = ({
  mainTitle,
  subTitle,
  percent,
}: {
  mainTitle: string;
  subTitle: string;
  percent: string;
}) => {
  return (
    <div className="text-center mb-12">
      <div className="relative z-20">
        <div
          className={`absolute bottom-[8%] right-[${percent}%] h-2 w-36 bg-[rgb(var(--fifteenth-rgb))] opacity-45 z-10`}
        ></div>
        <h1
          className={`text-3xl font-bold text-gray-900 ${
            subTitle ? "mb-2" : "mb-0"
          } z-20 relative`}
        >
          {mainTitle}
        </h1>
      </div>
      {subTitle && <p className="text-gray-600">{subTitle}</p>}
    </div>
  );
};

export default Title;
