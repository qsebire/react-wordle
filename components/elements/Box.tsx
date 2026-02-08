export function Box({
  letter,
  background,
  nbrBox,
}: {
  letter: string;
  background: string;
  nbrBox: number;
}) {
  return (
    <div
      className="relative z-10 max-h-[10vh] max-w-[10vh] border border-white p-2 rounded-lg sm:rounded-2xl flex items-center justify-center transition-all duration-700"
      style={{
        width: `calc((100vw - (16px + ((${nbrBox} - 1) * 8px))) / ${nbrBox})`,
        height: `calc((100vw - (16px + ((${nbrBox} - 1) * 8px))) / ${nbrBox})`,
      }}
    >
      <p className="relative z-10 text-shadow-lg text-xl sm:text-3xl md:text-4xl font-bold">
        {letter}
      </p>
      <div
        className="rounded sm:rounded-xl absolute w-[calc(100%-8px)] h-[calc(100%-8px)] top-1 left-1 z-0"
        style={{
          background: background,
        }}
      />
    </div>
  );
}
