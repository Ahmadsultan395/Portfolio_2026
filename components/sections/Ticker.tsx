import { tickerItems } from "@/data/skills";

export function Ticker() {
  const group = (hidden: boolean) => (
    <ul className="ticker__group" aria-hidden={hidden || undefined}>
      {tickerItems.map((item) => (
        <li key={item} className="ticker__item">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="ticker" role="region" aria-label="Core technologies">
      <div className="ticker__track">
        {group(false)}
        {group(true)}
      </div>
    </div>
  );
}
