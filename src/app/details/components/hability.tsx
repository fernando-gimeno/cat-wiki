interface Props {
  title: string;
  level?: 0 | 1 | 2 | 3 | 4 | 5;
  text?: string;
}

export default function Hability(props: Props) {
  return (
    <div className="inline-flex w-full">
      <p className="w-36 text-base font-bold mr-2">{props.title}:</p>
      {props.level ? (
        <div className="inline-flex items-center">
          <div
            className={
              props.level >= 1
                ? "w-12 h-2 rounded-full mx-1 bg-slate-600"
                : "w-12 h-2 rounded-full mx-1 bg-slate-300"
            }
          ></div>
          <div
            className={
              props.level >= 2
                ? "w-12 h-2 rounded-full mx-1 bg-slate-600"
                : "w-12 h-2 rounded-full mx-1 bg-slate-300"
            }
          ></div>
          <div
            className={
              props.level >= 3
                ? "w-12 h-2 rounded-full mx-1 bg-slate-600"
                : "w-12 h-2 rounded-full mx-1 bg-slate-300"
            }
          ></div>
          <div
            className={
              props.level >= 4
                ? "w-12 h-2 rounded-full mx-1 bg-slate-600"
                : "w-12 h-2 rounded-full mx-1 bg-slate-300"
            }
          ></div>
          <div
            className={
              props.level >= 5
                ? "w-12 h-2 rounded-full mx-1 bg-slate-600"
                : "w-12 h-2 rounded-full mx-1 bg-slate-300"
            }
          ></div>
        </div>
      ) : (
        <p>{props.text}</p>
      )}
    </div>
  );
}
