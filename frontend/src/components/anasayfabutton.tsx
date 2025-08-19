export function LinkButton({
  href,
  title,
  bgColor = "bg-white",
  children,
}: {
  href: string;
  title: string;
  bgColor?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`${bgColor} rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center justify-center`}
    >
      <a href={href} className="w-full h-full flex flex-col items-center justify-center">
        {children || <h3 className="text-lg font-semibold text-center">{title}</h3>}
      </a>
    </div>
  );
}
