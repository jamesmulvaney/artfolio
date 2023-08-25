import React from "react";

type InfoBoxProps = {
  children: any;
};

function InfoBox({ children }: InfoBoxProps) {
  return (
    <div className="p-3 border border-zinc-300/50 dark:border-white/20 bg-zinc-50 dark:bg-zinc-800 w-3/4 mb-2 text-center md:text-left md:w-3/5 lg:w-1/2">
      {children}
    </div>
  );
}

export default InfoBox;
